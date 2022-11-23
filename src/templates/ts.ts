import { stringify } from '../utils'
import { RequiredByKeys } from '../../types'
import { TSConfigJSON } from 'types-tsconfig'

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
    forceConsistentCasingInFileNames: true
  },
  include: ['src/**/*.ts']
}

export default {
  node: stringify(defaultOptions),
  web: stringify(Object.assign({}, defaultOptions, { compilerOptions: { lib: ['ESNext', 'DOM'] } })),
  lib: {
    node: stringify(Object.assign({}, defaultOptions, { compilerOptions: { declaration: true, declarationDir: 'types' } })),
    web: stringify(
      Object.assign({}, defaultOptions, { compilerOptions: { declaration: true, declarationDir: 'types', lib: ['ESNext', 'DOM'] } })
    )
  }
}
