import { stringify } from '../../utils'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'
import { isEmpty } from 'lodash'

export default function (name: string, templateConfig: TemplateConfigOptions, { dependencies, devDependencies }: ProjectStruct) {
  const { lint = [], lib, test, e2e } = templateConfig
  const defaultOptions = { name, version: '1.0.0', description: '', dependencies, devDependencies }

  return {
    files: [
      [
        'package.json',
        stringify(
          Object.assign({}, defaultOptions, {
            scripts: {
              test: test ? 'npx jest' : undefined,
              e2e: test && e2e ? 'npx cypress open' : undefined,
              prepare: !isEmpty(lint) ? 'husky install' : undefined,
              build: lib ? 'npx rollup -c ./rollup.config.js' : undefined,
              commit: lint.includes('commitlint') ? 'npx git-cz' : undefined
            }
          })
        )
      ]
    ]
  }
}
