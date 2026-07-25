import { defineConfig, type Options } from 'tsup';
import type { BuildOptions } from 'esbuild';

const sharedConfig = {
  clean: true,
  dts: true, // Generate declaration files (.d.ts)
  entry: [
    './src/collections/index.ts',
    './src/main.ts', // force formatting
  ],
  /**
   * Welp, keeping code comments is apparently not supported by esbuild
   * - https://github.com/egoist/tsup/issues/1059#issuecomment-1855486303
   * - https://github.com/evanw/esbuild/issues/1439#issuecomment-879355151
   *
   * However in combination with `removeComments: false` in the `tsconfig.json`, this
   * seems to work ¯\_(ツ)_/¯
   */
  esbuildOptions: (options: BuildOptions) => {
    options.legalComments = 'external';
  },
  splitting: true,
};

function buildTsupConfig(options: Options): Options {
  return {
    ...sharedConfig,
    ...options,
  };
}

export default defineConfig((options: Options) => {
  // TODO: use this for minify instead of hardcoded boolean
  const isProd = process.env.NODE_ENV === 'production';

  return [
    buildTsupConfig({
      ...options,
      format: ['cjs'],
      minify: true,
      outDir: 'dist/commonjs',
      target: ['node16'],
    }),
    buildTsupConfig({
      ...options,
      format: ['esm'],
      minify: true,
      outDir: 'dist/esm',
      target: ['es2020'],
    }),
  ];
});
