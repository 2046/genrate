import tpl from '../../templates'
import { ProjectStruct, TemplateConfigOptions } from '../../../types'

export default function ({ lib }: TemplateConfigOptions): ProjectStruct {
  let files = [['.gitignore', tpl.ignore.git]]

  if (lib) {
    files = [...files, ['.npmignore', tpl.ignore.npm]]
  }

  return {
    files
  }
}
