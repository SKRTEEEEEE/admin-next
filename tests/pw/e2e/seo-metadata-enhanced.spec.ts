import { test, expect } from "@playwright/test";
import { getProgressiveTimeout, TIMEOUTS } from "../../utils/timeout";

test.describe("Enhanced SEO metadata", () => {
  test("page loads successfully", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    
    await page.goto("http://localhost:3000/es", { 
      waitUntil: "domcontentloaded",
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    // Verificar que la página carga
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout });
    
    // Verificar metadata básico
    await expect(page).toHaveTitle(/.+/);
  });
});
