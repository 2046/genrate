import { stringify } from '../../utils'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ vscode }: TemplateConfigOptions): ProjectStruct {
  return vscode?.length
    ? {
        dirs: ['.vscode'],
        files: [['.vscode/extensions.json', stringify({ recommendations: vscode })]]
      }
    : { files: [] }
}
