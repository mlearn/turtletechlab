
const { test, expect } = require('@playwright/test');

test('homepage loads successfully', async ({ page }) => {
  const response = await page.goto('/');

  expect(response.status()).toBe(200);
});

test('main heading is visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#hero-title')).toBeVisible();
});

test('services section is visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#services')).toBeVisible();
});

test('footer and LinkedIn link are visible', async ({ page }) => {
  await page.goto('/');

  const footer = page.locator('footer.site-footer');

  await expect(footer).toBeVisible();
  await expect(
    footer.getByRole('link', { name: /LinkedIn/ })
  ).toBeVisible();
});
test('beta signup email field is visible', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByPlaceholder('Your email address')
  ).toBeVisible();
});

test('beta signup button is visible', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Join Beta Group' })
  ).toBeVisible();
});