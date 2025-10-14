import { test, expect } from '@playwright/test';

test('Dashboard deve estar visível após login', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/register');
  
  const randomEmail = `user${Date.now()}@test.com`;
  
  await page.fill('input[type="email"]', randomEmail);
  await page.fill('input[name="firstName"]', 'Test');
  await page.fill('input[name="lastName"]', 'User');
  await page.fill('input[type="password"]', '123456');
  
  await page.click('button[type="submit"]');
  
  await page.waitForURL('**/dashboard');
  
  await expect(page.locator('text=digest')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('text=/refeições/i')).toBeVisible({ timeout: 5000 });
  
  const screenshot = await page.screenshot();
  expect(screenshot.length).toBeGreaterThan(0);
});

