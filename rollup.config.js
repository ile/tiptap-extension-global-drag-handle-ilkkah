import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'node:fs';
import autoExternal from 'rollup-plugin-auto-external';
import esbuild from 'rollup-plugin-esbuild';
import sourcemaps from 'rollup-plugin-sourcemaps';

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default {
  external: [/@tiptap\/pm\/.*/, '@tiptap/core'],
  input: 'src/index.ts',
  output: [
    {
      name: pkg.name,
      file: pkg.umd,
      format: 'umd',
      sourcemap: true,
    },
    {
      name: pkg.name,
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    autoExternal({
      packagePath: './package.json',
    }),
    sourcemaps(),
    resolve(),
    commonjs(),
    esbuild({
      include: /\.[jt]s$/,
      target: 'es2022',
    }),
  ],
};
