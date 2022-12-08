import { isEmpty } from 'lodash'
import { stringify } from '../../utils'
import { getBundlerType } from './bundler'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function (name: string, templateConfig: TemplateConfigOptions, { dependencies, devDependencies }: ProjectStruct) {
  const bundlerType = getBundlerType(templateConfig)
  const { lint = [], test, e2e, lib, ts } = templateConfig
  const defaultOptions = { name, version: '1.0.0', description: '', dependencies, devDependencies }

  return {
    files: [
      [
        'package.json',
        stringify(
          Object.assign(
            {},
            defaultOptions,
            {
              scripts: {
                test: test ? 'npx jest' : undefined,
                e2e: test && e2e ? 'npx cypress open' : undefined,
                prepare: !isEmpty(lint) ? 'husky install' : undefined,
                commit: lint.includes('commitlint') ? 'npx git-cz' : undefined,
                ...getBuildCommands(bundlerType, ts)
              }
            },
            getExports(bundlerType, lib, ts)
          )
        )
      ]
    ]
  }
}

function getExports(bundlerType: string, lib?: boolean, ts?: boolean) {
  if (!lib) {
    return {}
  }

  if (bundlerType === 'rollup') {
    return {
      main: './dist/index.cjs.js',
      types: ts ? './types/index.d.ts' : undefined,
      exports: {
        '.': {
          import: './dist/index.esm.mjs',
          require: './dist/index.cjs.js'
        }
      }
    }
  }
}

function getBuildCommands(bundlerType: ReturnType<typeof getBundlerType>, ts?: boolean) {
  if (bundlerType === 'rollup') {
    return {
      build: 'npx rollup -c ./rollup.config.js'
    }
  } else if (bundlerType === 'tsc') {
    return {
      build: 'npx tsc --outDir ./dist'
    }
  } else if (bundlerType === 'babel') {
    return {
      build: 'npx babel src -d dist'
    }
  } else if (bundlerType === 'gulp') {
    return {
      dev: 'cross-env NODE_ENV=development npx gulp dev',
      build: 'cross-env NODE_ENV=production npx gulp build'
    }
  } else if (bundlerType === 'vite') {
    return {
      dev: 'vite --host',
      preview: 'vite preview',
      build: ts ? 'vue-tsc --noEmit && vite build' : 'vite build'
    }
  } else {
    return {}
  }
}
