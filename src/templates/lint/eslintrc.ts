import { JSONObject } from 'types-json'

export default function (prettier?: boolean, ts?: boolean) {
  const config: JSONObject = {
    root: true,
    extends: ['eslint:recommended'],
    rules: {
      'no-case-declarations': 'off'
    }
  }

  if (prettier) {
    config.rules = Object.assign({}, config.rules, { 'prettier/prettier': 'error' })
    config.extends = [...(<Array<string>>config.extends), 'plugin:prettier/recommended']
  }

  if (ts) {
    config.parser = '@typescript-eslint/parser'
    config.parserOptions = { project: './tsconfig.json' }
    config.plugins = ['@typescript-eslint', 'prettier']
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

  return config
}
