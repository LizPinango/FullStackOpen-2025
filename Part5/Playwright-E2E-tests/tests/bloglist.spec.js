const { test, expect, beforeEach, describe } = require('@playwright/test')

const { loginWith, createblog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Pedro Perez',
        username: 'user1',
        password: 'pass123'
      }
    })

    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Maria Gomez',
        username: 'user2',
        password: 'clave456'
      }
    })

    await page.goto('http://localhost:5173')
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
  })
})