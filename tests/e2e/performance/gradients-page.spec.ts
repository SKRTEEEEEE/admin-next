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
  test("Gradients page loads successfully", async ({ page }) => {
    const baseUrl = process.env.TEST_ENV === "production"
      ? "https://profile-next-kappa.vercel.app"
      : "http://localhost:3000";
    const url = `${baseUrl}/es/gradients`;
    console.log("Testing URL:", url);
    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");

    // Verificar que la página carga
    await expect(page.locator("body")).toBeVisible();
  });
});
