import tpl from '../../templates'
import { TemplateConfigOptions, ProjectStruct } from '../../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  let dependencies = {}
  let devDependencies = {}
  const { ts } = templateConfig
  let files: Array<Array<string>> = []
  const bundlerType = getBundlerType(templateConfig)

  if (bundlerType === 'rollup') {
    files = [
      ['babel.config.json', tpl.bundler.babel],
      ['.browserslistrc', tpl.etc.browserslistrc],
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
  } else if (bundlerType === 'babel') {
    files = [
      ['babel.config.json', tpl.bundler.babel],
      ['.browserslistrc', tpl.etc.browserslistrc]
    ]

    dependencies = Object.assign({}, dependencies, {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    })

    devDependencies = Object.assign({}, devDependencies, {
      '@babel/cli': '7.19.3',
      '@babel/core': '7.20.2',
      '@babel/preset-env': '7.20.2',
      '@babel/plugin-transform-runtime': '7.19.6'
    })
  } else if (bundlerType === 'gulp') {
    files = [
      ['.env.production', tpl.etc.env],
      ['.env.development', tpl.etc.env],
      ['gulpfile.js', tpl.bundler.gulp],
      ['.browserslistrc', tpl.etc.browserslistrc]
    ]

    dependencies = Object.assign({}, dependencies, {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    })

    devDependencies = Object.assign({}, devDependencies, {
      gulp: '4.0.2',
      sass: '1.56.1',
      dotenv: '16.0.3',
      postcss: '8.4.19',
      'gulp-ejs': '5.1.0',
      'gulp-sass': '5.1.0',
      'cross-env': '7.0.3',
      'gulp-clean': '0.4.0',
      'gulp-babel': '8.0.0',
      'gulp-rename': '2.0.0',
      'gulp-uglify': '3.0.2',
      'gulp-rev-all': '3.0.0',
      autoprefixer: '10.4.13',
      'gulp-postcss': '9.0.1',
      'browser-sync': '2.27.10',
      'gulp-clean-css': '4.3.0',
      'gulp-typescript': '6.0.0-alpha.1',
      'gulp-rev-delete-original': '0.2.3'
    })
  }

  return {
    files,
    dependencies,
    devDependencies
  }
}

export function getBundlerType({ framework, lib, ts }: TemplateConfigOptions) {
  if (framework) {
    switch (framework) {
      case 'vanilla':
        return lib ? 'rollup' : 'gulp'
      case 'vue':
        return 'vite'
      case 'react':
        return lib ? 'rollup' : 'webpack'
      case 'electron':
        return lib ? 'rollup' : 'electron-builder'
      case 'nest':
        return lib ? 'rollup' : 'nest'
    }
  } else {
    return lib ? 'rollup' : ts ? 'tsc' : 'babel'
  }
}
