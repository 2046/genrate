import tpl from '../../templates'
import { stringify } from '../../utils'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ ts, lib, framework, fvs }: TemplateConfigOptions): ProjectStruct {
  let files = [['tsconfig.json', tpl.ts.node]]

  if (!ts) {
    return { files: [] }
  }

  if (lib) {
    files = [['tsconfig.json', tpl.ts.lib.node]]
  }

  if (framework) {
    files = [['tsconfig.json', tpl.ts.web]]

    if (['vue'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.vue(fvs)]]
    }

    if (['react'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.react]]
    }

    if (['nest'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.node]]
    }
  }

  if (lib && framework) {
    files = [['tsconfig.json', tpl.ts.lib.web]]

    if (['vue'].includes(framework)) {
      files =
        fvs === '2.x'
          ? [['tsconfig.json', tpl.ts.lib.vue(fvs)]]
          : [
              ['tsconfig.json', tpl.ts.lib.vue(fvs)],
              ['tsconfig.types.json', stringify({ include: ['src/**/*'] })]
            ]
    }

    if (['react'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.lib.react]]
    }

    if (['nest'].includes(framework)) {
      files = [['tsconfig.json', tpl.ts.lib.node]]
    }
  }

  return {
    files,
    devDependencies: { typescript: '4.8.4' }
  }
}
