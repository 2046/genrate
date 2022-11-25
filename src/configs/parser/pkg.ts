import { isEmpty } from 'lodash'
import { stringify } from '../../utils'
import { getBundlerType } from './bundler'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function (name: string, templateConfig: TemplateConfigOptions, { dependencies, devDependencies }: ProjectStruct) {
  const bundlerType = getBundlerType(templateConfig)
  const { lint = [], test, e2e, lib } = templateConfig
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
                ...getBuildCommands(bundlerType)
              }
            },
            getExports(bundlerType, lib)
          )
        )
      ]
    ]
  }
}

function getExports(bundlerType: string, lib?: boolean) {
  if (!lib) {
    return {}
  }

  if (bundlerType === 'rollup') {
    return {
      main: './dist/index.cjs.js',
      types: './types/index.d.ts',
      exports: {
        '.': {
          import: './dist/index.esm.mjs',
          require: './dist/index.cjs.js'
        }
      }
    }
  }
}

function getBuildCommands(bundlerType: string) {
  if (bundlerType === 'rollup') {
    return {
      build: 'npx rollup -c ./rollup.config.js'
    }
  } else {
    return {}
  }
}
