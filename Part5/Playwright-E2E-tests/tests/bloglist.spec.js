const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByRole('textbox').first().fill('user1')
      await page.getByRole('textbox').last().fill('pass123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Pedro Perez logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('user1')
      await page.getByRole('textbox').last().fill('nopass')
      await page.getByRole('button', { name: 'login' }).click()
      
      const errorDiv = page.locator('.error-box')
      await expect(errorDiv).toContainText('Wrong credentials')
    })
  })
})