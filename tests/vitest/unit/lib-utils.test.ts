import { describe, it, expect } from 'vitest';
import { cn, gradients } from '@/lib/utils';

describe('lib/utils - cn function', () => {
    it('should merge class names correctly', () => {
        const result = cn('text-red-500', 'bg-blue-500');
        expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
        const isActive = true;
        const result = cn('base-class', isActive && 'active-class');
        expect(result).toBe('base-class active-class');
    });

    it('should handle false/null/undefined values', () => {
        const result = cn('base-class', false && 'false-class', null, undefined);
        expect(result).toBe('base-class');
    });

    it('should merge conflicting tailwind classes', () => {
        const result = cn('px-2 py-1 px-4');
        // twMerge should keep only the last px value
        expect(result).toContain('px-4');
        expect(result).toContain('py-1');
        expect(result).not.toMatch(/px-2/);
    });

    it('should handle empty input', () => {
        const result = cn();
        expect(result).toBe('');
    });

    it('should handle array of classes', () => {
        const result = cn(['text-lg', 'font-bold']);
        expect(result).toBe('text-lg font-bold');
    });

    it('should handle object with boolean values', () => {
        const result = cn({
            'text-red-500': true,
            'bg-blue-500': false,
            'hover:opacity-80': true,
        });
        expect(result).toContain('text-red-500');
        expect(result).toContain('hover:opacity-80');
        expect(result).not.toContain('bg-blue-500');
    });
});

describe('lib/utils - gradients', () => {
    it('should export an array of gradients', () => {
        expect(Array.isArray(gradients)).toBe(true);
        expect(gradients.length).toBeGreaterThan(0);
    });

    it('should contain valid CSS gradient strings', () => {
        gradients.forEach((gradient) => {
            expect(gradient).toContain('linear-gradient');
            expect(gradient).toMatch(/\d+deg/);
            expect(gradient).toContain('rgba');
        });
    });

    it('should have gradients with cyberpunk color palette', () => {
        // Check that gradients include expected colors
        const gradientsString = gradients.join(' ');
        expect(gradientsString).toContain('rgba');
    });

    it('should have correct gradient format', () => {
        const sampleGradient = gradients[0];
        expect(sampleGradient).toMatch(
            /linear-gradient\(\d+(\.\d+)?deg,\s*rgba\([^)]+\)\s*-?\d+(\.\d+)?%,\s*rgba\([^)]+\)\s*\d+(\.\d+)?%\)/
        );
    });
});

// @ts-ignore - internal function test
import { hexToRgba } from '@/lib/utils';

describe('lib/utils - hexToRgba', () => {
    it('should convert 6-digit hex to rgba', () => {
        expect(hexToRgba('#ff0000', 1)).toBe('rgba(255, 0, 0, 1)');
    });

    it('should convert 3-digit hex to rgba', () => {
        expect(hexToRgba('#f00', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('should return input if it already is rgba', () => {
        expect(hexToRgba('rgba(0,0,0,1)', 0.5)).toBe('rgba(0,0,0,1)');
    });
});
