import tpl from '../templates'
import { stringify } from '../utils'
import { PackageJSON } from 'types-pkg-json'
import { ProjectStruct, RequiredByKeys, TemplateConfigOptions } from '../../types'

export default function (name: string, templateConfig: TemplateConfigOptions, struct: ProjectStruct) {
  const config: RequiredByKeys<PackageJSON, 'scripts'> = tpl.pkg(name, struct)

  if (templateConfig.lib) {
    config.scripts.build = 'npx rollup -c ./rollup.config.js'
  }

  if (templateConfig.lint) {
    config.scripts.prepare = 'husky install'
  }

  if (templateConfig.lint?.includes('commitlint')) {
    config.scripts.commit = 'npx git-cz'
  }

  if (templateConfig.test) {
    config.scripts.test = 'npx jest'
  }

  if (templateConfig.test && templateConfig.e2e) {
    config.scripts.e2e = 'npx cypress open'
  }

  return {
    files: [['package.json', stringify(config)]]
  }
}
