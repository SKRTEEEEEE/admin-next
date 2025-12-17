import { test, expect } from "@playwright/test";
import { getProgressiveTimeout, TIMEOUTS } from "../../utils/timeout";

test.describe("Admin status use cases", () => {
  test("page loads successfully", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    
    await page.goto("http://localhost:3000/es", { 
      waitUntil: "domcontentloaded",
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    // Verificar que la página admin carga correctamente
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout });
    
    // Verificar que los elementos admin están presentes
    const adminShell = await page.locator(".admin-shell");
    await expect(adminShell).toBeVisible({ timeout });
  });
});
