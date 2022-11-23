import tpl from '../../templates'
import { TemplateConfigOptions, ProjectStruct } from '../../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  let dependencies = {}
  let devDependencies = {}
  let files: Array<Array<string>> = []
  const { lib, ts, framework } = templateConfig

  if (lib && (framework === 'web' || !framework)) {
    files = [
      ['babel.config.json', tpl.bundler.babel],
      ['rollup.config.js', ts ? tpl.bundler.rollup.ts : tpl.bundler.rollup.js]
    ]

    dependencies = Object.assign({}, dependencies, {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    })

    devDependencies = Object.assign({}, devDependencies, {
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
    })

    if (ts) {
      devDependencies = Object.assign({}, devDependencies, {
        tslib: '2.4.1',
        'rollup-plugin-typescript2': '0.34.1'
      })
    }
  }

  return {
    files,
    dependencies,
    devDependencies
  }
}
