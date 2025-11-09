import { NextResponse } from "next/server";
import { adminSurfaces } from "@/core/admin/surfaces";

export async function GET() {
  const payload = adminSurfaces.map((surface) => ({
    id: surface.id,
    state: surface.state,
    endpoint: surface.endpoint,
    region: surface.region,
    version: surface.version,
  }));

  return NextResponse.json({
    success: true,
    data: payload,
    generatedAt: new Date().toISOString(),
  });
}
