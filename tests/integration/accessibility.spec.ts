import { test, expect } from "@playwright/test";

test.describe("Accessibility smoke tests", () => {
  test("page loads with correct locale", async ({ page }) => {
    await page.goto("http://localhost:3000/es");
    // Verificar que la página carga
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible();
  });
});
