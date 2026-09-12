import { expect, test } from '@playwright/test'

test('loads One Small Quest in a portrait viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await expect(page.locator('#game-root')).toBeVisible()
  await expect(page).toHaveTitle(/One Small Quest/i)
})
