import { test, expect } from "@playwright/test";
import { GET as getStatus } from "../../src/app/api/admin/status/route";
import { adminSurfaces } from "../../src/core/admin/surfaces";

test.describe("Admin status data quality", () => {
  test("states should match allowed values", async () => {
    const response = await getStatus();
    const body = await response.json();
    const allowed = ["online", "standby", "syncing"];

    body.data.forEach((surface: { state: string }) => {
      expect(allowed).toContain(surface.state);
    });
  });

  test("version strings should follow semantic format", async () => {
    const response = await getStatus();
    const body = await response.json();

    body.data.forEach((surface: { version: string }) => {
      expect(surface.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
    expect(body.data.length).toBe(adminSurfaces.length);
  });
});
