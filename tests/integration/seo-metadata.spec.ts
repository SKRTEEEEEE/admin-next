import { test, expect } from "@playwright/test";

const locales = ["es", "en", "ca", "de"];

test.describe("SEO metadata for admin page", () => {
  for (const locale of locales) {
    test(`has title and description for ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBeTruthy();
    });

    test(`exposes Open Graph tags for ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
      const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute("content");
      expect(ogTitle).toBeTruthy();
      expect(ogLocale).toBeTruthy();
    });
  }

  test("includes canonical and alternate links", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const alternates = page.locator('link[rel="alternate"]');
    await expect(alternates).toHaveCount(4);
  });
});
