import tpl from '../../templates'
import { TemplateConfigOptions, ProjectStruct } from '../../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  const bundlerType = getBundlerType(templateConfig)

  if (bundlerType === 'rollup') {
    return getRollupBundleConfig(templateConfig.ts)
  } else if (bundlerType === 'babel') {
    return getBabelBundleConfig()
  } else if (bundlerType === 'gulp') {
    return getGulpBundleConfig(templateConfig.ts)
  } else if (bundlerType === 'vite') {
    return getViteBundleConfig(templateConfig.ts)
  }

  return {
    files: [],
    dependencies: {},
    devDependencies: {}
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

function getRollupBundleConfig(ts?: boolean) {
  return {
    files: [
      ['babel.config.json', tpl.bundler.babel],
      ['.browserslistrc', tpl.etc.browserslistrc],
      ['rollup.config.js', ts ? tpl.bundler.rollup.ts : tpl.bundler.rollup.js]
    ],
    dependencies: {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    },
    devDependencies: {
      rollup: '3.2.5',
      '@babel/core': '7.20.2',
      '@babel/preset-env': '7.20.2',
      '@rollup/plugin-json': '5.0.1',
      '@rollup/plugin-babel': '6.0.2',
      'rollup-plugin-delete': '2.0.0',
      '@rollup/plugin-commonjs': '23.0.2',
      '@rollup/plugin-node-resolve': '15.0.1',
      'rollup-plugin-node-externals': '5.0.2',
      '@babel/plugin-transform-runtime': '7.19.6',
      tslib: ts ? '2.4.1' : undefined,
      'rollup-plugin-typescript2': ts ? '0.34.1' : undefined
    }
  }
}

function getBabelBundleConfig() {
  return {
    files: [
      ['babel.config.json', tpl.bundler.babel],
      ['.browserslistrc', tpl.etc.browserslistrc]
    ],
    dependencies: {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    },
    devDependencies: {
      '@babel/cli': '7.19.3',
      '@babel/core': '7.20.2',
      '@babel/preset-env': '7.20.2',
      '@babel/plugin-transform-runtime': '7.19.6'
    }
  }
}

function getGulpBundleConfig(ts?: boolean) {
  return {
    files: [
      ['.env.production', tpl.etc.env],
      ['.env.development', tpl.etc.env],
      ['babel.config.json', tpl.bundler.babel],
      ['.browserslistrc', tpl.etc.browserslistrc],
      ['gulpfile.js', ts ? tpl.bundler.gulp.ts : tpl.bundler.gulp.js]
    ],
    dependencies: {
      '@babel/runtime': '7.20.1',
      '@babel/runtime-corejs3': '7.20.1'
    },
    devDependencies: {
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
      '@babel/cli': '7.19.3',
      '@babel/core': '7.20.2',
      'gulp-rev-all': '3.0.0',
      autoprefixer: '10.4.13',
      'gulp-postcss': '9.0.1',
      'browser-sync': '2.27.10',
      'gulp-clean-css': '4.3.0',
      '@babel/preset-env': '7.20.2',
      'gulp-rev-delete-original': '0.2.3',
      '@babel/plugin-transform-runtime': '7.19.6',
      'gulp-typescript': ts ? '6.0.0-alpha.1' : undefined
    }
  }
}

function getViteBundleConfig(ts?: boolean) {
  return {
    files: [
      ['.env.production', tpl.etc.env],
      ['.env.development', tpl.etc.env],
      [ts ? 'vite.config.ts' : 'vite.config.js', tpl.bundler.vite]
    ],
    dependencies: { vue: '3.2.45' },
    devDependencies: {
      vite: '3.2.5',
      '@vitejs/plugin-vue': '3.2.0',
      '@vitejs/plugin-vue-jsx': '2.1.1',
      'vue-tsc': ts ? '1.0.11' : undefined,
      '@types/node': ts ? '18.11.11' : undefined
    }
  }
}
