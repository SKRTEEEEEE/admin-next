import { test, expect } from "@playwright/test";

test.describe("Admin root localized", () => {
  test("Catalan locale loads successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/ca");
    // Verificar que la página carga
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible();
  });
});
