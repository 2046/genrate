import tpl from '../../templates'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ ts, lib, framework }: TemplateConfigOptions): ProjectStruct {
  let files = [['tsconfig.json', tpl.ts.node]]

  if (!ts) {
    return { files: [] }
  }

  if (lib) {
    files = [['tsconfig.json', tpl.ts.lib.node]]
  }

  if (framework) {
    files = [['tsconfig.json', ['nest'].includes(framework) ? tpl.ts.node : tpl.ts.web]]
  }

  if (lib && framework) {
    files = [['tsconfig.json', ['nest'].includes(framework) ? tpl.ts.lib.node : tpl.ts.lib.web]]
  }

  return {
    files,
    devDependencies: { typescript: '4.8.4' }
  }
}
