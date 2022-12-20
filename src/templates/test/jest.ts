import { stringify } from '../../utils'
import { TemplateConfigOptions } from '../../../types'

export default function ({ ts, framework, fvs }: TemplateConfigOptions) {
  if (framework === 'vue' && fvs === '2.x') {
    return stringify({
      collectCoverage: true,
      preset: ts ? '@vue/cli-plugin-unit-jest/presets/typescript-and-babel' : '@vue/cli-plugin-unit-jest',
      testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
    })
  } else {
    return stringify({
      collectCoverage: true,
      preset: ts ? 'ts-jest' : undefined,
      testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
    })
  }
}
