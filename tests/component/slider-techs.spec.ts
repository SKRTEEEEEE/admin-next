import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Status cards", () => {
  test("render three micro frontend cards", async ({ page }) => {
    await page.goto(getUrl());
    const cards = page.locator(".admin-card");
    await expect(cards).toHaveCount(3);
  });

  test("each card exposes its state badge", async ({ page }) => {
    await page.goto(getUrl());
    const badges = page.locator(".admin-card span").filter({ hasText: /online|standby|sync/i });
    await expect(badges.nth(0)).toBeVisible();
  });
});
