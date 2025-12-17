import { test, expect } from "@playwright/test";

test.describe("Accessibility smoke tests", () => {
  test("page loads with correct locale", async ({ page }) => {
    await page.goto("http://localhost:3000/es", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    
    // Verificar que la página carga con estructura admin
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout: 10000 });
    await expect(htmlElement).toHaveAttribute("lang", "es");
  });
});
