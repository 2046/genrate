import { stringify } from '../../utils'
import { JSONObject } from 'types-json'
import { TemplateConfigOptions } from '../../../types'

export default function (templateConfig: TemplateConfigOptions) {
  const { ts, framework, lint = [], fvs } = templateConfig
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

  if (lint.includes('stylelint')) {
    config.plugins = [...(<Array<string>>config.plugins), 'prettier']
    config.rules = Object.assign({}, config.rules, { 'prettier/prettier': 'error' })
    config.extends = [...(<Array<string>>config.extends), 'plugin:prettier/recommended']
  }

  if (ts) {
    if (framework === 'vue') {
      config.plugins = [...(<Array<string>>config.plugins), '@typescript-eslint']
      config.extends = [...(<Array<string>>config.extends), 'plugin:@typescript-eslint/eslint-recommended']
      config.parserOptions = {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        },
        parser: {
          js: 'espree',
          jsx: 'espree',
          ts: `require.resolve('@typescript-eslint/parser')`,
          tsx: `require.resolve('@typescript-eslint/parser')`
        }
      }
    } else {
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
    }
  } else {
    config.parserOptions = { ecmaVersion: 'latest', sourceType: 'module' }
  }

  if (framework === 'vue') {
    if (fvs === '3.x' || !fvs) {
      config.extends = ['plugin:vue/vue3-essential', ...(<Array<string>>config.extends)]
      config.overrides = [
        {
          files: ts ? ['*.ts', '*.tsx', '*.vue'] : ['*.vue'],
          rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ts ? 'warn' : undefined
          }
        }
      ]
    }

    if (fvs === '2.x') {
      config.extends = ['plugin:vue/essential', ...(<Array<string>>config.extends)]
      config.parserOptions = { parser: '@babel/eslint-parser' }
    }
  }

  return `module.exports = ${stringify(config)}`.replace(/('|")(?=require.*?\()|(?<=require.*?\(.+?\))("|')/g, '')
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
  let ignorePatterns = ['/*.js', '/*.json', '**/dist/**']

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
