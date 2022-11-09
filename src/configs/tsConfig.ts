import tpl from '../templates'

export default function tsConfig(): {
  files: Array<Array<string>>
  devDependencies: Record<string, string>
} {
  return {
    files: [['tsconfig.json', tpl.ts('node')]],
    devDependencies: {
      typescript: '4.8.4'
    }
  }
}
