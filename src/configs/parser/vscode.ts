import { isEmpty } from 'lodash'
import { stringify } from '../../utils'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ vscode }: TemplateConfigOptions): ProjectStruct {
  if (isEmpty(vscode)) {
    return { files: [] }
  }

  return {
    dirs: ['.vscode'],
    files: [['.vscode/extensions.json', stringify({ recommendations: vscode })]]
  }
}
