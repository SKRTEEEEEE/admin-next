import { test, expect } from "@playwright/test";

test.describe("Locale routing", () => {
  const locales = ["es", "en", "ca", "de"];

  for (const locale of locales) {
    test(`/${locale} responds with hero`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator(".admin-hero")).toBeVisible();
    });
  }
});
