
import { test, expect } from "@playwright/test";

test.describe("Integration - Error System (Client)", () => {

    test("should show correct toast icons and messages for different errors", async ({ page }) => {
        // 1. Go to dashboard (contains ErrorToastDemo)
        await page.goto("http://localhost:3000/es");

        // 2. Click "Network Error" button (simulateNetworkError)
        // Using a very specific selector to avoid strict mode violations
        const networkButton = page.getByText(/Red \(meta\.desc con "ups"\)/i);
        await networkButton.click();

        // 3. Verify the toast appears
        // Sonner toasts usually have role="status" or are within an ol/li structure
        // We'll search by text directly for maximum compatibility
        await expect(page.getByText(/Ups, error de conexión/i)).toBeVisible({ timeout: 10000 });

        // 4. Click "Custom Error" button
        const customButton = page.getByText(/Personalizado \(meta\.icon explícito\)/i);
        await customButton.click();

        // 5. Verify custom message
        await expect(page.getByText(/Recurso no encontrado/i)).toBeVisible({ timeout: 10000 });
    });
});
