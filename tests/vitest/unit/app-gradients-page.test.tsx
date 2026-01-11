
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GradientsPage from '@/app/[locale]/gradients/page';
import React from 'react';

// Mock next-intl/server
vi.mock('next-intl/server', () => ({
    getTranslations: vi.fn(async () => (key: string) => {
        const translations: Record<string, string> = {
            title: 'Gradients Showcase',
            description: 'A collection of cyberpunk gradients'
        };
        return translations[key] || key;
    }),
}));

describe('GradientsPage (Server Component)', () => {
    it('should render correctly with translations', async () => {
        // In Vitest, we can await the async component directly
        const element = await GradientsPage();
        render(element);

        expect(screen.getByText('Gradients Showcase')).toBeInTheDocument();
        expect(screen.getByText('A collection of cyberpunk gradients')).toBeInTheDocument();
        expect(screen.getByText('Gradient Example')).toBeInTheDocument();
    });
});
