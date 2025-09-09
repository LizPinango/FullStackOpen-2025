const { test, expect, beforeEach, describe } = require('@playwright/test')

const { loginWith, createblog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Pedro Perez',
        username: 'user1',
        password: 'pass123'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Maria Gomez',
        username: 'user2',
        password: 'clave456'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'pass123')

      await expect(page.getByText('Pedro Perez logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'nopass')
      
      const errorDiv = page.locator('.error-box')
      await expect(errorDiv).toContainText('Wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'user1', 'pass123')
    })

    test('a new blog can be created', async ({ page }) => {
      await createblog(page, 'Test Blog', 'Test Author', 'Test Url')

      const notification = page.locator('.notification-box')
      await expect(notification).toContainText("a new blog 'Test Blog' by Test Author added")
      await expect(page.getByText('Test Blog - Test Author')).toBeVisible()
    })

    describe('and a blog exist', () => {
      beforeEach(async ({ page }) => {
        await createblog(page, 'Test Blog', 'Test Author', 'Test Url')
      })

      test('a blog can be liked', async ({page}) => {
        await page.getByRole('button', { name: 'show more' }).click()
        await page.getByRole('button', {name: 'like'}).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('the user that created the blog can delete it', async ({page}) => {
        await page.getByRole('button', { name: 'show more' }).click()

        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', {name: 'delete'}).click()

        const notification = page.locator('.notification-box')
        await expect(notification).toContainText("'Test Blog' by Test Author deleted")
        await expect(page.getByText('Test Blog - Test Author')).not.toBeVisible()
      })

      test('it can not be deleted by other users', async ({page, request}) => {
        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'user2', 'clave456')

        await page.getByRole('button', { name: 'show more' }).click()
        await expect(page.getByRole('button', {name: 'delete'})).not.toBeVisible()
      })
    })    

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createblog(page, 'Test Blog 1', 'Test Author', 'Test Url 1')
        await createblog(page, 'Test Blog 2', 'Test Author', 'Test Url 2')
        await createblog(page, 'Test Blog 3', 'Test Author', 'Test Url 3')
      })

      test('the blogs are arranged in order of likes', async ({page}) => {
        await likeBlog(page, 'Test Blog 1 - Test Author', 2)
        await likeBlog(page, 'Test Blog 2 - Test Author', 1)
        await likeBlog(page, 'Test Blog 3 - Test Author', 3)
        
        const blogTitles = await page.locator('.blog-container p:first-child').allTextContents()

        expect(blogTitles[0]).toBe('Test Blog 3 - Test Author')
        expect(blogTitles[1]).toBe('Test Blog 1 - Test Author')
        expect(blogTitles[2]).toBe('Test Blog 2 - Test Author')
      })
    })
  })
})