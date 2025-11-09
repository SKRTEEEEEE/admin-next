import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("Admin navbar", () => {
  test("exposes brand, apps trigger and gradient link", async ({ page }) => {
    await page.goto(getUrl());
    const navbar = page.locator(".admin-navbar");
    await expect(navbar).toBeVisible();
    await expect(navbar.getByText(/Admin Control/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Apps/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Gradients/i }).first()).toBeVisible();
  });

  test("shows external icons and theme popover", async ({ page }) => {
    await page.goto(getUrl());
    const githubLink = page.locator(".admin-navbar").getByRole("link", { name: /GitHub/i }).first();
    await expect(githubLink).toBeVisible();
    await expect(page.getByRole("button", { name: /customize theme/i })).toBeVisible();
  });
});
