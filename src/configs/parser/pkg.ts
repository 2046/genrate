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
                prepare: !isEmpty(lint) ? 'husky install' : undefined,
                commit: lint.includes('commitlint') ? 'npx git-cz' : undefined,
                ...getBuildCommands(bundlerType, ts, lib),
                ...getTestCommands(bundlerType, test, e2e)
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

  if (['rollup', 'vite'].includes(bundlerType)) {
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

  if (['vueCli'].includes(bundlerType)) {
    return {
      main: './dist/index.common.js'
    }
  }
}

function getBuildCommands(bundlerType: ReturnType<typeof getBundlerType>, ts?: boolean, lib?: boolean) {
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
    return lib
      ? {
          dev: 'vite --host',
          build: ts ? 'vite build && npm run build:types' : 'vite build',
          'build:types': ts ? 'vue-tsc --project tsconfig.types.json --declaration --emitDeclarationOnly --outDir types' : undefined
        }
      : {
          dev: 'vite --host',
          preview: 'vite preview --host',
          build: ts ? 'vue-tsc --noEmit && vite build' : 'vite build'
        }
  } else if (bundlerType === 'vueCli') {
    return lib
      ? {
          build: ts
            ? 'npx vue-cli-service build --target lib --name index src/index.ts'
            : 'npx vue-cli-service build --target lib --name index src/index.js'
        }
      : {
          serve: 'npx vue-cli-service serve --mode development',
          build: 'npx vue-cli-service build --mode production',
          inspect: 'npx vue-cli-service inspect --mode development'
        }
  } else {
    return {}
  }
}

function getTestCommands(bundlerType: ReturnType<typeof getBundlerType>, test?: boolean, e2e?: boolean) {
  if (bundlerType === 'vite') {
    return {
      test: test ? 'vitest' : undefined,
      e2e: test && e2e ? 'npx cypress open' : undefined,
      'test:coverage': test ? 'vitest run --coverage' : undefined
    }
  } else {
    return {
      test: test ? 'npx jest' : undefined,
      e2e: test && e2e ? 'npx cypress open' : undefined
    }
  }
}
