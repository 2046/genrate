import { ProjectStruct } from '../../types'

export default function (name: string, struct: ProjectStruct) {
  return {
    name,
    version: '1.0.0',
    description: '',
    scripts: {},
    dependencies: struct.dependencies,
    devDependencies: struct.devDependencies
  }
}
