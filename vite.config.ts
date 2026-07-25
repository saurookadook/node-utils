/// <reference types="vitest/config" />
import path from 'path';
import { defineConfig, type UserConfig } from 'vite';
import type { InlineConfig } from 'vitest/node';

const projectRoot = path.resolve();

type ViteConfig = UserConfig & { test: InlineConfig };

const config: ViteConfig = {
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true, // to get coverage reports even if tests fail
    },
    environment: 'node',
    include: [
      '**/__tests__/**/*.ts', // force formatting
      '**/*.{spec,test}.ts',
    ],
    reporters: [
      // 'json',
      'verbose',
    ],
    setupFiles: ['./vitest.setup.ts'],
  },
};

// https://vite.dev/config/
export default defineConfig(config);
