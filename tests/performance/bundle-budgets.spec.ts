import { test, expect } from "@playwright/test";

test.describe("Performance - Bundle Budgets", () => {
  const pages = [
    { path: "/es", name: "Homepage (ES)" },
    { path: "/en/info", name: "Info Page (EN)" },
    { path: "/de/gradients", name: "Gradients (DE)" },
  ];

  for (const { path, name } of pages) {
    test(`${name} - Resource size budgets`, async ({ page }) => {
      test.setTimeout(60000); // 1 minute per page

      await page.goto(`http://localhost:3000${path}`);
      await page.waitForLoadState("networkidle");

      // Collect resource sizes
      const resourceSizes = await page.evaluate(() => {
        const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        
        let totalJS = 0;
        let totalCSS = 0;
        let totalImages = 0;
        let totalFonts = 0;
        let totalOther = 0;

        resources.forEach((resource) => {
          const size = resource.transferSize || 0;
          const type = resource.initiatorType;

          if (type === "script" || resource.name.endsWith(".js")) {
            totalJS += size;
          } else if (type === "css" || resource.name.endsWith(".css")) {
            totalCSS += size;
          } else if (type === "img" || /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(resource.name)) {
            totalImages += size;
          } else if (type === "font" || /\.(woff|woff2|ttf|otf)$/i.test(resource.name)) {
            totalFonts += size;
          } else {
            totalOther += size;
          }
        });

        return {
          totalJS,
          totalCSS,
          totalImages,
          totalFonts,
          totalOther,
          total: totalJS + totalCSS + totalImages + totalFonts + totalOther,
        };
      });

      console.log(`\nBundle sizes for ${name}:`);
      console.log(`  JavaScript: ${(resourceSizes.totalJS / 1024).toFixed(2)} KB`);
      console.log(`  CSS: ${(resourceSizes.totalCSS / 1024).toFixed(2)} KB`);
      console.log(`  Images: ${(resourceSizes.totalImages / 1024).toFixed(2)} KB`);
      console.log(`  Fonts: ${(resourceSizes.totalFonts / 1024).toFixed(2)} KB`);
      console.log(`  Other: ${(resourceSizes.totalOther / 1024).toFixed(2)} KB`);
      console.log(`  Total: ${(resourceSizes.total / 1024).toFixed(2)} KB`);

      // Budget thresholds (matching lighthouse.budget.json)
      const budgets = {
        script: 300 * 1024, // 300 KB
        stylesheet: 50 * 1024, // 50 KB
        image: 500 * 1024, // 500 KB
        total: 1000 * 1024, // 1 MB
      };

      expect(resourceSizes.totalJS).toBeLessThan(budgets.script);
      expect(resourceSizes.totalCSS).toBeLessThan(budgets.stylesheet);
      expect(resourceSizes.totalImages).toBeLessThan(budgets.image);
      expect(resourceSizes.total).toBeLessThan(budgets.total);
    });
  }

  test("Main bundle chunks are optimized", async ({ page }) => {
    await page.goto("http://localhost:3000/es");
    await page.waitForLoadState("networkidle");

    const bundleInfo = await page.evaluate(() => {
      const scripts = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const bundleScripts = scripts.filter(
        (s) => s.initiatorType === "script" && s.name.includes("/_next/static/chunks/")
      );

      return bundleScripts.map((s) => ({
        name: s.name.split("/").pop(),
        size: s.transferSize || 0,
        duration: s.duration,
      }));
    });

    console.log("\nBundle chunks:");
    bundleInfo.forEach((chunk) => {
      console.log(`  ${chunk.name}: ${(chunk.size / 1024).toFixed(2)} KB (${chunk.duration.toFixed(0)}ms)`);
    });

    // Ensure no single chunk is too large
    const largeChunks = bundleInfo.filter((chunk) => chunk.size > 200 * 1024);
    if (largeChunks.length > 0) {
      console.warn("\n⚠️  Large chunks detected:");
      largeChunks.forEach((chunk) => {
        console.warn(`  ${chunk.name}: ${(chunk.size / 1024).toFixed(2)} KB`);
      });
    }

    expect(largeChunks.length).toBe(0);
  });
});
