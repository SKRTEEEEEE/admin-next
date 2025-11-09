import { test, expect } from "@playwright/test";

test.describe("Admin root page", () => {
  test("renders hero text in Spanish locale", async ({ page }) => {
    await page.goto("/es");
    const hero = page.locator(".admin-hero");
    await expect(hero).toContainText("Centro de control", { timeout: 5000 });
  });

  test("shows quick action links", async ({ page }) => {
    await page.goto("/es");
    const quickLinks = page.locator(".admin-action-link");
    await expect(quickLinks).toHaveCount(3);
  });
});
