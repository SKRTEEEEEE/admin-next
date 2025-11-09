import { test, expect } from "@playwright/test";

test.describe("Enhanced SEO metadata", () => {
  test("keywords include Barcelona references", async ({ page }) => {
    await page.goto("/es");
    const keywords = await page.locator('meta[name="keywords"]').getAttribute("content");
    expect(keywords?.toLowerCase()).toContain("barcelona");
  });

  test("structured data scripts are present", async ({ page }) => {
    await page.goto("/es");
    const scripts = page.locator('script[type="application/ld+json"]');
    expect(await scripts.count()).toBeGreaterThan(1);
  });
});
