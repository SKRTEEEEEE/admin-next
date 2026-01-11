
import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';

/**
 * Unit Tests for Project Use Cases
 * These tests verify the existence and structure of project use case modules
 */
describe('Project Use Cases', () => {
    describe('readExampleProjectsUC', () => {
        it('should have use case file in correct location', () => {
            // Verify the file exists
            const useCasePath = path.join(process.cwd(), 'src', 'core', 'application', 'usecases', 'entities', 'project.ts');
            const fileExists = fs.existsSync(useCasePath);

            expect(fileExists).toBeTruthy();
        });

        it('should have correct TypeScript module structure', () => {
            // Read the file content
            const useCasePath = path.join(process.cwd(), 'src', 'core', 'application', 'usecases', 'entities', 'project.ts');
            const content = fs.readFileSync(useCasePath, 'utf-8');

            // Verify it exports readExampleProjectsUC
            expect(content).toContain('readExampleProjectsUC');
            expect(content).toContain('export');

            // Verify it uses async/await or returns Promise
            expect(content.includes('async') || content.includes('Promise')).toBeTruthy();
        });
    });

    describe('readProjectByIdUC', () => {
        it('should have readProjectByIdUC exported', () => {
            const useCasePath = path.join(process.cwd(), 'src', 'core', 'application', 'usecases', 'entities', 'project.ts');
            const content = fs.readFileSync(useCasePath, 'utf-8');

            // Verify it exports readProjectByIdUC
            expect(content).toContain('readProjectByIdUC');
            expect(content).toContain('export');
        });

        it('should handle async operations', () => {
            const useCasePath = path.join(process.cwd(), 'src', 'core', 'application', 'usecases', 'entities', 'project.ts');
            const content = fs.readFileSync(useCasePath, 'utf-8');

            // Verify it uses async/await or returns Promise
            expect(content.includes('async') || content.includes('Promise')).toBeTruthy();
        });

        it('should import from project repository', () => {
            const useCasePath = path.join(process.cwd(), 'src', 'core', 'application', 'usecases', 'entities', 'project.ts');
            const content = fs.readFileSync(useCasePath, 'utf-8');

            // Verify it imports from project repository
            expect(content).toContain('from "@/core/infrastructure/api/project.repo"');
        });
    });
});
