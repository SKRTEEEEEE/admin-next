import { test, expect } from "@playwright/test";

test.describe("Admin status use cases", () => {
  test("UI consumes the status snapshot", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator(".admin-status-grid .admin-card")).toHaveCount(3);
  });

  test("API snapshot matches UI cards", async ({ request }) => {
    const response = await request.get("/api/admin/status");
    const body = await response.json();
    expect(body.data).toHaveLength(3);
  });
});
