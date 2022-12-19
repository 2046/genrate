import { merge } from 'lodash'
import { stringify } from '../../utils'
import { TSConfigJSON } from 'types-tsconfig'
import { RequiredByKeys } from '../../../types'

const defaultOptions: RequiredByKeys<TSConfigJSON, 'compilerOptions' | 'include'> = {
  compilerOptions: {
    strict: true,
    lib: ['ESNext'],
    target: 'ESNext',
    module: 'ESNext',
    skipLibCheck: true,
    importHelpers: true,
    removeComments: true,
    esModuleInterop: true,
    moduleResolution: 'node',
    resolveJsonModule: true,
    useDefineForClassFields: true,
    forceConsistentCasingInFileNames: true
  },
  include: ['src/**/*.ts']
}

export default {
  node: stringify(defaultOptions),
  web: stringify(merge({}, defaultOptions, { compilerOptions: { lib: ['ESNext', 'DOM'] } })),
  vue: (fvs?: string) =>
    stringify(
      merge({}, defaultOptions, {
        include:
          fvs === '2.x'
            ? ['src/**/*', 'src/**/*.vue', 'test/**/*']
            : ['src/**/*', 'env.d.ts', 'src/**/*.vue', 'vite.config.ts', 'test/**/*'],
        compilerOptions: {
          jsx: 'preserve',
          isolatedModules: fvs === '2.x' ? undefined : true,
          experimentalDecorators: fvs === '2.x' ? true : undefined,
          preserveValueImports: true,
          importsNotUsedAsValues: 'error',
          lib: ['ESNext', 'DOM', 'DOM.Iterable'],
          baseUrl: '.',
          types: ['node'],
          paths: { '@/*': ['./src/*'] }
        }
      })
    ),
  lib: {
    node: stringify(merge({}, defaultOptions, { compilerOptions: { declaration: true, declarationDir: 'types' } })),
    web: stringify(merge({}, defaultOptions, { compilerOptions: { declaration: true, declarationDir: 'types', lib: ['ESNext', 'DOM'] } })),
    vue: (fvs?: string) =>
      stringify(
        merge({}, defaultOptions, {
          include:
            fvs === '2.x'
              ? ['src/**/*', 'src/**/*.vue', 'test/**/*']
              : ['src/**/*', 'env.d.ts', 'src/**/*.vue', 'vite.config.ts', 'test/**/*'],
          compilerOptions: {
            jsx: 'preserve',
            isolatedModules: fvs === '2.x' ? undefined : true,
            experimentalDecorators: fvs === '2.x' ? true : undefined,
            preserveValueImports: true,
            importsNotUsedAsValues: 'error',
            lib: ['ES2016', 'DOM', 'DOM.Iterable'],
            baseUrl: '.',
            types: ['node'],
            paths: { '@/*': ['./src/*'] }
          }
        })
      )
  }
}
