import tpl from '../../templates'
import { stringify } from '../../utils'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ ts, lib, framework }: TemplateConfigOptions): ProjectStruct {
  const devDependencies = { typescript: '4.8.4' }

  if (!ts) {
    return { files: [] }
  }

  if (lib && framework) {
    switch (framework) {
      case 'web':
        return { devDependencies, files: [['tsconfig.json', stringify(tpl.ts('webpack'))]] }
    }
  }

  if (framework) {
    switch (framework) {
      case 'web':
        return { devDependencies, files: [['tsconfig.json', stringify(tpl.ts('web'))]] }
    }
  }

  if (lib) {
    return { devDependencies, files: [['tsconfig.json', stringify(tpl.ts('nodepack'))]] }
  }

  return { devDependencies, files: [['tsconfig.json', stringify(tpl.ts())]] }
}
