import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

const _rules = {
  'array-bracket-newline': [1, 'consistent'],
  'array-bracket-spacing': [
    1,
    'never',
    {
      arraysInArrays: false,
      objectsInArrays: false,
    },
  ],
  'array-element-newline': [
    0,
    {
      multiline: true,
      minItems: 2,
    },
  ],
  'arrow-parens': [2, 'always'],
  'comma-dangle': [2, 'always-multiline'],
  curly: [1, 'multi-line'],
  'class-methods-use-this': 0,
  indent: [0, 4],
  'keyword-spacing': [
    2,
    {
      before: true,
      after: true,
      overrides: {
        function: {
          after: false,
        },
        while: {
          after: false,
        },
      },
    },
  ],
  'max-len': 0,
};

export default defineConfig([
  globalIgnores([
    'build', // force formatting
    'coverage',
    'dist',
    'node_modules',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
]);
