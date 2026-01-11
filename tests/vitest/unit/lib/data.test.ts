
import { describe, it, expect } from 'vitest';
import { creatorData, dataStudiesPage } from '@/lib/data';

describe('Data Module - Static Data', () => {
    it('creatorData should have all required fields', () => {
        expect(creatorData).toBeDefined();
        expect(creatorData.githubUrl).toBe('https://github.com/SKRTEEEEEE');
        expect(creatorData.name).toBe('SKRTEEEEEE');
        expect(creatorData.email).toBe('adanreh.m@gmail.com');
        expect(creatorData.emailTo).toBe('mailto:adanreh.m@gmail.com');
        expect(creatorData.website).toBe('https://profile-skrt.vercel.app');
        expect(creatorData.oldProfileWebUrl).toBe('https://profile-skrt.vercel.app');
        expect(creatorData.linkedin).toBe('https://www.linkedin.com/in/skrteeeeee/');
    });

    it('creatorData URLs should be valid', () => {
        expect(creatorData.githubUrl).toMatch(/^https?:\/\//);
        expect(creatorData.website).toMatch(/^https?:\/\//);
        expect(creatorData.oldProfileWebUrl).toMatch(/^https?:\/\//);
        expect(creatorData.linkedin).toMatch(/^https?:\/\//);
        expect(creatorData.emailTo).toMatch(/^mailto:/);
    });

    it('dataStudiesPage should be an array', () => {
        expect(Array.isArray(dataStudiesPage)).toBe(true);
        expect(dataStudiesPage.length).toBeGreaterThan(0);
    });

    it('each study should have required fields', () => {
        dataStudiesPage.forEach((study) => {
            expect(study).toHaveProperty('id');
            expect(study).toHaveProperty('institution');
            expect(study).toHaveProperty('date');
            expect(study).toHaveProperty('badges');
            expect(study).toHaveProperty('link');

            expect(typeof study.id).toBe('number');
            expect(typeof study.institution).toBe('string');
            expect(typeof study.date).toBe('string');
            expect(Array.isArray(study.badges)).toBe(true);
            expect(typeof study.link).toBe('string');
        });
    });

    it('study IDs should be unique', () => {
        const ids = dataStudiesPage.map((study) => study.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    it('study badges should be non-empty arrays', () => {
        dataStudiesPage.forEach((study) => {
            expect(study.badges.length).toBeGreaterThan(0);
            study.badges.forEach((badge) => {
                expect(typeof badge).toBe('string');
                expect(badge.length).toBeGreaterThan(0);
            });
        });
    });

    it('study links should be valid URLs', () => {
        dataStudiesPage.forEach((study) => {
            expect(study.link).toMatch(/^https?:\/\//);
        });
    });

    it('dataStudiesPage should contain expected institutions', () => {
        const institutions = dataStudiesPage.map((study) => study.institution);
        expect(institutions).toContain('CIEF');
        expect(institutions).toContain('Chainlink');
        expect(institutions).toContain('Coliseum');
    });

    it('specific study data should match expected values', () => {
        const ciefStudy = dataStudiesPage.find((s) => s.institution === 'CIEF');
        expect(ciefStudy).toBeDefined();
        expect(ciefStudy?.badges).toContain('JavaScript');
        expect(ciefStudy?.badges).toContain('Node.js');

        const chainlinkStudy = dataStudiesPage.find((s) => s.institution === 'Chainlink');
        expect(chainlinkStudy).toBeDefined();
        expect(chainlinkStudy?.badges).toContain('Blockchain');
        expect(chainlinkStudy?.badges).toContain('Solidity');
    });
});
