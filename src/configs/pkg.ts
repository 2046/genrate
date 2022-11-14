import tpl from '../templates'
import { stringify } from '../utils'
import { PackageJSON } from 'types-pkg-json'
import { ProjectStruct, RequiredByKeys, TemplateConfigOptions } from '../../types'

export default function (name: string, templateConfig: TemplateConfigOptions, struct: ProjectStruct) {
  const config: RequiredByKeys<PackageJSON, 'scripts'> = tpl.pkg(name, struct)

  if (templateConfig.bundler && templateConfig.bundler === 'rollup') {
    config.scripts.build = 'npx rollup -c ./rollup.config.js'
  }

  return {
    files: [['package.json', stringify(config)]]
  }
}
