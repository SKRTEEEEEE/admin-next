
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    readTechDbUC,
    readTechFlattenUC,
    readTechCategoryUC,
    readTechFullUC
} from '@/core/application/usecases/entities/tech';
import { techApiRepository } from '@/core/infrastructure/api/tech.repo';

vi.mock('@/core/infrastructure/api/tech.repo', () => ({
    techApiRepository: {
        readDb: vi.fn(),
        readFlatten: vi.fn(),
        readCategory: vi.fn(),
        readFull: vi.fn(),
    }
}));

describe('Tech Use Cases', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('readTechDbUC should call repository.readDb', async () => {
        vi.mocked(techApiRepository.readDb).mockResolvedValue({ success: true, data: [] } as any);
        await readTechDbUC();
        expect(techApiRepository.readDb).toHaveBeenCalled();
    });

    it('readTechFlattenUC should call repository.readFlatten', async () => {
        vi.mocked(techApiRepository.readFlatten).mockResolvedValue({ success: true, data: [] } as any);
        await readTechFlattenUC();
        expect(techApiRepository.readFlatten).toHaveBeenCalled();
    });

    it('readTechCategoryUC should call repository.readCategory', async () => {
        vi.mocked(techApiRepository.readCategory).mockResolvedValue({ success: true, data: {} } as any);
        await readTechCategoryUC();
        expect(techApiRepository.readCategory).toHaveBeenCalled();
    });

    it('readTechFullUC should call repository.readFull', async () => {
        vi.mocked(techApiRepository.readFull).mockResolvedValue({ success: true, data: {} } as any);
        await readTechFullUC();
        expect(techApiRepository.readFull).toHaveBeenCalled();
    });
});
