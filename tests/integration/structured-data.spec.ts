import { test, expect } from "@playwright/test";

test.describe("Structured data", () => {
  test("person schema exists", async ({ page }) => {
    await page.goto("/es");
    const script = page.locator('script[type="application/ld+json"]').first();
    await expect(script).toBeVisible();
    const content = await script.textContent();
    expect(content).toBeTruthy();
    const json = JSON.parse(content!);
    expect(json["@type"]).toBe("Person");
  });
});
