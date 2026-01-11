
import { describe, it, expect } from 'vitest';
import {
    generatePersonSchema,
    generateWebSiteSchema,
    generateBreadcrumbSchema,
    generateProjectSchema,
    generateProfilePageSchema
} from '@/lib/seo/schemas';
import { personalInfo, baseUrl } from '@/lib/seo/metadata';

describe('SEO Schemas', () => {
    describe('generatePersonSchema', () => {
        it('should generate valid Person schema for default locale (es)', () => {
            const schema = generatePersonSchema();
            expect(schema['@type']).toBe('Person');
            expect(schema.name).toBe(personalInfo.name);
            expect(schema.jobTitle).toBe(personalInfo.jobTitle.es);
            expect(schema.address.addressLocality).toBe(personalInfo.location.city);
        });

        it('should generate valid Person schema for english locale', () => {
            const schema = generatePersonSchema('en');
            expect(schema.jobTitle).toBe(personalInfo.jobTitle.en);
            expect(schema.hasOccupation.name).toBe(personalInfo.jobTitle.en);
        });
    });

    describe('generateWebSiteSchema', () => {
        it('should generate valid WebSite schema', () => {
            const locale = 'es';
            const schema = generateWebSiteSchema(locale);
            expect(schema['@type']).toBe('WebSite');
            expect(schema.url).toBe(baseUrl);
            expect(schema.name).toContain(personalInfo.name);
            expect(schema.inLanguage).toContain(locale);
        });
    });

    describe('generateBreadcrumbSchema', () => {
        it('should generate valid BreadcrumbList schema', () => {
            const items = [
                { name: 'Home', url: '/' },
                { name: 'Portafolio', url: '/portafolio' }
            ];
            const locale = 'en';
            const schema = generateBreadcrumbSchema(items, locale);

            expect(schema['@type']).toBe('BreadcrumbList');
            expect(schema.itemListElement).toHaveLength(2);
            expect(schema.itemListElement[0].name).toBe('Home');
            expect(schema.itemListElement[0].item).toBe(`${baseUrl}/${locale}/`);
            expect(schema.itemListElement[1].position).toBe(2);
        });
    });

    describe('generateProjectSchema', () => {
        it('should generate valid SoftwareApplication schema for a project', () => {
            const projectData = {
                name: 'Test Project',
                description: 'A test project description',
                url: 'https://example.com/project',
                dateCreated: '2024-01-01',
                programmingLanguages: ['TypeScript', 'React']
            };
            const schema = generateProjectSchema(projectData);

            expect(schema['@type']).toBe('SoftwareApplication');
            expect(schema.name).toBe(projectData.name);
            expect(schema.description).toBe(projectData.description);
            expect(schema.programmingLanguage).toEqual(projectData.programmingLanguages);
            expect(schema.author.name).toBe(personalInfo.name);
        });
    });

    describe('generateProfilePageSchema', () => {
        it('should generate valid ProfilePage schema', () => {
            const locale = 'ca';
            const schema = generateProfilePageSchema(locale);
            expect(schema['@type']).toBe('ProfilePage');
            expect(schema.url).toBe(`${baseUrl}/${locale}/portafolio`);
            expect(schema.mainEntity.name).toBe(personalInfo.name);
        });
    });
});
