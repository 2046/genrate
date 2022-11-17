import tpl from '../templates'
import { JSONObject } from 'types-json'
import { ProjectStruct, LINT_RULE, TemplateConfigOptions } from '../../types'

export default function (rule: LINT_RULE, templateConfig: TemplateConfigOptions): ProjectStruct {
  let files: Array<Array<string>> = []
  const devDependencies: JSONObject = { husky: '8.0.1', 'lint-staged': '13.0.3' }

  if (rule === 'stylelint') {
    devDependencies.prettier = '2.7.1'
    files = [
      ['.lintstagedrc', tpl.lint('lintstagedrc', { type: 'prettier', ts: templateConfig.ts })],
      ['.prettierrc', tpl.lint('prettierrc')]
    ]
  }

  return {
    files,
    dirs: ['.husky'],
    devDependencies
  }
}
