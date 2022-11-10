import { stringify } from '../utils'
import { ProjectStruct } from '../../types'

export default function (struct: ProjectStruct) {
  return {
    files: [
      [
        'package.json',
        stringify({
          name: '',
          version: '1.0.0',
          description: '',
          scripts: {},
          dependencies: struct.dependencies,
          devDependencies: struct.devDependencies
        })
      ]
    ]
  }
}
