import { isEmpty } from 'lodash'
import tpl from '../../templates'
import { stringify } from '../../utils'
import { JSONObject } from 'types-json'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function (rule: string, templateConfig: TemplateConfigOptions): ProjectStruct {
  if (rule === 'husky') {
    let files: Array<Array<string>> = []
    const { lint = [] } = templateConfig

    if (lint.includes('stylelint') || lint.includes('eslint')) {
      files = [...files, ['.husky/pre-commit', tpl.lint.husky('npx --no-install lint-staged')]]
    }

    if (lint.includes('commitlint')) {
      files = [...files, ['.husky/commit-msg', tpl.lint.husky('npx --no-install commitlint --edit "$1"')]]
    }

    if (lint.includes('stylelint')) {
      files = [...files, ['.lintstagedrc', tpl.lint.lintstaged('prettier', templateConfig)]]
    }

    if (lint.includes('eslint')) {
      files = [...files, ['.lintstagedrc', tpl.lint.lintstaged('eslint', templateConfig)]]
    }

    files = mergeLintstagedRc(files)

    return {
      files,
      dirs: ['.husky'],
      devDependencies: { husky: '8.0.1', 'lint-staged': '13.0.3' }
    }
  }

  if (rule === 'stylelint') {
    return {
      devDependencies: { prettier: '2.7.1' },
      files: [['.prettierrc', tpl.lint.prettier]]
    }
  }

  if (rule === 'commitlint') {
    return {
      devDependencies: {
        commitizen: '4.2.5',
        'cz-customizable': '7.0.0',
        '@commitlint/cli': '17.2.0',
        '@commitlint/config-conventional': '17.2.0'
      },
      files: [
        ['.czrc', tpl.lint.cz],
        ['.cz-config.js', tpl.lint.czconf],
        ['.commitlintrc', tpl.lint.commitlint]
      ]
    }
  }

  if (rule === 'eslint') {
    let devDependencies: JSONObject = {
      eslint: '8.26.0'
    }

    if (templateConfig.ts) {
      devDependencies = Object.assign({}, devDependencies, {
        '@typescript-eslint/parser': '5.42.0',
        '@typescript-eslint/eslint-plugin': '5.42.0'
      })
    }

    if (templateConfig.lint?.includes('stylelint')) {
      devDependencies = Object.assign({}, devDependencies, {
        'eslint-plugin-prettier': '4.2.1',
        'eslint-config-prettier': '8.5.0'
      })
    }

    if (templateConfig.framework === 'vue') {
      if (templateConfig.fvs === '3.x' || !templateConfig.fvs) {
        devDependencies = Object.assign({}, devDependencies, {
          'eslint-plugin-vue': '9.8.0'
        })
      }

      if (templateConfig.fvs === '2.x') {
        devDependencies = Object.assign({}, devDependencies, {
          '@babel/eslint-parser': '7.19.1',
          '@vue/cli-plugin-eslint': '5.0.8',
          'eslint-plugin-vue': '8.7.1'
        })
      }
    }

    return {
      devDependencies,
      files: [['.eslintrc.js', tpl.lint.eslint(templateConfig)]]
    }
  }

  return { files: [] }
}

function mergeLintstagedRc(files: Array<Array<string>>) {
  const lintstagedrc = files
    .filter(([fileName]) => fileName === '.lintstagedrc')
    .reduce((result: JSONObject, file: Array<string>) => {
      const json = <JSONObject>JSON.parse(file[1])

      for (const key in json) {
        if (result[key] && Array.isArray(result[key])) {
          result[key] = [...(<Array<string>>result[key]), <string>json[key]]
        } else if (result[key]) {
          result[key] = [<string>result[key], <string>json[key]]
        } else {
          result[key] = json[key]
        }
      }

      return result
    }, {})

  if (isEmpty(lintstagedrc)) {
    return files
  } else {
    files = files.filter(([fileName]) => fileName !== '.lintstagedrc')

    return [...files, ['.lintstagedrc', stringify(lintstagedrc)]]
  }
}
