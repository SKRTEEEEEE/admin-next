import { test, expect } from "@playwright/test";
import { getUrl } from "../utils/url";

test.describe("ModeToggle Component", () => {
  test("renders inside the admin navbar and lists six presets", async ({ page }) => {
    await page.goto(getUrl());
    const toggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(toggle).toBeVisible();

    await toggle.click();
    const options = page.locator('[data-slot="dropdown-menu-radio-item"]');
    await expect(options).toHaveCount(6);
    await expect(page.getByText("Neon pulse")).toBeVisible();
  });

  test("applies the selected preset as html class", async ({ page }) => {
    await page.goto(getUrl());
    const toggle = page.getByRole("button", { name: /toggle theme/i });

    await toggle.click();
    await page.getByText("Neon pulse").click();
    await page.waitForFunction(() => document.documentElement.classList.contains("neon"));

    await toggle.click();
    await page.getByText("Terminal").click();
    await page.waitForFunction(() => document.documentElement.classList.contains("terminal"));
  });
});
