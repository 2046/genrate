import tpl from '../templates'
import { ProjectStruct, TemplateConfigOptions } from '../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  const { ts = false, lib = false, framework = '' } = templateConfig

  if (!ts) {
    return { files: [] }
  }

  if (lib && framework) {
    switch (framework) {
      case 'web':
        return {
          files: [['tsconfig.json', tpl.ts('webpack')]],
          devDependencies: {
            typescript: '4.8.4'
          }
        }
    }
  }

  if (framework) {
    switch (framework) {
      case 'web':
        return {
          files: [['tsconfig.json', tpl.ts('web')]],
          devDependencies: {
            typescript: '4.8.4'
          }
        }
    }
  }

  if (lib) {
    return {
      files: [['tsconfig.json', tpl.ts('nodepack')]],
      devDependencies: {
        typescript: '4.8.4'
      }
    }
  }

  return {
    files: [['tsconfig.json', tpl.ts()]],
    devDependencies: {
      typescript: '4.8.4'
    }
  }
}
