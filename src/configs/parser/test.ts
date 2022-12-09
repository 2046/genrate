import tpl from '../../templates'
import { JSONObject } from 'types-json'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ ts, test, framework }: TemplateConfigOptions): ProjectStruct {
  if (!test) {
    return { files: [] }
  }

  let files: Array<Array<string>> = []
  let devDependencies: JSONObject = {}

  if (framework === 'vue') {
    files = [[`vitest.config.${ts ? 'ts' : 'js'}`, tpl.test.vitest(ts)]]

    devDependencies = {
      jsdom: '20.0.3',
      vitest: '0.25.6',
      '@vue/test-utils': '2.2.6',
      '@vitest/coverage-c8': '0.25.6'
    }
  } else {
    files = [['jest.config.json', tpl.test.jest(ts)]]

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
