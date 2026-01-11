import { test, expect } from "@playwright/test";
import { getProgressiveTimeout, TIMEOUTS } from "../../../utils/timeout";

test.describe("Admin root localized", () => {
  test("Catalan locale loads successfully", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    
    await page.goto("http://localhost:3000/ca", { 
      waitUntil: "domcontentloaded",
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    // Verificar que la página admin carga con locale catalán
    const htmlElement = await page.locator("html");
    await expect(htmlElement).toBeVisible({ timeout });
    await expect(htmlElement).toHaveAttribute("lang", "ca");
  });
});
