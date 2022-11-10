import tpl from '../templates'
import { ProjectStruct } from '../../types'

export default function (type: 'node'): ProjectStruct {
  return {
    files: [['tsconfig.json', tpl.ts(type)]],
    devDependencies: {
      typescript: '4.8.4'
    }
  }
}
