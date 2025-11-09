import { test, expect } from "@playwright/test";

test.describe("Admin root localized", () => {
  test("Catalan locale uses translated text", async ({ page }) => {
    await page.goto("/ca");
    await expect(page.locator(".admin-hero"))
      .toContainText("Centre de control", { timeout: 5000 });
  });

  test("German locale keeps diagnostics visible", async ({ page }) => {
    await page.goto("/de");
    await expect(page.locator(".admin-diagnostic")).toHaveCount(4);
  });
});
