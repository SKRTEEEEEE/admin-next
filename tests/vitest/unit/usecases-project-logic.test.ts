
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    readExampleProjectsUC,
    getProjectsForLandingUC,
    readProjectByIdUC,
    readProjectByIdBasicUC,
    readProjectsDeployedUC
} from '@/core/application/usecases/entities/project';
import { projectApiRepository } from '@/core/infrastructure/api/project.repo';

vi.mock('@/core/infrastructure/api/project.repo', () => ({
    projectApiRepository: {
        readEjemplo: vi.fn(),
        readById: vi.fn(),
    }
}));

vi.mock('@skrteeeeee/profile-domain', () => ({
    createDomainError: vi.fn((code, caller, name, friendly, data) => ({
        code, caller, name, friendly, data, isDomainError: true
    })),
    ErrorCodes: {
        DATABASE_FIND: 'DATABASE_FIND',
    }
}));

describe('Project Use Cases Logic', () => {
    const mockProject = {
        id: '1',
        nameId: 'test-project',
        title: { es: 'Título ES', en: 'Title EN', ca: 'Títol CA', de: 'Titel DE' },
        desc: { es: 'Desc ES', en: 'Desc EN', ca: 'Desc CA', de: 'Desc DE' },
        lilDesc: { es: 'Sum ES', en: 'Sum EN', ca: 'Sum CA', de: 'Sum DE' },
        techs: [{ id: 't1', nameBadge: 'React' }],
        keys: [{ id: 'k1', title: { es: 'Key ES', en: 'Key EN', ca: 'Key CA', de: 'Key DE' } }],
        openSource: null,
        operative: null,
        ejemplo: true,
        image: null,
        icon: 'Activity',
        time: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('readExampleProjectsUC', () => {
        it('should return data on success', async () => {
            vi.mocked(projectApiRepository.readEjemplo).mockResolvedValue({
                type: 'success',
                success: true,
                data: [mockProject as any]
            } as any);

            const result = await readExampleProjectsUC();
            expect(result).toHaveLength(1);
            expect((result[0] as any).id).toBe('1');
        });

        it('should throw DomainError on failure response', async () => {
            vi.mocked(projectApiRepository.readEjemplo).mockResolvedValue({
                type: 'error',
                success: false,
                message: 'API Error'
            } as any);

            await expect(readExampleProjectsUC()).rejects.toMatchObject({
                isDomainError: true,
                code: 'DATABASE_FIND'
            });
        });

        it('should wrap generic error in DomainError', async () => {
            vi.mocked(projectApiRepository.readEjemplo).mockRejectedValue(new Error('Boom'));
            await expect(readExampleProjectsUC()).rejects.toMatchObject({
                isDomainError: true,
                code: 'DATABASE_FIND'
            });
        });
    });

    describe('readProjectsDeployedUC', () => {
        it('should call readExampleProjectsUC', async () => {
            vi.mocked(projectApiRepository.readEjemplo).mockResolvedValue({
                success: true,
                data: []
            } as any);
            await readProjectsDeployedUC();
            expect(projectApiRepository.readEjemplo).toHaveBeenCalled();
        });
    });

    describe('readProjectByIdUC', () => {
        it('should return project data on success', async () => {
            vi.mocked(projectApiRepository.readById).mockResolvedValue({
                type: 'success',
                success: true,
                data: mockProject as any
            } as any);

            const result = await readProjectByIdUC('1');
            expect(result.id).toBe('1');
        });

        it('should throw DomainError if project not found (success: false)', async () => {
            vi.mocked(projectApiRepository.readById).mockResolvedValue({
                type: 'error',
                success: false,
                message: 'Not found'
            } as any);

            await expect(readProjectByIdUC('999')).rejects.toMatchObject({
                isDomainError: true,
                code: 'DATABASE_FIND'
            });
        });

        it('should re-throw DomainError if repository throws one', async () => {
            const domainError = { isDomainError: true, code: 'TEST_ERROR' };
            vi.mocked(projectApiRepository.readById).mockRejectedValue(domainError);

            await expect(readProjectByIdUC('1')).rejects.toEqual(domainError);
        });

        it('should wrap generic error in DomainError', async () => {
            vi.mocked(projectApiRepository.readById).mockRejectedValue(new Error('Generic failure'));

            await expect(readProjectByIdUC('1')).rejects.toMatchObject({
                isDomainError: true,
                code: 'DATABASE_FIND'
            });
        });
    });

    describe('getProjectsForLandingUC', () => {
        it('should transform projects correctly for es locale', async () => {
            vi.mocked(projectApiRepository.readEjemplo).mockResolvedValue({
                type: 'success',
                success: true,
                data: [mockProject as any]
            } as any);

            const result = await getProjectsForLandingUC('es');
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: '1',
                title: 'Título ES',
                description: 'Desc ES',
                summary: 'Sum ES',
                techBadges: ['React'],
                keys: ['Key ES']
            });
        });

        it('should throw DomainError on failure response', async () => {
            vi.mocked(projectApiRepository.readEjemplo).mockResolvedValue({
                success: false,
                message: 'Backend error'
            } as any);

            await expect(getProjectsForLandingUC('es')).rejects.toMatchObject({
                isDomainError: true,
                code: 'DATABASE_FIND'
            });
        });

        it('should handle projects with missing fields and use fallbacks', async () => {
            const minimalistProject = {
                nameId: 'min-proj',
                title: { fr: 'French' }, // No 'es', no 'en'
                techs: undefined,
                keys: undefined
            };

            vi.mocked(projectApiRepository.readEjemplo).mockResolvedValue({
                type: 'success',
                success: true,
                data: [minimalistProject as any]
            } as any);

            const result = await getProjectsForLandingUC('es');
            expect(result[0]).toEqual({
                id: 'min-proj',
                title: 'French', // First available if es/en missing
                description: '',
                summary: '',
                techBadges: [],
                keys: []
            });
        });

        it('should re-throw errors from catch block', async () => {
            vi.mocked(projectApiRepository.readEjemplo).mockRejectedValue(new Error('Network error'));

            await expect(getProjectsForLandingUC('es')).rejects.toThrow('Network error');
        });
    });

    describe('readProjectByIdBasicUC', () => {
        it('should call repository readById', async () => {
            vi.mocked(projectApiRepository.readById).mockResolvedValue({ success: true } as any);
            await readProjectByIdBasicUC('123');
            expect(projectApiRepository.readById).toHaveBeenCalledWith('123');
        });
    });
});
