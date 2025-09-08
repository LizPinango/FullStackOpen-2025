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
}

export { loginWith, createblog }