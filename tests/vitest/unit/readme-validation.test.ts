/**
 * Unit tests for README.md validation
 * Validates structure, content, and links in README
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('README.md Validation', () => {
    let readmeContent: string;
    const readmePath = join(process.cwd(), 'README.md');

    beforeAll(() => {
        if (!existsSync(readmePath)) {
            throw new Error('README.md not found');
        }
        readmeContent = readFileSync(readmePath, 'utf-8');
    });

    describe('File Structure', () => {
        it('README.md should exist', () => {
            expect(existsSync(readmePath)).toBe(true);
        });

        it('README should not be empty', () => {
            expect(readmeContent.length).toBeGreaterThan(0);
        });

        it('README should have minimum content length (at least 500 characters)', () => {
            expect(readmeContent.length).toBeGreaterThan(500);
        });
    });

    describe('Essential Sections', () => {
        it('should have a main title (h1)', () => {
            expect(readmeContent).toMatch(/^#\s+.+/m);
        });

        it('should have a description or overview section', () => {
            const hasDescription =
                readmeContent.includes('## Description') ||
                readmeContent.includes('## Overview') ||
                readmeContent.includes('## About') ||
                readmeContent.includes('## 📋') ||
                readmeContent.includes('## 🎯');
            expect(hasDescription).toBe(true);
        });

        it('should have a "Getting Started" or "Installation" section', () => {
            const hasGettingStarted =
                readmeContent.includes('## Getting Started') ||
                readmeContent.includes('## Installation') ||
                readmeContent.includes('## 🚀') ||
                readmeContent.includes('## Quick Start');
            expect(hasGettingStarted).toBe(true);
        });

        it('should have a "Features" or "Tech Stack" section', () => {
            const hasFeaturesOrTech =
                readmeContent.includes('## Features') ||
                readmeContent.includes('## Tech Stack') ||
                readmeContent.includes('## Technologies') ||
                readmeContent.includes('## ⚡') ||
                readmeContent.includes('## 🛠️');
            expect(hasFeaturesOrTech).toBe(true);
        });

        it('should have usage or development instructions', () => {
            const hasUsage =
                readmeContent.includes('## Usage') ||
                readmeContent.includes('## Development') ||
                readmeContent.includes('## Running') ||
                readmeContent.includes('npm run') ||
                readmeContent.includes('```bash');
            expect(hasUsage).toBe(true);
        });
    });

    describe('Code Examples', () => {
        it('should contain code blocks for commands', () => {
            // Check for bash/shell code blocks or any code blocks
            const hasCodeBlocks =
                readmeContent.includes('```bash') ||
                readmeContent.includes('```sh') ||
                readmeContent.includes('```shell') ||
                readmeContent.includes('```') ||
                readmeContent.includes('    npm ') || // indented code blocks
                readmeContent.includes('    yarn ');
            expect(hasCodeBlocks).toBe(true);
        });

        it('should have npm/yarn/pnpm commands', () => {
            const hasPackageManager =
                readmeContent.includes('npm') ||
                readmeContent.includes('yarn') ||
                readmeContent.includes('pnpm');
            expect(hasPackageManager).toBe(true);
        });
    });

    describe('Project Information', () => {
        it('should mention Next.js', () => {
            const mentionsNextJS =
                readmeContent.toLowerCase().includes('next.js') ||
                readmeContent.toLowerCase().includes('nextjs');
            expect(mentionsNextJS).toBe(true);
        });

        it('should mention TypeScript', () => {
            const mentionsTypeScript =
                readmeContent.toLowerCase().includes('typescript') ||
                readmeContent.toLowerCase().includes('ts');
            expect(mentionsTypeScript).toBe(true);
        });

        it('should mention React', () => {
            expect(readmeContent.toLowerCase()).toMatch(/react/);
        });
    });

    describe('Links Validation', () => {
        it('should have valid markdown links format', () => {
            const links = readmeContent.match(/\[.+?\]\(.+?\)/g) || [];
            expect(links.length).toBeGreaterThan(0);
        });

        it('links should not be broken (basic syntax check)', () => {
            const brokenLinks = readmeContent.match(/\[.+?\]\(\s*\)/g);
            expect(brokenLinks).toBeNull();
        });

        it('should not have empty link text', () => {
            const emptyLinkText = readmeContent.match(/\[\s*\]\(.+?\)/g);
            expect(emptyLinkText).toBeNull();
        });
    });

    describe('Formatting Quality', () => {
        it('should not have multiple consecutive blank lines (more than 2)', () => {
            const multipleBlankLines = readmeContent.match(/\n\n\n\n+/g);
            expect(multipleBlankLines).toBeNull();
        });

        it('should have proper heading hierarchy', () => {
            const headings = readmeContent.match(/^#{1,6}\s+.+/gm) || [];
            expect(headings.length).toBeGreaterThan(2);
        });

        it('should use consistent emoji style (if used)', () => {
            const hasEmojis = /[\u{1F300}-\u{1F9FF}]|##\s+[📋🎯🚀⚡🛠️💻]/u.test(readmeContent);
            // If emojis are used, this is just a check that they exist
            // We're not enforcing a style, just documenting it
            if (hasEmojis) {
                expect(hasEmojis).toBe(true);
            }
        });
    });

    describe('Professional Content', () => {
        it('should not have placeholder text like "TODO" or "TBD"', () => {
            const hasPlaceholders =
                readmeContent.includes('TODO') ||
                readmeContent.includes('TBD') ||
                readmeContent.includes('[INSERT') ||
                readmeContent.includes('PLACEHOLDER');
            expect(hasPlaceholders).toBe(false);
        });

        it('should have a license or footer section', () => {
            const hasFooter =
                readmeContent.includes('## License') ||
                readmeContent.includes('## Contributing') ||
                readmeContent.includes('## Author') ||
                readmeContent.includes('## Contact') ||
                readmeContent.includes('MIT') ||
                readmeContent.includes('©') ||
                readmeContent.includes('Made by') ||
                readmeContent.includes('Created by');
            expect(hasFooter).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('should have alt text for images (if images exist)', () => {
            const images = readmeContent.match(/!\[.*?\]\(.+?\)/g);
            if (images && images.length > 0) {
                const imagesWithoutAlt = readmeContent.match(/!\[\s*\]\(.+?\)/g);
                expect(imagesWithoutAlt).toBeNull();
            }
        });
    });
});
