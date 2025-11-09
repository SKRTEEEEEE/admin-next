import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Theme popover", () => {
  test("lists palette presets for both modes", async ({ page }) => {
    await page.goto(getUrl());
    const toggle = page.getByRole("button", { name: /customize theme/i });
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.getByRole("button", { name: /^grays$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^neon$/i })).toBeVisible();

    await page.getByRole("button", { name: /^light$/i }).click();
    await expect(page.getByRole("button", { name: /^gold$/i })).toBeVisible();
  });

  test("writes the selected preset in the html data-theme attribute", async ({ page }) => {
    await page.goto(getUrl());
    const toggle = page.getByRole("button", { name: /customize theme/i });

    await toggle.click();
    await page.getByRole("button", { name: /^neon$/i }).click();
    await page.waitForFunction(() => document.documentElement.getAttribute("data-theme") === "dark-neon");

    await page.getByRole("button", { name: /^light$/i }).click();
    await page.waitForFunction(() => document.documentElement.getAttribute("data-theme") === "light-neon");
  });
});
