import { stringify } from '../utils'

export default function (type: 'node') {
  switch (type) {
    case 'node':
      return stringify({
        compilerOptions: {
          strict: true,
          outDir: 'dist',
          rootDir: 'src',
          target: 'ES2020',
          lib: ['ES2020'],
          module: 'CommonJS',
          skipLibCheck: true,
          removeComments: true,
          esModuleInterop: true,
          moduleResolution: 'node',
          resolveJsonModule: true,
          // declaration: true,
          // sourceMap: true,
          // declarationDir: 'types',
          forceConsistentCasingInFileNames: true
        },
        include: ['src/**/*.ts']
      })
    default:
      return ''
  }
}
