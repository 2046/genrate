import tpl from '../../templates'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ test, e2e }: TemplateConfigOptions): ProjectStruct {
  return test && e2e
    ? {
        dirs: ['cypress/support'],
        files: [
          ['cypress.config.js', tpl.e2e],
          ['cypress/support/e2e.js', '']
        ],
        devDependencies: { cypress: '11.1.0' }
      }
    : {
        files: []
      }
}
