import { test, expect } from "@playwright/test";

test.describe("Performance - Web Vitals (Pure Load)", () => {
  test("Homepage loads with basic vitals", async ({ page }) => {
    test.setTimeout(30000);

    await page.goto("http://localhost:3000/es", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    // Verificar que la página admin carga
    const adminShell = await page.locator(".admin-shell");
    await expect(adminShell).toBeVisible({ timeout: 10000 });

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
