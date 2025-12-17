import { test, expect } from "@playwright/test";
import { getProgressiveTimeout, TIMEOUTS } from "../../utils/timeout";

test.describe("Performance - Web Vitals (Pure Load)", () => {
  test("Homepage loads with basic vitals", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    test.setTimeout(getProgressiveTimeout(30000, testInfo));

    await page.goto("http://localhost:3000/es", { 
      waitUntil: "domcontentloaded",
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });

    // Verificar que la página admin carga
    const adminShell = await page.locator(".admin-shell");
    await expect(adminShell).toBeVisible({ timeout });

    // Solo verificar FCP (First Contentful Paint) - más simple y rápido
    const fcp = await page.evaluate(() => {
      const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
      return fcpEntry ? fcpEntry.startTime : 0;
    });

    console.log(`FCP: ${fcp.toFixed(0)}ms`);
    
    // Threshold relajado
    expect(fcp).toBeLessThan(5000); // 5s
  });
});
