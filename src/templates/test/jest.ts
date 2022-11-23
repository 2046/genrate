import { stringify } from '../../utils'

export default function (ts?: boolean) {
  return stringify({
    collectCoverage: true,
    preset: ts ? 'ts-jest' : undefined,
    testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
  })
}
