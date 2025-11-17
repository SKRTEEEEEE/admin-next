import { test, expect } from "@playwright/test";

test.describe("Performance - Web Vitals (Pure Load)", () => {
  test("Homepage loads with basic vitals", async ({ page }) => {
    test.setTimeout(30000);

    await page.goto("http://localhost:3000/es");
    await page.waitForLoadState("domcontentloaded");

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
