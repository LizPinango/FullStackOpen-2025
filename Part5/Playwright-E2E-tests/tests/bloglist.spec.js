const { test, expect, beforeEach, describe } = require('@playwright/test')

const { loginWith } = require('./helper')

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
      await page.getByRole('button', { name: 'New Blog' }).click()
      await page.getByLabel('Title').fill('test blog')      
      await page.getByLabel('Author').fill('test author')
      await page.getByLabel('Url').fill('test url')
      await page.getByRole('button', { name: 'create' }).click()

      const notification = page.locator('.notification-box')
      await expect(notification).toContainText("a new blog 'test blog' by test author added")
      await expect(page.getByText('test blog - test author')).toBeVisible()
    })
  })
})