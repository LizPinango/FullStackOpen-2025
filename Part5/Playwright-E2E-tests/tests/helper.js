const loginWith = async (page, username, password)  => {
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createblog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New Blog' }).click()
  await page.getByLabel('Title').fill(title)      
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('Url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} - ${author}`).waitFor()
}

const likeBlog = async (page, text, n) => {
  const blogContainer = page.locator('.blog-container').filter({ hasText: text })
  await blogContainer.getByRole('button', { name: 'show more'}).click()

  for (let i = 0; i<n; i++) {
    await blogContainer.getByRole('button', {name: 'like'}).click()
    await blogContainer.getByText(`likes ${i+1}`).waitFor()
  }

  await blogContainer.getByRole('button', { name: 'show less'}).click()
}

export { loginWith, createblog, likeBlog }