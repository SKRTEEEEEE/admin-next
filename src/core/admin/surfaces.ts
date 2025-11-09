export type AdminSurfaceState = "online" | "standby" | "syncing";

export type AdminSurface = {
  id: "admin" | "profile" | "agora";
  state: AdminSurfaceState;
  endpoint: string;
  region: string;
  version: string;
};

export const adminSurfaces: AdminSurface[] = [
  { id: "admin", state: "online", endpoint: "admin-next", region: "global", version: "1.0.0" },
  { id: "profile", state: "syncing", endpoint: "profile-next", region: "eu-west", version: "1.0.0" },
  { id: "agora", state: "standby", endpoint: "agora-next", region: "eu-west", version: "0.9.2" },
];
