import { RequiredByKeys, TS_TEMPLATE_TYPE } from '../../types'
import { TSConfigJSON } from 'types-tsconfig'

export default function (type?: TS_TEMPLATE_TYPE) {
  const config: RequiredByKeys<TSConfigJSON, 'compilerOptions' | 'include'> = {
    compilerOptions: {
      strict: true,
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

  if (type === 'webpack') {
    config.compilerOptions.declaration = true
    config.compilerOptions.lib = ['ESNext', 'DOM']
  }

  if (type === 'nodepack') {
    config.compilerOptions.declaration = true
  }

  if (type === 'web') {
    config.compilerOptions.lib = ['ESNext', 'DOM']
  }

  return config
}
