import czrc from './czrc'
import eslintrc from './eslintrc'
import czconfig from './czconfig'
import prettierrc from './prettierrc'
import { stringify } from '../../utils'
import lintstagedrc from './lintstagedrc'
import commitlintrc from './commitlintrc'
import { LINT_STAGE_TYPE, TemplateConfigOptions } from '../../../types'

function rc(lintrc: 'czrc'): string
function rc(lintrc: 'czconfig'): string
function rc(lintrc: 'prettierrc'): string
function rc(lintrc: 'commitlintrc'): string
function rc(lintrc: 'eslintrc', options: { templateConfig: TemplateConfigOptions }): string
function rc(lintrc: 'lintstagedrc', options: { type: LINT_STAGE_TYPE; templateConfig?: TemplateConfigOptions }): string
function rc(lintrc: string, options?: { type?: LINT_STAGE_TYPE; templateConfig?: TemplateConfigOptions }): string {
  switch (lintrc) {
    case 'lintstagedrc':
      const [key, value] = lintstagedrc(options?.type, options?.templateConfig?.ts)

      return stringify({ [key]: value })
    case 'prettierrc':
      return stringify(prettierrc)
    case 'commitlintrc':
      return stringify(commitlintrc)
    case 'czrc':
      return stringify(czrc)
    case 'czconfig':
      return `module.exports = ${stringify(czconfig)}`
    case 'eslintrc':
      return stringify(eslintrc(<TemplateConfigOptions>options?.templateConfig))
    default:
      return ''
  }
}

export default rc
