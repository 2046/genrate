import { TemplateConfigOptions } from '../../types'

export default function (type: TemplateConfigOptions['bundler']) {
  switch (type) {
    case 'rollup':
      return `const { defineConfig } = require('rollup')
const clean = require('rollup-plugin-delete')
const commonjs = require('@rollup/plugin-commonjs')
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
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
})`
    default:
      return ''
  }
}
