const tsTemplate = `const { defineConfig } = require('rollup')
const json = require('@rollup/plugin-json')
const clean = require('rollup-plugin-delete')
const babel = require('@rollup/plugin-babel')
const externals = require('rollup-plugin-node-externals')
const commonjs = require('@rollup/plugin-commonjs')
const { DEFAULT_EXTENSIONS } = require('@babel/core')
const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('rollup-plugin-typescript2')

module.exports = defineConfig({
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    sourcemap: true,
    file: './dist/index.js'
  },
  plugins: [
    clean({ targets: ['dist/*', 'types/*'] }),
    externals({ deps: true }),
    resolve({
      extensions: [...resolve.DEFAULTS.extensions, '.ts', '.tsx']
    }),
    commonjs(),
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
    })
  ]
})`

const jsTemplate = `const { defineConfig } = require('rollup')
const json = require('@rollup/plugin-json')
const clean = require('rollup-plugin-delete')
const babel = require('@rollup/plugin-babel')
const externals = require('rollup-plugin-node-externals')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')

module.exports = defineConfig({
  input: 'src/index.js',
  output: {
    format: 'cjs',
    sourcemap: true,
    file: './dist/index.js'
  },
  plugins: [
    clean({ targets: ['dist/*'] }),
    externals({ deps: true }),
    resolve(),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**'
    })
  ]
})`

export default { jsTemplate, tsTemplate }
