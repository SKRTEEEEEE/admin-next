import { test, expect } from "@playwright/test";

test.describe("Performance - Web Vitals (Pure Load)", () => {
  const pages = [
    { path: "/es", name: "Homepage (ES)" },
    { path: "/en/info", name: "Info Page (EN)" },
    { path: "/de/gradients", name: "Gradients (DE)" },
  ];

  for (const { path, name } of pages) {
    test(`${name} - Core Web Vitals without interaction`, async ({ page }) => {
      test.setTimeout(60000); // 1 minute per page

      // Navigate and wait for load
      await page.goto(`http://localhost:3000${path}`);
      await page.waitForLoadState("networkidle");

      // Measure LCP (Largest Contentful Paint)
      const lcp = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let lcpValue = 0;
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            lcpValue = lastEntry.renderTime || lastEntry.loadTime;
          }).observe({ type: "largest-contentful-paint", buffered: true });

          setTimeout(() => resolve(lcpValue), 5000);
        });
      });

      // Measure CLS (Cumulative Layout Shift)
      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const layoutShift = entry as any;
              if (!layoutShift.hadRecentInput) {
                clsValue += layoutShift.value;
              }
            }
          }).observe({ type: "layout-shift", buffered: true });

          setTimeout(() => resolve(clsValue), 5000);
        });
      });

      // Measure FCP (First Contentful Paint)
      const fcp = await page.evaluate(() => {
        const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
        return fcpEntry ? fcpEntry.startTime : 0;
      });

      // Measure Total Blocking Time (approximation via long tasks)
      const tbt = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let totalBlockingTime = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const duration = entry.duration;
              if (duration > 50) {
                totalBlockingTime += duration - 50;
              }
            }
          }).observe({ type: "longtask", buffered: true });

          setTimeout(() => resolve(totalBlockingTime), 5000);
        });
      });

      console.log(`\nWeb Vitals for ${name}:`);
      console.log(`  LCP: ${lcp.toFixed(0)}ms`);
      console.log(`  CLS: ${cls.toFixed(3)}`);
      console.log(`  FCP: ${fcp.toFixed(0)}ms`);
      console.log(`  TBT (approx): ${tbt.toFixed(0)}ms`);

      // Strict thresholds for pure load (no interaction)
      expect(lcp).toBeLessThan(2500); // Good LCP
      expect(cls).toBeLessThan(0.1); // Good CLS
      expect(fcp).toBeLessThan(1800); // Good FCP
      // TBT is approximate, so we use a warning threshold
      if (tbt > 200) {
        console.warn(`  ⚠️  TBT is high: ${tbt.toFixed(0)}ms > 200ms`);
      }
    });
  }
});
