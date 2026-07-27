import { describe, expect, it } from 'vitest';

import {
  kebabify,
  camelToSnake,
  snakeToCamel,
  capitalizeFirstLetter,
  camelToTitle,
  snakeToTitle,
} from '@/strings';

describe('kebabify', () => {
  it.each([
    {
      label: "converts 'camelCase' to 'kebab-case'",
      inputStr: 'camelCase',
      expectedResult: 'camel-case',
    },
    {
      label: "converts 'PascalCase' to 'kebab-case'",
      inputStr: 'PascalCase',
      expectedResult: 'pascal-case',
    },
    {
      label: "converts 'snake_case' to 'kebab-case'",
      inputStr: 'snake_case',
      expectedResult: 'snake-case',
    },
    {
      label: "converts space-separated words to 'kebab-case'",
      inputStr: 'some Words',
      expectedResult: 'some-words',
    },
    {
      label: "converts space followed by lowercase to 'kebab-case'",
      inputStr: 'some words',
      expectedResult: 'some-words',
    },
    {
      label: "handles multiple 'camelCase' transitions",
      inputStr: 'thisIsCamelCase',
      expectedResult: 'this-is-camel-case',
    },
    {
      label: 'handles single world with leading uppercase',
      inputStr: 'Word',
      expectedResult: 'word',
    },
    {
      label: "leave an already 'kebab-case' string unchanged",
      inputStr: 'already-kebab',
      expectedResult: 'already-kebab',
    },
    {
      label: 'handles empty string',
      inputStr: '',
      expectedResult: '',
    },
    {
      label: 'handles single lowercase word',
      inputStr: 'hello',
      expectedResult: 'hello',
    },
  ])('$label', ({ inputStr, expectedResult }) => {
    const result = kebabify(inputStr);
    expect(result).toBe(expectedResult);
  });
});

describe('camelToSnake', () => {
  it.each([
    {
      label: "converts 'camelCase' to 'snake_case'",
      inputStr: 'camelCase',
      expectedResult: 'camel_case',
    },
    {
      label: "converts 'PascalCase' to 'snake_case'",
      inputStr: 'PascalCase',
      expectedResult: 'pascal_case',
    },
    // {
    //   label: "converts space-separated words to 'snake_case'",
    //   inputStr: 'some Words',
    //   expectedResult: 'some_words',
    // },
    // {
    //   label: "converts space followed by lowercase to 'snake_case'",
    //   inputStr: 'some words',
    //   expectedResult: 'some_words',
    // },
    {
      label: "handles multiple 'camelCase' transitions",
      inputStr: 'thisIsCamelCase',
      expectedResult: 'this_is_camel_case',
    },
    {
      label: 'handles single world with leading uppercase',
      inputStr: 'Word',
      expectedResult: 'word',
    },
    {
      label: "leave an already 'snake_case' string unchanged",
      inputStr: 'already_snake',
      expectedResult: 'already_snake',
    },
    // {
    //   label: "leave an already 'snake_case' string unchanged (all uppercase)",
    //   inputStr: 'SNAKE_CASE',
    //   expectedResult: 'SNAKE_CASE',
    // },
    {
      label: 'handles single uppercase letter',
      inputStr: 'X',
      expectedResult: 'x',
    },
    {
      label: 'lowercases a uppercase first character',
      inputStr: 'Hello',
      expectedResult: 'hello',
    },
    {
      label: 'handles empty string',
      inputStr: '',
      expectedResult: '',
    },
  ])('$label', ({ inputStr, expectedResult }) => {
    const result = camelToSnake(inputStr);
    expect(result).toBe(expectedResult);
  });
});

describe('snakeToCamel', () => {
  it.each([
    {
      label: "converts 'snake_case' to 'camelCase'",
      inputStr: 'snake_case',
      expectedResult: 'snakeCase',
    },
    {
      label: "converts multi-word 'snake_case' to 'camelCase'",
      inputStr: 'this_is_snake_case',
      expectedResult: 'thisIsSnakeCase',
    },
    {
      label: 'strips leading underscores',
      inputStr: '_leading_snake_case',
      expectedResult: 'leadingSnakeCase',
    },
    {
      label: 'strips trailing underscores',
      inputStr: 'trailing_snake_case_',
      expectedResult: 'trailingSnakeCase',
    },
    {
      label: 'strips multiple leading underscores',
      inputStr: '__multiple_leading_snake_case',
      expectedResult: 'multipleLeadingSnakeCase',
    },
    {
      label: 'handles trailing underscores by trimming them',
      inputStr: 'trailing__',
      expectedResult: 'trailing',
    },
    // TODO: fix later :]
    // {
    //   label: 'handles single world with leading uppercase',
    //   inputStr: 'Word',
    //   expectedResult: 'word',
    // },
    {
      label: "leave an already 'camelCase' string unchanged",
      inputStr: 'alreadyCamel',
      expectedResult: 'alreadyCamel',
    },
    {
      label: 'handles single word with no underscores',
      inputStr: 'word',
      expectedResult: 'word',
    },
    {
      label: 'handles empty string',
      inputStr: '',
      expectedResult: '',
    },
  ])('$label', ({ inputStr, expectedResult }) => {
    const result = snakeToCamel(inputStr);
    expect(result).toBe(expectedResult);
  });
});

describe('capitalizeFirstLetter', () => {
  it.each([
    {
      label: 'capitalizes the first letter of a lowercase word',
      inputStr: 'hello',
      expectedResult: 'Hello',
    },
    {
      label: 'leaves an already-capitalized word unchanged',
      inputStr: 'Hello',
      expectedResult: 'Hello',
    },
    {
      label: 'handles single character',
      inputStr: 'a',
      expectedResult: 'A',
    },
    {
      label: 'only affects the first character',
      inputStr: 'hELLO',
      expectedResult: 'HELLO',
    },
    {
      label: 'handles empty string',
      inputStr: '',
      expectedResult: '',
    },
  ])('$label', ({ inputStr, expectedResult }) => {
    const result = capitalizeFirstLetter(inputStr);
    expect(result).toBe(expectedResult);
  });
});

describe('camelToTitle', () => {
  it.each([
    {
      label: "converts 'camelCase' to 'Title Case'",
      inputStr: 'camelCase',
      expectedResult: 'Camel Case',
    },
    {
      label: "converts 'PascalCase' to 'Title Case'",
      inputStr: 'PascalCase',
      expectedResult: 'Pascal Case',
    },
    {
      label: "converts a single lowercase word to 'Title Case'",
      inputStr: 'lower',
      expectedResult: 'Lower',
    },
    {
      label: "handles two-word 'camelCase'",
      inputStr: 'helloWorld',
      expectedResult: 'Hello World',
    },
    {
      label: 'handles empty string',
      inputStr: '',
      expectedResult: '',
    },
  ])('$label', ({ inputStr, expectedResult }) => {
    const result = camelToTitle(inputStr);
    expect(result).toBe(expectedResult);
  });
});

describe('snakeToTitle', () => {
  it.each([
    {
      label: "converts 'snake_case' to 'Title Case'",
      inputStr: 'this_is_snake_case',
      expectedResult: 'This Is Snake Case',
    },
    {
      label: 'returns string unchanged if it starts with an underscore',
      inputStr: '_id',
      expectedResult: '_id',
    },
    {
      label: 'returns string unchanged for double-underscore prefix',
      inputStr: '__private',
      expectedResult: '__private',
    },
    {
      label: 'handles trailing underscores by trimming them',
      inputStr: 'trailing__',
      expectedResult: 'Trailing',
    },
    {
      label: 'capitalizes the first letter of each segment',
      inputStr: 'foo_bar_baz',
      expectedResult: 'Foo Bar Baz',
    },
    {
      label: 'handles single word with no underscores',
      inputStr: 'archipelago',
      expectedResult: 'Archipelago',
    },
    {
      label: 'handles empty string',
      inputStr: '',
      expectedResult: '',
    },
  ])('$label', ({ inputStr, expectedResult }) => {
    const result = snakeToTitle(inputStr);
    expect(result).toBe(expectedResult);
  });
});
