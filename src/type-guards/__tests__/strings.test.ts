import { describe, expect, it, test } from 'vitest';

import { isNonEmptyString } from '@/type-guards';

describe('isNonEmptyString', () => {
  it('returns `true` for a non-empty `string`', () => {
    expect(isNonEmptyString('Hello')).toBe(true);
  });

  it('returns `false` for an empty `string`', () => {
    expect(isNonEmptyString('')).toBe(false);
  });

  it('returns `false` for a `string` with only whitespace', () => {
    expect(isNonEmptyString('    ')).toBe(false);
  });

  describe('returns `false` for non-string values', () => {
    test.each([
      {
        label: 'number',
        value: 42,
      },
      {
        label: 'boolean',
        value: true,
      },
      {
        label: 'null',
        value: null,
      },
      {
        label: 'undefined',
        value: undefined,
      },
      {
        label: 'object',
        value: {},
      },
      {
        label: 'array',
        value: [],
      },
      {
        label: 'Date object',
        value: new Date(),
      },
      {
        label: 'RegExp object',
        value: new RegExp('\\S'),
      },
    ])('$label', ({ value }) => {
      expect(isNonEmptyString(value)).toBe(false);
    });
  });
});
