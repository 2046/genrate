import { stringify } from '../utils'

export default function pkgConfig(config: { devDependencies: Record<string, string> }) {
  return {
    files: [
      [
        'package.json',
        stringify({
          devDependencies: config.devDependencies
        })
      ]
    ]
  }
}
