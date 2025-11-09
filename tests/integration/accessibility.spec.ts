import { test, expect } from "@playwright/test";

test.describe("Accessibility smoke tests", () => {
  const locales = ["es", "en", "ca", "de"];

  for (const locale of locales) {
    test(`main landmarks for ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator(".admin-navbar")).toBeVisible();
      const htmlLang = await page.locator("html").getAttribute("lang");
      expect(htmlLang).toBe(locale);
    });
  }

  test("theme popover is keyboard accessible", async ({ page }) => {
    await page.goto("/es");
    const toggle = page.getByRole("button", { name: /customize theme/i });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: /^light$/i }).click();
    await expect(toggle).toBeVisible();
  });

  test("quick links expose accessible names", async ({ page }) => {
    await page.goto("/es");
    const links = page.locator(".admin-action-link");
    await expect(links).toHaveCount(3);
    for (let i = 0; i < await links.count(); i++) {
      const text = await links.nth(i).textContent();
      expect((text ?? "").trim().length).toBeGreaterThan(0);
    }
  });
});
