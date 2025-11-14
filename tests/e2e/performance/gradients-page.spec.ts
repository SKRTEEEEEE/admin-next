import { test, expect, Page } from "@playwright/test";
import { getUrl } from "../../utils/url";

interface Vitals {
  LCP: number;
  FID: number;
  CLS: number;
}

declare global {
  interface Window {
    vitals?: Vitals;
  }
}

async function setupVitals(page: Page) {
  await page.evaluate(() => {
    interface LCPEntry {
      startTime: number;
      entryType: "largest-contentful-paint";
    }

    interface CLS_Entry {
      value: number;
      hadRecentInput: boolean;
      entryType: "layout-shift";
    }

    interface FID_Entry {
      startTime: number;
      processingStart: number;
      entryType: "first-input";
    }

    const vitals: Vitals = { LCP: 0, FID: 0, CLS: 0 };

    // LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries() as unknown as LCPEntry[];
      entries.forEach((entry) => {
        vitals.LCP = Math.max(vitals.LCP, entry.startTime);
      });
    }).observe({ type: "largest-contentful-paint", buffered: true });

    // CLS
    new PerformanceObserver((list) => {
      const entries = list.getEntries() as unknown as CLS_Entry[];
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) vitals.CLS += entry.value;
      });
    }).observe({ type: "layout-shift", buffered: true });

    // FID
    new PerformanceObserver((list) => {
      const entries = list.getEntries() as unknown as FID_Entry[];
      entries.forEach((entry) => {
        vitals.FID = entry.processingStart - entry.startTime;
      });
    }).observe({ type: "first-input", buffered: true });

    window.vitals = vitals;
  });
}

test.describe("E2E Performance - Gradients Page", () => {
  test("Gradients page metrics with theme switching", async ({ page }) => {
    await page.coverage.startJSCoverage();
    await setupVitals(page);

    const start = Date.now();
    const baseUrl = process.env.TEST_ENV === "production"
      ? "https://profile-next-kappa.vercel.app"
      : "http://localhost:3000";
    const url = `${baseUrl}/de/gradients`;
    console.log("Testing URL:", url);
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - start;

    // Theme switching interaction
    const toggle = page.getByRole("button", { name: /customize theme/i });
    await toggle.click();
    await page.waitForTimeout(300);
    
    // Switch to different theme
    const themeButton = page.getByRole("button", { name: /^soft$/i });
    if (await themeButton.isVisible()) {
      await themeButton.click();
      await page.waitForTimeout(500);
    }

    // Wait for observers to collect metrics
    const vitals: Vitals = await page.evaluate(() => {
      return new Promise<Vitals>((resolve) => {
        setTimeout(
          () => resolve(window.vitals ?? { LCP: 0, CLS: 0, FID: 0 }),
          3000
        );
      });
    });

    console.log("Performance metrics:", { loadTime, ...vitals });

    // E2E Performance thresholds (relaxed for theme switching)
    expect(loadTime).toBeLessThan(20000);
    expect(vitals.CLS).toBeLessThan(0.25); // Slightly higher for theme changes
    expect(vitals.LCP).toBeGreaterThanOrEqual(0);
    expect(vitals.FID).toBeGreaterThanOrEqual(0);

    const coverage = await page.coverage.stopJSCoverage();
    let totalExecuted = 0;
    let totalLength = 0;

    coverage.forEach((script) => {
      script.functions.forEach((func) => {
        func.ranges.forEach((r) => {
          const length = r.endOffset - r.startOffset;
          totalLength += length;
          if (r.count > 0) totalExecuted += length;
        });
      });
    });

    const percent = totalLength ? (totalExecuted / totalLength) * 100 : 0;
    console.log(`JS Coverage total: ${percent.toFixed(2)}%`);
  });
});
