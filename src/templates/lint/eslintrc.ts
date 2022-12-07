import { stringify } from '../../utils'
import { JSONObject } from 'types-json'
import { TemplateConfigOptions } from '../../../types'

export default function (templateConfig: TemplateConfigOptions) {
  const config: JSONObject = {
    root: true,
    plugins: [],
    extends: ['eslint:recommended'],
    rules: {
      'no-case-declarations': 'off'
    },
    env: getEnv(templateConfig),
    ignorePatterns: getIgnorePatterns(templateConfig)
  }

  if (templateConfig.lint?.includes('stylelint')) {
    config.plugins = [...(<Array<string>>config.plugins), 'prettier']
    config.rules = Object.assign({}, config.rules, { 'prettier/prettier': 'error' })
    config.extends = [...(<Array<string>>config.extends), 'plugin:prettier/recommended']
  }

  if (templateConfig.ts) {
    config.parser = '@typescript-eslint/parser'
    config.parserOptions = { project: './tsconfig.json' }
    config.plugins = [...(<Array<string>>config.plugins), '@typescript-eslint']
    config.rules = Object.assign({}, config.rules, {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }]
    })
    config.extends = [
      ...(<Array<string>>config.extends),
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ]
  } else {
    config.parserOptions = { ecmaVersion: 'latest', sourceType: 'module' }
  }

  if (templateConfig.framework === 'vue') {
    config.extends = ['plugin:vue/vue3-essential', ...(<Array<string>>config.extends)]
  }

  return `module.exports = ${stringify(config)}`
}

function getEnv(templateConfig: TemplateConfigOptions) {
  const env: JSONObject = { node: true }
  const { framework = '', test, ts } = templateConfig

  if (framework) {
    env.node = true
    env.browser = true
  }

  if (['nest'].includes(framework)) {
    env.browser = false
  }

  if (test && !ts) {
    env.jest = true
  }

  return env
}

function getIgnorePatterns({ lib, test, e2e }: TemplateConfigOptions) {
  let ignorePatterns = ['/*.js', '**/dist/**']

  if (test) {
    ignorePatterns = [...ignorePatterns, '**/test/**']
  }

  if (lib) {
    ignorePatterns = [...ignorePatterns, '**/types/**']
  }

  if (test && e2e) {
    ignorePatterns = [...ignorePatterns, 'cypress.config.js', '**/cypress/**']
  }

  return ignorePatterns
}
