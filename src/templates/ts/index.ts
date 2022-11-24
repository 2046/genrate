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
    forceConsistentCasingInFileNames: true
  },
  include: ['src/**/*.ts']
}

export default {
  node: stringify(defaultOptions),
  vanilla: stringify(merge({}, defaultOptions, { compilerOptions: { lib: ['ESNext', 'DOM'] } })),
  lib: {
    node: stringify(merge({}, defaultOptions, { compilerOptions: { declaration: true, declarationDir: 'types' } })),
    vanilla: stringify(
      merge({}, defaultOptions, { compilerOptions: { declaration: true, declarationDir: 'types', lib: ['ESNext', 'DOM'] } })
    )
  }
}
