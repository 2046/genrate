import tpl from '../../templates'
import { JSONObject } from 'types-json'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ ts, test }: TemplateConfigOptions): ProjectStruct {
  if (!test) {
    return { files: [] }
  }

  const devDependencies: JSONObject = {
    jest: '29.2.2'
  }

  if (ts) {
    devDependencies['ts-jest'] = '29.0.3'
    devDependencies['@types/jest'] = '29.2.1'
    devDependencies['@jest/globals'] = '29.2.2'
  }

  return {
    dirs: ['test'],
    devDependencies,
    files: [['jest.config.json', tpl.test.jest(ts)]]
  }
}
