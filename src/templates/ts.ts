import { stringify } from '../utils'

export default function (type: 'node') {
  switch (type) {
    case 'node':
      return stringify({
        extends: '@tsconfig/node14/tsconfig.json',
        compilerOptions: {
          rootDir: 'src',
          outDir: 'dist'
        },
        include: ['src/**/*.ts']
      })
    default:
      return ''
  }
}
