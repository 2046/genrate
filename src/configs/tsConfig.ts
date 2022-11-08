import { stringify } from '../utils'

export default function tsConfig(): {
  files: Array<Array<string>>
  devDependencies: Record<string, string>
} {
  return {
    files: [
      [
        'tsconfig.json',
        stringify({
          extends: '@tsconfig/node14/tsconfig.json',
          compilerOptions: {
            rootDir: 'src',
            outDir: 'dist'
          },
          include: ['src/**/*.ts']
        })
      ],
      [
        'tsconfig.eslint.json',
        stringify({
          extends: './tsconfig.json',
          compilerOptions: {
            types: ['jest']
          },
          include: ['src/**/*.ts', 'test/**/*.ts']
        })
      ]
    ],
    devDependencies: {
      typescript: '4.8.4'
    }
  }
}
