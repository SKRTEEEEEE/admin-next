import { test, expect } from "@playwright/test";

test.describe("Admin root localized", () => {
  test("Catalan locale loads successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/ca", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    
    // Verificar que la página admin carga con locale catalán
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout: 10000 });
    await expect(htmlElement).toHaveAttribute("lang", "ca");
  });
});
