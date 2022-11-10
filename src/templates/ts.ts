import { stringify } from '../utils'

export default function (type: 'node') {
  switch (type) {
    case 'node':
      return stringify({
        compilerOptions: {
          strict: true,
          sourceMap: true,
          outDir: './dist',
          target: 'es2020',
          module: 'commonjs',
          declaration: true,
          skipLibCheck: true,
          declarationDir: '.',
          esModuleInterop: true,
          forceConsistentCasingInFileNames: true
        },
        include: ['./src/**/*.ts']
      })
    default:
      return ''
  }
}
