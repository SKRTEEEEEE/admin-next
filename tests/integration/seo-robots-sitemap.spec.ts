import { test, expect } from "@playwright/test";

test.describe("Robots and sitemap", () => {
  test("robots.txt exposes sitemap and allow rules", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const content = await page.textContent("body");
    expect(content).toContain("User-Agent: *");
    expect(content).toContain("Allow: /");
    expect(content).toContain("Sitemap:");
  });

  test("sitemap contains localized home urls", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const text = await response?.text();
    ["/es", "/en", "/ca", "/de"].forEach((locale) => {
      expect(text).toContain(locale);
    });
  });
});
