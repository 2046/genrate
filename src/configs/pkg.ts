import { stringify } from '../utils'
import { ProjectStruct, TemplateConfigOptions } from '../../types'

export default function (config: TemplateConfigOptions, struct: ProjectStruct) {
  const scripts: Record<string, string> = {}

  if (config.bundler && config.bundler === 'rollup') {
    scripts.build = 'npx rollup -c ./rollup.config.js'
  }

  return {
    files: [
      [
        'package.json',
        stringify({
          name: '',
          version: '1.0.0',
          description: '',
          scripts,
          dependencies: struct.dependencies,
          devDependencies: struct.devDependencies
        })
      ]
    ]
  }
}
