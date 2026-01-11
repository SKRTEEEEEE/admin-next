import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import React from 'react';

describe('Button Component', () => {
    it('should render button with correct text', () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('should be clickable', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have outline variant styles', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole('button', { name: /outline/i });
        expect(button.className).toContain('border');
        expect(button.className).toContain('bg-background');
    });

    it('should be disabled when disabled prop is set', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button', { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button.className).toContain('disabled:opacity-50');
    });

    it('should have correct accessibility attributes', () => {
        render(<Button>Access</Button>);
        const button = screen.getByRole('button', { name: /access/i });
        expect(button.tagName).toBe('BUTTON');
    });

    it('should render as a child with asChild prop', () => {
        // Tests Radix Slot functionality
        render(
            <Button asChild>
                <a href="/link">Link Button</a>
            </Button>
        );
        const link = screen.getByRole('link', { name: /link button/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/link');
    });
});
