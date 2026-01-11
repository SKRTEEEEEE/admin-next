
import { describe, it, expect } from 'vitest';
import { GET as getStatus } from '@/app/api/admin/status/route';
import { adminSurfaces } from '@/core/admin/surfaces';

describe('Admin status data quality', () => {
    it('states should match allowed values', async () => {
        const response = await getStatus();
        const body = await response.json();
        const allowed = ['online', 'standby', 'syncing'];

        // @ts-ignore
        body.data.forEach((surface: { state: string }) => {
            expect(allowed).toContain(surface.state);
        });
    });

    it('version strings should follow semantic format', async () => {
        const response = await getStatus();
        const body = await response.json();

        // @ts-ignore
        body.data.forEach((surface: { version: string }) => {
            expect(surface.version).toMatch(/^\d+\.\d+\.\d+$/);
        });
        // @ts-ignore
        expect(body.data.length).toBe(adminSurfaces.length);
    });
});
