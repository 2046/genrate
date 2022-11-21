export default function (type: 'jest', ts?: boolean) {
  switch (type) {
    case 'jest':
      return {
        collectCoverage: true,
        preset: ts ? 'ts-jest' : undefined,
        testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
      }
    default:
      return {}
  }
}
