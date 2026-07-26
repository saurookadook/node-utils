import { describe, expect, it } from 'vitest';

import { clamp } from '@/numbers';

describe('clamp', () => {
  it('returns the value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("clamps to 'min' when value is below range", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("clamps to 'max' when value is above range", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("returns 'min' when value equals 'min'", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it("returns 'max' when value equals 'max'", () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('works with negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it("works when 'min' equals 'max'", () => {
    expect(clamp(3, 3, 3)).toBe(3);
    expect(clamp(5, 3, 3)).toBe(3);
    expect(clamp(1, 3, 3)).toBe(3);
  });

  it('works with floating-point values', () => {
    expect(clamp(0.5, 0, 1)).toBe(0.5);
    expect(clamp(1.5, 0, 1)).toBe(1);
    expect(clamp(-0.5, 0, 1)).toBe(0);
  });

  describe('error handling', () => {
    it("throws a 'TypeError' when 'min' is greater than 'max'", () => {
      expect(() => clamp(5, 10, 0)).toThrow(TypeError);
      expect(() => clamp(5, 10, 0)).toThrow(
        `[clamp] : Invalid range: 'min' (10) cannot be greater than 'max' (0).`,
      );
    });
  });
});
