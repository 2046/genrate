import tpl from '../templates'
import { JSONObject } from 'types-json'
import { ProjectStruct, LINT_RULE, TemplateConfigOptions } from '../../types'

export default function (rule: LINT_RULE, templateConfig: TemplateConfigOptions): ProjectStruct {
  let files: Array<Array<string>> = []
  const devDependencies: JSONObject = { husky: '8.0.1', 'lint-staged': '13.0.3' }

  if (rule === 'stylelint') {
    devDependencies.prettier = '2.7.1'

    files = [
      ...files,
      ['.lintstagedrc', tpl.lint('lintstagedrc', { type: 'prettier', ts: templateConfig.ts })],
      ['.prettierrc', tpl.lint('prettierrc')]
    ]
  }

  if (rule === 'commitlint') {
    devDependencies.commitizen = '4.2.5'
    devDependencies['cz-customizable'] = '7.0.0'
    devDependencies['@commitlint/cli'] = '17.2.0'
    devDependencies['@commitlint/config-conventional'] = '17.2.0'

    files = [...files, ['.czrc', tpl.lint('czrc')], ['.commitlintrc', tpl.lint('commitlintrc')], ['.cz-config.js', tpl.lint('czconfig')]]
  }

  return {
    files,
    dirs: ['.husky'],
    devDependencies
  }
}
