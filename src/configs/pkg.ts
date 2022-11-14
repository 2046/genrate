import { stringify } from '../utils'
import { PackageJSON } from 'types-pkg-json'
import { ProjectStruct, RequiredByKeys, TemplateConfigOptions } from '../../types'

export default function (name: string, templateConfig: TemplateConfigOptions, struct: ProjectStruct) {
  const config: RequiredByKeys<PackageJSON, 'scripts'> = {
    name,
    version: '1.0.0',
    description: '',
    scripts: {},
    dependencies: struct.dependencies,
    devDependencies: struct.devDependencies
  }

  if (templateConfig.bundler && templateConfig.bundler === 'rollup') {
    config.scripts.build = 'npx rollup -c ./rollup.config.js'
  }

  return {
    files: [['package.json', stringify(config)]]
  }
}
