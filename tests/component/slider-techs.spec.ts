import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Status cards", () => {
  test("render three micro frontend cards", async ({ page }) => {
    await page.goto(getUrl());
    const cards = page.locator(".admin-card");
    await expect(cards).toHaveCount(3);
  });
});
