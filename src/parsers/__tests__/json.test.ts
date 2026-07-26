import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';

import { safeParseJSON, safeStringifyJSON } from '@/parsers';

describe('safeParseJSON', () => {
  let consoleErrorSpy: Mock;

  beforeAll(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());
  });

  afterEach(() => {
    consoleErrorSpy.mockReset();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it.each([
    {
      label: 'parses a valid JSON string',
      testString: '{"name":"John","age":30}',
      expectedResult: { name: 'John', age: 30 },
    },
    {
      label: 'parses a number value',
      testString: '42',
      expectedResult: 42,
    },
    {
      label: 'parses a boolean value',
      testString: 'true',
      expectedResult: true,
    },
    {
      label: 'parses an array',
      testString: '[1,2,3]',
      expectedResult: [1, 2, 3],
    },
    {
      label: "parses 'null' as a valid JSON string",
      testString: 'null',
      expectedResult: null,
    },
  ])('$label', ({ testString, expectedResult }) => {
    const result = safeParseJSON(testString);
    expect(result).toEqual(expectedResult);
  });

  it("returns 'null' for an invalid JSON string and logs error", () => {
    const invalidJSONString = '{"foo":"bar","count":47,"woops":"no-closing-brace"';
    const result = safeParseJSON(invalidJSONString);
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining(
        `[safeParseJSON] : Failed to parse '${invalidJSONString}' (type 'string') Returning \`null\`.\n`,
      ),
      expect.any(Error),
    );
  });
});

describe('safeStringifyJSON', () => {
  let consoleErrorSpy: Mock;

  beforeAll(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());
  });

  afterEach(() => {
    consoleErrorSpy.mockReset();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('stringifies a valid object', () => {
    expect(safeStringifyJSON({ a: 1 })).toBe('{"a":1}');
  });

  it("stringifies a 'string'", () => {
    expect(safeStringifyJSON('hello')).toBe('"hello"');
  });

  it("stringifies a 'number'", () => {
    expect(safeStringifyJSON(42)).toBe('42');
  });

  it("stringifies a 'boolean'", () => {
    expect(safeStringifyJSON(true)).toBe('true');
    expect(safeStringifyJSON(false)).toBe('false');
  });

  it("stringifies 'null'", () => {
    expect(safeStringifyJSON(null)).toBe('null');
  });

  it('stringifies an array', () => {
    expect(safeStringifyJSON([1, 2, 3])).toBe('[1,2,3]');
  });

  it("returns 'null' value when 'JSON.stringify' throws (i.e. for a circular reference)", () => {
    const circularObj: any = {};
    circularObj.self = circularObj;
    expect(safeStringifyJSON(circularObj)).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining(
        `[safeStringifyJSON] : Failed to stringify value. Returning \`null\`.\n`,
      ),
      { value: circularObj, type: 'object' },
      expect.any(Error),
    );
  });
});
