import { test, expect } from "@playwright/test";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

test.describe("Performance - Lighthouse CI", () => {
  test("Run Lighthouse CI and validate thresholds", async () => {
    test.setTimeout(120000); // 2 minutes for full Lighthouse run

    try {
      // Run Lighthouse CI
      console.log("Running Lighthouse CI...");
      const { stdout, stderr } = await execAsync("npm run lhci:perf", {
        cwd: path.resolve(__dirname, "../.."),
      });

      console.log("Lighthouse CI output:", stdout);
      if (stderr && !stderr.includes("warn")) {
        console.warn("Lighthouse CI warnings:", stderr);
      }

      // Read manifest to get report paths
      const manifestPath = path.resolve(
        __dirname,
        "../../docs/lighthouse-reports/perf/manifest.json"
      );
      
      expect(fs.existsSync(manifestPath)).toBe(true);

      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      expect(manifest.length).toBeGreaterThan(0);

      // Validate each report
      for (const report of manifest) {
        const reportData = JSON.parse(fs.readFileSync(report.jsonPath, "utf-8"));
        const { categories } = reportData;

        console.log(`\nValidating: ${report.url}`);
        console.log(`  Performance: ${categories.performance.score}`);
        console.log(`  Accessibility: ${categories.accessibility.score}`);
        console.log(`  SEO: ${categories.seo.score}`);
        console.log(`  Best Practices: ${categories["best-practices"].score}`);

        // Assert thresholds (matching lighthouserc.perf.json)
        expect(categories.performance.score).toBeGreaterThanOrEqual(0.9);
        expect(categories.accessibility.score).toBeGreaterThanOrEqual(0.95);
        expect(categories.seo.score).toBeGreaterThanOrEqual(0.9);
        expect(categories["best-practices"].score).toBeGreaterThanOrEqual(0.95);
      }
    } catch (error) {
      console.error("Lighthouse CI failed:", error);
      throw error;
    }
  });
});
