import ts from './ts'
import pkg from './pkg'
import { ProjectStruct, TemplateConfig } from '../../types'

export function parse(templateConfig: TemplateConfig, dest: string) {
  let struct: Required<ProjectStruct> = defaultStruct()
  const { config, preprepare, postprepare } = templateConfig

  if (preprepare) {
    preprepare(struct, config, dest)
  }

  if (config.ts) {
    struct = merge(struct, ts('node'))
  }

  struct = merge(struct, pkg(struct))

  if (postprepare) {
    postprepare(struct, config, dest)
  }

  return struct
}

function merge(object: ProjectStruct, source: ProjectStruct): Required<ProjectStruct> {
  const objectClone = Object.assign({}, defaultStruct(), object)
  const sourceClone = Object.assign({}, defaultStruct(), source)

  return {
    dirs: [...objectClone.dirs, ...sourceClone.dirs],
    files: [...objectClone.files, ...sourceClone.files],
    dependencies: Object.assign({}, objectClone.dependencies, sourceClone.dependencies),
    devDependencies: Object.assign({}, objectClone.devDependencies, sourceClone.devDependencies)
  }
}

function defaultStruct(): Required<ProjectStruct> {
  return {
    dirs: [],
    files: [],
    dependencies: {},
    devDependencies: {}
  }
}
