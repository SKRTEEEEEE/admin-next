import { describe, it, expect } from 'vitest';
import { cn, gradients } from '@/lib/utils';

describe('lib/utils - cn function', () => {
  it('should merge class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toContain('base');
    expect(result).toContain('active');
  });

  it('should handle false/null/undefined values', () => {
    const result = cn('base', false, null, undefined, 'valid');
    expect(result).toContain('base');
    expect(result).toContain('valid');
    expect(result).not.toContain('false');
    expect(result).not.toContain('null');
  });

  it('should merge conflicting tailwind classes', () => {
    const result = cn('px-4', 'px-8');
    // twMerge should keep only the last one
    expect(result).not.toContain('px-4');
    expect(result).toContain('px-8');
  });

  it('should handle empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });
});

describe('lib/utils - gradients', () => {
  it('should export an array of gradients', () => {
    expect(Array.isArray(gradients)).toBe(true);
    expect(gradients.length).toBeGreaterThan(0);
  });

  it('should contain valid CSS gradient strings', () => {
    gradients.forEach((gradient) => {
      expect(typeof gradient).toBe('string');
      expect(gradient).toMatch(/linear-gradient|radial-gradient/);
    });
  });

  it('should have gradients with color values', () => {
    gradients.forEach((gradient) => {
      expect(gradient).toMatch(/#[0-9a-fA-F]{3,6}|rgb|hsl/);
    });
  });
});
