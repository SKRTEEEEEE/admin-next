import { test, expect } from "@playwright/test";

test.describe("Enhanced SEO metadata", () => {
  test("page loads successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/es", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    
    // Verificar que la página carga
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout: 10000 });
    
    // Verificar metadata básico
    await expect(page).toHaveTitle(/.+/);
  });
});
