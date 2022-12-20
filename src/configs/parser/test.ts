import tpl from '../../templates'
import { JSONObject } from 'types-json'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function (templateConfig: TemplateConfigOptions): ProjectStruct {
  const { framework, fvs, ts, test } = templateConfig

  if (!test) {
    return { files: [] }
  }

  let files: Array<Array<string>> = []
  let devDependencies: JSONObject = {}

  if (framework === 'vue') {
    if (fvs === '2.x') {
      files = [['jest.config.json', tpl.test.jest(templateConfig)]]

      devDependencies = {
        jest: '27.5.1',
        'babel-jest': '27.5.1',
        '@vue/test-utils': '1.3.3',
        '@vue/vue2-jest': '27.0.0',
        '@vue/cli-plugin-unit-jest': '5.0.8',
        'ts-jest': ts ? '27.1.5' : undefined,
        '@types/jest': ts ? '27.5.2' : undefined,
        '@jest/globals': ts ? '27.5.1' : undefined
      }
    } else {
      files = [[`vitest.config.${ts ? 'ts' : 'js'}`, tpl.test.vitest(ts)]]

      devDependencies = {
        jsdom: '20.0.3',
        vitest: '0.25.6',
        '@vue/test-utils': '2.2.6',
        '@vitest/coverage-c8': '0.25.6'
      }
    }
  } else {
    files = [['jest.config.json', tpl.test.jest(templateConfig)]]

    devDependencies = {
      jest: '29.2.2',
      'ts-jest': ts ? '29.0.3' : undefined,
      '@types/jest': ts ? '29.2.1' : undefined,
      '@jest/globals': ts ? '29.2.2' : undefined
    }
  }

  return {
    files,
    dirs: ['test'],
    devDependencies
  }
}
