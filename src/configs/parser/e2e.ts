import tpl from '../../templates'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ test, e2e }: TemplateConfigOptions): ProjectStruct {
  if (!test && !e2e) {
    return { files: [] }
  }

  return {
    dirs: ['cypress/support'],
    devDependencies: { cypress: '11.1.0' },
    files: [
      ['cypress/support/e2e.js', ''],
      ['cypress.config.js', tpl.test.cypress]
    ]
  }
}
