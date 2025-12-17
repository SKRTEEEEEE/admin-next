import { describe, it, expect } from 'vitest';
import { double, triple } from '@/core/utils';

describe('core/utils - mathematical operations', () => {
  describe('double function', () => {
    it('should double positive numbers', () => {
      expect(double(5)).toBe(10);
      expect(double(100)).toBe(200);
    });

    it('should double negative numbers', () => {
      expect(double(-5)).toBe(-10);
      expect(double(-100)).toBe(-200);
    });

    it('should handle zero', () => {
      expect(double(0)).toBe(0);
    });

    it('should handle decimals', () => {
      expect(double(2.5)).toBe(5);
      expect(double(1.5)).toBe(3);
    });

    it('should handle large numbers', () => {
      expect(double(1000000)).toBe(2000000);
    });
  });

  describe('triple function', () => {
    it('should triple positive numbers', () => {
      expect(triple(5)).toBe(15);
      expect(triple(100)).toBe(300);
    });

    it('should triple negative numbers', () => {
      expect(triple(-5)).toBe(-15);
      expect(triple(-100)).toBe(-300);
    });

    it('should handle zero', () => {
      expect(triple(0)).toBe(0);
    });

    it('should handle decimals', () => {
      expect(triple(2.5)).toBe(7.5);
      expect(triple(1.5)).toBe(4.5);
    });

    it('should handle large numbers', () => {
      expect(triple(1000000)).toBe(3000000);
    });
  });

  describe('combined operations', () => {
    it('double and triple should work together', () => {
      const num = 5;
      expect(double(triple(num))).toBe(30);
      expect(triple(double(num))).toBe(30);
    });

    it('triple should equal double plus original', () => {
      const num = 7;
      expect(triple(num)).toBe(double(num) + num);
    });
  });
});
