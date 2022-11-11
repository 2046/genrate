import ts from './ts'
import pkg from './pkg'
import prompts from 'prompts'
import bundler from './bundler'
import { ProjectStruct, TemplateConfig } from '../../types'

export async function parse(templateConfig: TemplateConfig, dest: string) {
  let { config } = templateConfig
  const { preprepare, postprepare } = templateConfig
  let struct: Required<ProjectStruct> = defaultStruct()

  if (typeof config == 'function') {
    config = await config(prompts)
  }

  if (preprepare) {
    preprepare(struct, config, dest)
  }

  if (config.ts) {
    struct = merge(struct, ts('node'))
  }

  if (config.bundler) {
    struct = merge(struct, bundler(config.bundler))
  }

  struct = merge(struct, pkg(config, struct))

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
