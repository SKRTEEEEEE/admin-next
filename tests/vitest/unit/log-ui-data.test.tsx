
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { siteConfig } from '@/lib/log-ui-data';
import React from 'react';

describe('siteConfig', () => {
    it('should have the correct name', () => {
        expect(siteConfig.name).toBe('Admin Panel');
    });

    it('should have the correct paths', () => {
        expect(siteConfig.paths).toContainEqual({
            id: 'gradients',
            path: '/gradients',
        });
    });

    it('should render the icon correctly', () => {
        render(<div>{siteConfig.icon}</div>);
        const img = screen.getByAltText('Admin Logo');
        expect(img).toBeInTheDocument();
    });
});
