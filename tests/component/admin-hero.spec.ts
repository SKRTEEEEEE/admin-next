import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Admin hero composition", () => {
  test("renders badge, title and description", async ({ page }) => {
    await page.goto(getUrl());
    const hero = page.locator(".admin-hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator(".admin-hero-badge")).toContainText(/admin/i);
    await expect(hero.locator("h1")).toBeVisible();
    await expect(hero.locator("p").first()).toBeVisible();
  });

  test("shows both primary actions", async ({ page }) => {
    await page.goto(getUrl());
    const actions = page.locator(".admin-hero-actions");
    await expect(actions.getByRole("button")).toHaveCount(2);
  });
});
