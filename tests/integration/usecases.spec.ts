import { test, expect } from "@playwright/test";

test.describe("Admin status use cases", () => {
  test("page loads successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/es", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    
    // Verificar que la página admin carga correctamente
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout: 10000 });
    
    // Verificar que los elementos admin están presentes
    const adminShell = await page.locator(".admin-shell");
    await expect(adminShell).toBeVisible();
  });
});
