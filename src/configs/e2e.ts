import tpl from '../templates'
import { ProjectStruct } from '../../types'

export default function (): ProjectStruct {
  return {
    dirs: ['cypress/support'],
    files: [
      ['cypress.config.js', tpl.e2e],
      ['cypress/support/e2e.js', '']
    ],
    devDependencies: { cypress: '11.1.0' }
  }
}
