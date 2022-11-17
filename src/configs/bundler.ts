import tpl from '../templates'
import { stringify } from '../utils'
import { JSONObject } from 'types-json'
import { TemplateConfigOptions, ProjectStruct } from '../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  const devDependencies: JSONObject = {
    rollup: '3.2.5',
    '@babel/core': '7.20.2',
    '@babel/preset-env': '7.20.2',
    '@rollup/plugin-json': '5.0.1',
    '@rollup/plugin-babel': '6.0.2',
    'rollup-plugin-delete': '2.0.0',
    '@rollup/plugin-commonjs': '23.0.2',
    '@rollup/plugin-node-resolve': '15.0.1',
    'rollup-plugin-node-externals': '5.0.2',
    '@babel/plugin-transform-runtime': '7.19.6'
  }

  if (templateConfig.ts) {
    devDependencies.tslib = '2.4.1'
    devDependencies['rollup-plugin-typescript2'] = '0.34.1'
  }

  return {
    devDependencies,
    dependencies: {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    },
    files: [
      ['babel.config.json', stringify(tpl.babel())],
      ['rollup.config.js', tpl.bundler(templateConfig)]
    ]
  }
}
