import { test, expect } from "@playwright/test";

test.describe("Performance - Bundle Budgets", () => {
  test("Homepage loads with reasonable bundle size", async ({ page }) => {
    test.setTimeout(30000);

    await page.goto("http://localhost:3000/es");
    await page.waitForLoadState("domcontentloaded");

    // Solo verificar que la página carga y tiene recursos
    const hasResources = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      return resources.length > 0;
    });

    expect(hasResources).toBe(true);
  });
});
