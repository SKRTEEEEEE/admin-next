
import { describe, it, expect } from 'vitest';
import { GET as getStatus } from '@/app/api/admin/status/route';
import { adminSurfaces } from '@/core/admin/surfaces';

describe('Admin status API', () => {
    it('returns the list of micro frontends', async () => {
        const response = await getStatus();
        const body = await response.json();

        // @ts-ignore
        expect(body.success).toBe(true);
        // @ts-ignore
        expect(Array.isArray(body.data)).toBe(true);
        // @ts-ignore
        expect(body.data.length).toBe(adminSurfaces.length);
    });

    it('includes the expected fields for each surface', async () => {
        const response = await getStatus();
        const body = await response.json();

        // @ts-ignore
        body.data.forEach((surface: Record<string, unknown>) => {
            expect(surface).toHaveProperty('id');
            expect(surface).toHaveProperty('state');
            expect(surface).toHaveProperty('endpoint');
            expect(surface).toHaveProperty('region');
            expect(surface).toHaveProperty('version');
        });
    });
});
