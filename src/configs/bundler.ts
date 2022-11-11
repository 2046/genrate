import tpl from '../templates'
import { TemplateConfigOptions, ProjectStruct } from '../../types'

export default function (type: TemplateConfigOptions['bundler']): ProjectStruct {
  return {
    files: [['rollup.config.js', tpl.bundler(type)]],
    devDependencies: {
      tslib: '2.4.1',
      rollup: '3.2.5',
      'rollup-plugin-delete': '2.0.0',
      '@rollup/plugin-commonjs': '23.0.2',
      'rollup-plugin-typescript2': '0.34.1',
      '@rollup/plugin-node-resolve': '15.0.1'
    }
  }
}
