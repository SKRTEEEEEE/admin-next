import { test, expect } from "@playwright/test";

test.describe("Locale routing", () => {
  test("/es route loads successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/es", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    
    // Verificar que la página carga con locale español
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout: 10000 });
    await expect(htmlElement).toHaveAttribute("lang", "es");
  });
});
