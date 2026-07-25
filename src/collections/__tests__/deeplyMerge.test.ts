import { describe, expect, it, vi } from 'vitest';
import { deeplyMerge } from '../deeplyMerge';

describe('deeplyMerge', () => {
  const testCases = createTestCases();

  describe('as individual functions', () => {
    it('handles multiple object arguments', () => {
      const { target, sources, expected } = testCases.simpleCase();
      const result = deeplyMerge<any, any>(target, ...sources);

      expect(result.bar).toBe(expected.bar);
      expect(result.count).toBe(expected.count);
      expect(result.foo).toBe(expected.foo);
    });

    it('gracefully handles string arguments', () => {
      const warnSpy = vi.spyOn(console, 'warn');
      const { target, sources, expected } = testCases.simpleCaseWithStringArgument();
      const result = deeplyMerge<any, any>(target, ...sources);

      expect(warnSpy).toHaveBeenCalled();
      expect(result.bar).toBe(expected.bar);
      expect(result.count).toBe(expected.count);

      warnSpy.mockRestore();
    });

    it('handles objects that have arrays', () => {
      const { target, sources, expected } = testCases.caseWithArrays();
      const result = deeplyMerge<any, any>(target, ...sources);

      expect(result.bar).toBe(expected.bar);
      expect(result.count).toBe(expected.count);
      expect(result.foo).toBe(expected.foo);
      expect(result.cats).toHaveLength(expected.cats.length);
    });

    it('handles objects that have arrays and nested objects without mutating original nested references', () => {
      const { target, sources, expected } = testCases.caseWithArraysAndNesting();
      const result = deeplyMerge<any, any>(target, ...sources);

      expect(result.cats).toHaveLength(expected.cats.length);
      expect(result.config.a).toBe(expected.config.a);
      expect(result.config.c).toBe(expected.config.c);
      expect(result.config.z).toBe(expected.config.z);
      expect(result.config.config._a).toBe(expected.config.config._a);
      expect(result.config.config._b).toBe(expected.config.config._b);
      expect(result.config.config._c).toBe(expected.config.config._c);
      expect(result.config.config.cats).toHaveLength(
        expected.config.config.cats.length,
      );
    });

    it('handles differing value types without throwing', () => {
      const { target, sources, expected } = testCases.caseWithDifferingTypes();
      const result = deeplyMerge<any, any>(target, ...sources);

      expect(result.truthy).toEqual(expected.truthy);
      expect(result.falsy).toBe(expected.falsy);
    });
  });
});

function createTestCases() {
  return {
    simpleCase: () => {
      return {
        target: {},
        sources: [
          {
            foo: 'bar',
          },
          {
            bar: 'baz',
            count: 3,
          },
        ],
        expected: {
          foo: 'bar',
          bar: 'baz',
          count: 3,
        },
      };
    },
    simpleCaseWithStringArgument: () => {
      return {
        target: {},
        sources: [
          'not an object',
          {
            bar: 'baz',
            count: 3,
          },
        ],
        expected: {
          bar: 'baz',
          count: 3,
        },
      };
    },
    caseWithArrays: () => {
      return {
        target: {
          bar: '',
          count: 1,
        },
        sources: [
          {
            foo: 'bar',
            cats: [
              {
                name: 'Buddy',
                age: 6,
              },
            ],
          },
          {
            bar: 'baz',
            count: 3,
          },
          {
            cats: [
              {
                name: 'Gordo',
                age: 8,
              },
              {
                name: 'Zero',
                age: 8,
              },
            ],
            foo: 'meow',
          },
          {
            count: 6,
            bar: 'woof',
          },
        ],
        expected: {
          foo: 'meow',
          cats: [
            {
              name: 'Buddy',
              age: 6,
            },
            {
              name: 'Gordo',
              age: 8,
            },
            {
              name: 'Zero',
              age: 8,
            },
          ],
          count: 6,
          bar: 'woof',
        },
      };
    },
    caseWithArraysAndNesting: () => {
      return {
        target: {
          config: {
            a: 'bb',
            c: 'ab',
            z: true,
            config: {
              _a: 'bb',
              _c: 'ab',
            },
          },
          cats: [
            {
              name: 'Buddy',
              age: 6,
            },
          ],
        },
        sources: [
          {
            config: {
              a: 'm',
              c: 'i',
              z: false,
              config: {
                cats: [
                  {
                    name: 'Grumpy',
                    age: 100,
                  },
                ],
              },
            },
          },
          {
            config: {
              config: {
                _a: 'n',
                _b: 'on',
                _c: 'pp',
                cats: [
                  {
                    name: 'Justabby',
                    age: 1,
                  },
                ],
              },
            },
            cats: [
              {
                name: 'Gordo',
                age: 8,
              },
              {
                name: 'Zero',
                age: 8,
              },
            ],
          },
        ],
        expected: {
          config: {
            a: 'm',
            c: 'i',
            z: false,
            config: {
              _a: 'n',
              _b: 'on',
              _c: 'pp',
              cats: [
                {
                  name: 'Grumpy',
                  age: 100,
                },
                {
                  name: 'Justabby',
                  age: 1,
                },
              ],
            },
          },
          cats: [
            {
              name: 'Buddy',
              age: 6,
            },
            {
              name: 'Gordo',
              age: 8,
            },
            {
              name: 'Zero',
              age: 8,
            },
          ],
        },
      };
    },
    caseWithDifferingTypes: () => {
      return {
        target: {
          truthy: 'true',
          falsy: 0,
        },
        sources: [
          {
            truthy: {},
            falsy: '',
          },
        ],
        expected: {
          truthy: {},
          falsy: '',
        },
      };
    },
    // {
    //     target: {},
    //     sources: [
    //         { foo: 'bar' },
    //         { bar: 'baz', count: 3 }
    //     ],
    //     expected: { }
    // },
  };
}
