import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Admin diagnostics", () => {
  test("renders the diagnostics cards", async ({ page }) => {
    await page.goto(getUrl());
    const diagnostics = page.locator(".admin-diagnostic");
    await expect(diagnostics).toHaveCount(4);
  });

  test("quick links navigate to the right destinations", async ({ page }) => {
    await page.goto(getUrl());
    const links = page.locator(".admin-action-link");
    await expect(links).toHaveCount(3);
    await expect(links.nth(0)).toHaveAttribute("href", /github/i);
  });
});
