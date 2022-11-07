export default function tsConfig() {
  return {
    files: [
      [
        'tsconfig.json',
        {
          extends: '@tsconfig/node14/tsconfig.json',
          compilerOptions: {
            rootDir: 'src',
            outDir: 'dist'
          },
          include: ['src/**/*.ts']
        }
      ],
      [
        'tsconfig.eslint.json',
        {
          extends: './tsconfig.json',
          compilerOptions: {
            types: ['jest']
          },
          include: ['src/**/*.ts', 'test/**/*.ts']
        }
      ]
    ],
    devDependencies: {
      typescript: '4.8.4'
    }
  }
}
