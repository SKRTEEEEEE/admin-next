import { test, expect } from "@playwright/test";
import { GET as getStatus } from "../../src/app/api/admin/status/route";
import { adminSurfaces } from "../../src/core/admin/surfaces";

test.describe("Admin status API", () => {
  test("returns the list of micro frontends", async () => {
    const response = await getStatus();
    const body = await response.json();

    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(adminSurfaces.length);
  });

  test("includes the expected fields for each surface", async () => {
    const response = await getStatus();
    const body = await response.json();

    body.data.forEach((surface: Record<string, unknown>) => {
      expect(surface).toHaveProperty("id");
      expect(surface).toHaveProperty("state");
      expect(surface).toHaveProperty("endpoint");
      expect(surface).toHaveProperty("region");
      expect(surface).toHaveProperty("version");
    });
  });
});
