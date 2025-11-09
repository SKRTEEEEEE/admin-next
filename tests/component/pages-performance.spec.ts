import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Admin gradient background", () => {
  test("has animated gradient container", async ({ page }) => {
    await page.goto(getUrl());
    const gradient = page.locator(".admin-gradient");
    await expect(gradient).toBeVisible();
  });

  test("theme selector switches to a preset class", async ({ page }) => {
    await page.goto(getUrl());
    const toggle = page.getByRole("button", { name: /toggle theme/i });

    await toggle.click();
    await page.getByText("Sunset shift").click();
    await page.waitForFunction(() => document.documentElement.classList.contains("sunset"));

    await toggle.click();
    await page.getByText("Emerald ops").click();
    await page.waitForFunction(() => document.documentElement.classList.contains("emerald"));
  });
});
