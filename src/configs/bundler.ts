import tpl from '../templates'
import { stringify } from '../utils'
import { TemplateConfigOptions, ProjectStruct } from '../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  const struct: ProjectStruct = {
    files: [],
    dependencies: {},
    devDependencies: {}
  }

  if (templateConfig.lib) {
    struct.dependencies = {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    }

    struct.devDependencies = {
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
      struct.devDependencies.tslib = '2.4.1'
      struct.devDependencies['rollup-plugin-typescript2'] = '0.34.1'
    }

    struct.files = [
      ['babel.config.json', stringify(tpl.babel())],
      ['rollup.config.js', templateConfig.ts ? tpl.rollup.tsTemplate : tpl.rollup.jsTemplate]
    ]
  }

  return struct
}
