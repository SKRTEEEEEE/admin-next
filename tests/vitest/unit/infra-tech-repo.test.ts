
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TechApiRepository } from '@/core/infrastructure/api/tech.repo';
import { ReadAllParams } from "@skrteeeeee/profile-domain";

describe('TechApiRepository', () => {
    let repository: TechApiRepository;
    const baseUrl = 'http://test-api.com';

    beforeEach(() => {
        repository = new TechApiRepository(baseUrl);
        vi.stubGlobal('fetch', vi.fn());
    });

    it('readDb should fetch from db endpoint', async () => {
        const mockData = { success: true, data: [] };
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => mockData,
        } as Response);

        const result = await repository.readDb();
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/tech/${ReadAllParams.Db}`), expect.any(Object));
    });

    it('readFlatten should fetch from flatten endpoint', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, data: [] }),
        } as Response);

        await repository.readFlatten();
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/tech/${ReadAllParams.Flatten}`), expect.any(Object));
    });

    it('readFlatten should throw on failure', async () => {
        vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
        await expect(repository.readFlatten()).rejects.toBeDefined();
    });

    it('readCategory should fetch from category endpoint', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, data: {} }),
        } as Response);

        await repository.readCategory();
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/tech/${ReadAllParams.Category}`), expect.any(Object));
    });

    it('readCategory should throw on failure', async () => {
        vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
        await expect(repository.readCategory()).rejects.toBeDefined();
    });

    it('readFull should fetch from full endpoint', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, data: {} }),
        } as Response);

        await repository.readFull();
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/tech/${ReadAllParams.Full}`), expect.any(Object));
    });

    it('readFull should throw on failure', async () => {
        vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
        await expect(repository.readFull()).rejects.toBeDefined();
    });

    it('should throw DomainError on failure', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Server Error',
        } as Response);

        const error = await repository.readDb().catch(e => e);
        expect(error).toBeDefined();
        expect(error.code || error.message || error.friendlyDesc).toBeDefined();
    });
});
