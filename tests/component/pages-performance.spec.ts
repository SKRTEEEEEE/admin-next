import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Admin theming", () => {
  test("renders a static glow background", async ({ page }) => {
    await page.goto(getUrl());
    const glow = page.locator(".admin-shell__glow");
    await expect(glow).toBeVisible();
  });

  test("theme selector syncs the html data attribute", async ({ page }) => {
    await page.goto(getUrl());
    const toggle = page.getByRole("button", { name: /customize theme/i });

    await toggle.click();
    await page.getByRole("button", { name: /^soft$/i }).click();
    await page.waitForFunction(() => document.documentElement.getAttribute("data-theme") === "dark-soft");

    await toggle.click();
    await page.getByRole("button", { name: /^light$/i }).click();
    await page.getByRole("button", { name: /^grays$/i }).click();
    await page.waitForFunction(() => document.documentElement.getAttribute("data-theme") === "light-grays");
  });
});
