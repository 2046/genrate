import { ProjectStruct } from '../../types'
import { stringify } from '../utils'

export default function (recommendations: Array<string>): ProjectStruct {
  return {
    dirs: ['.vscode'],
    files: [['.vscode/extensions.json', stringify({ recommendations })]]
  }
}
