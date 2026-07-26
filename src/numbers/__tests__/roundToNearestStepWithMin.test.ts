import { describe, expect, it, test } from 'vitest';

import { roundToNearestStepWithMin } from '@/numbers';

describe('roundToNearestStepWithMin', () => {
  const defaultOptsTestCases = [
    {
      label: "rounds '12' to nearest step of '5' => '10'",
      value: 12,
      expected: 10,
    },
    {
      label: "rounds '13' to nearest step of '5' => '15'",
      value: 13,
      expected: 15,
    },
    {
      label: "rounds '13.17' to the nearest step of '5' => '15'",
      value: 13.17,
      expected: 15,
    },
    {
      label: 'keeps an already-aligned value unchanged',
      value: 25,
      expected: 25,
    },
    {
      label: "clamps a small value up to the default min of '5'",
      value: 1,
      expected: 5,
    },
    {
      label: "clamps a small, floating point value up to the default min of '5'",
      value: 0.1,
      expected: 5,
    },
    {
      label: "clamps '0' up to min of '5'",
      value: 0,
      expected: 5,
    },
    {
      label: "clamps negative values up to min of '5'",
      value: -10,
      expected: 5,
    },
  ];

  describe("default 'opts' '(min=5, roundFunc=Math.round, step=5)'", () => {
    it.each(defaultOptsTestCases)('$label', ({ value, expected }) => {
      expect(roundToNearestStepWithMin(value)).toBe(expected);
    });
  });

  describe("'null' value for 'opts' behaves the same as no 'opts'", () => {
    it.each(defaultOptsTestCases)('$label', ({ value, expected }) => {
      expect(roundToNearestStepWithMin(value, null)).toBe(expected);
    });
  });

  describe("custom 'min'", () => {
    it("uses a custom 'min'", () => {
      expect(roundToNearestStepWithMin(1, { min: 10 })).toBe(10);
    });

    it("does not clamp when value exceeds custom 'min'", () => {
      expect(roundToNearestStepWithMin(18, { min: 10 })).toBe(20);
    });

    it("allows 'min' of '0'", () => {
      expect(roundToNearestStepWithMin(2, { min: 0 })).toBe(0);
    });
  });

  describe("custom 'roundFunc'", () => {
    it("rounds down when 'Math.floor' is provided", () => {
      expect(roundToNearestStepWithMin(13, { roundFunc: Math.floor })).toBe(10);
    });

    it("rounds up when 'Math.ceil' is provided", () => {
      expect(roundToNearestStepWithMin(11, { roundFunc: Math.ceil })).toBe(15);
    });
  });

  describe("custom 'step'", () => {
    it("rounds to nearest 'step' of '10'", () => {
      expect(roundToNearestStepWithMin(14, { step: 10 })).toBe(10);
      expect(roundToNearestStepWithMin(15, { step: 10 })).toBe(20);
    });

    it("rounds to nearest 'step' of '3'", () => {
      expect(roundToNearestStepWithMin(7, { step: 3 })).toBe(6);
      expect(roundToNearestStepWithMin(8, { step: 3 })).toBe(9);
    });

    it("rounds to nearest 'step' of '1'", () => {
      expect(roundToNearestStepWithMin(7, { step: 1 })).toBe(7);
    });
  });

  describe("all 'opts' combined", () => {
    it("uses 'min', 'roundFunc', and 'step' together", () => {
      expect(
        roundToNearestStepWithMin(14, {
          min: 5,
          roundFunc: Math.floor,
          step: 10,
        }),
      ).toBe(10);
    });

    it("clamps to 'min' when rounds value is below 'min'", () => {
      expect(
        roundToNearestStepWithMin(3, {
          min: 5,
          roundFunc: Math.floor,
          step: 10,
        }),
      ).toBe(5);
    });
  });

  describe('error handling', () => {
    describe("throws a 'RangeError' when 'step' is not a finite positive number", () => {
      test.each([
        {
          label: "'step' is '0'",
          numValue: 10,
          stepValue: 0,
        },
        {
          label: "'step' is negative",
          numValue: 10,
          stepValue: -5,
        },
        {
          label: "'step' is 'Infinity'",
          numValue: 10,
          stepValue: Infinity,
        },
        {
          label: "'step' is 'NaN'",
          numValue: 10,
          stepValue: NaN,
        },
      ])('$label', ({ numValue, stepValue }) => {
        expect(() => {
          roundToNearestStepWithMin(numValue, { step: stepValue });
        }).toThrow(RangeError);
        expect(() => {
          roundToNearestStepWithMin(numValue, { step: stepValue });
        }).toThrow(
          "[roundToNearestStepWithMin] : Invalid 'step' value. It must be a positive finite number.",
        );
      });
    });
  });
});
