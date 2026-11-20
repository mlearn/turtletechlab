const { test, expect } = require('@playwright/test');

test('page title targets software testing in Sydney @seo', async ({ page }) => {
  await page.goto('/');

  const title = await page.title();
  expect(title).toContain('Software Testing');
  expect(title).toContain('Sydney');
  expect(title.length).toBeLessThanOrEqual(60);
});

test('meta description is present and a sensible length @seo', async ({ page }) => {
  await page.goto('/');

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content');
  expect(description).toBeTruthy();
  expect(description.length).toBeGreaterThanOrEqual(70);
  expect(description.length).toBeLessThanOrEqual(160);
});

test('canonical URL points to the live site @seo', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://turtletechlab.com/'
  );
});

test('page has exactly one h1 @seo', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toHaveCount(1);
});

test('structured data is valid JSON with business details @seo', async ({ page }) => {
  await page.goto('/');

  const raw = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  const data = JSON.parse(raw);

  expect(data['@type']).toBe('ProfessionalService');
  expect(data.name).toBe('Turtle Tech Lab');
  expect(data.url).toBe('https://turtletechlab.com/');
  expect(data.address.addressLocality).toBe('Sydney');
});

test('robots.txt and sitemap.xml are served @seo', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: https://turtletechlab.com/sitemap.xml');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('<loc>https://turtletechlab.com/</loc>');
});
