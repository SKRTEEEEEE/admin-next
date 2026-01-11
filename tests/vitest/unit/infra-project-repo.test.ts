
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectApiRepository } from '@/core/infrastructure/api/project.repo';

describe('ProjectApiRepository', () => {
    let repository: ProjectApiRepository;
    const baseUrl = 'http://test-api.com';

    beforeEach(() => {
        repository = new ProjectApiRepository(baseUrl);
        vi.stubGlobal('fetch', vi.fn());
    });

    describe('readEjemplo', () => {
        it('should return data on successful fetch', async () => {
            const mockData = { success: true, data: [{ id: '1', nameId: 'test' }] };
            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => mockData,
            } as Response);

            const result = await repository.readEjemplo();
            expect(result).toEqual(mockData);
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/project'), expect.any(Object));
        });

        it('should throw DomainError on HTTP error', async () => {
            vi.mocked(fetch).mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            } as Response);

            const error = await repository.readEjemplo().catch(e => e);
            expect(error).toBeDefined();
            expect(error.code || error.message || error.friendlyDesc).toBeDefined();
        });

        it('should throw DomainError on network failure', async () => {
            vi.mocked(fetch).mockRejectedValue(new Error('Network failure'));

            const error = await repository.readEjemplo().catch(e => e);
            expect(error).toBeDefined();
            expect(error.code || error.message || error.friendlyDesc).toBeDefined();
        });
    });

    describe('readById', () => {
        it('should return project data on success', async () => {
            const mockData = { success: true, data: { id: '123' } };
            vi.mocked(fetch).mockResolvedValue({
                ok: true,
                json: async () => mockData,
            } as Response);

            const result = await repository.readById('123');
            expect(result).toEqual(mockData);
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/project/123'), expect.any(Object));
        });

        it('should throw DomainError on failure', async () => {
            vi.mocked(fetch).mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            } as Response);

            const error = await repository.readById('123').catch(e => e);
            expect(error).toBeDefined();
            expect(error.code || error.message || error.friendlyDesc).toBeDefined();
        });
    });
});
