
import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnimatedGradientBackground } from '@/components/admin/animated-gradient';
import { gradients } from '@/lib/utils';

describe('AnimatedGradientBackground', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render with a random gradient initially', () => {
        const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
        const { container } = render(<AnimatedGradientBackground />);
        const div = container.querySelector('.admin-gradient') as HTMLElement;
        expect(div).toBeInTheDocument();

        // JSDOM style property is normalized
        expect(div.style.backgroundImage).toBe(gradients[0]);

        randomSpy.mockRestore();
    });

    it('should change gradient after interval', () => {
        const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

        const { container } = render(<AnimatedGradientBackground />);
        const div = container.querySelector('.admin-gradient') as HTMLElement;

        const initialGradient = div.style.backgroundImage;

        // Fast-forward 6.1 seconds
        act(() => {
            vi.advanceTimersByTime(6100);
        });

        const newGradient = div.style.backgroundImage;
        expect(newGradient).not.toBe(initialGradient);
        expect(newGradient).toBe(gradients[1]);

        randomSpy.mockRestore();
    });
});
