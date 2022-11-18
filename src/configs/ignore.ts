import tpl from '../templates'
import { ProjectStruct } from '../../types'

export default function (type: 'git'): ProjectStruct {
  let files: Array<Array<string>> = []

  if (type === 'git') {
    files = [...files, ['.gitignore', tpl.gitignore]]
  }

  return {
    files
  }
}
