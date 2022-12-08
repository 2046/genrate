import { basename } from 'path'
import * as parser from './parser'
import { cloneDeep, uniq, isEmpty } from 'lodash'
import { ProjectStruct, TemplateConfig, TemplateConfigOptions } from '../../types'

export async function parse(templateConfig: TemplateConfig, dest: string) {
  let { config } = templateConfig
  const { preprepare, postprepare } = templateConfig
  let struct: Required<ProjectStruct> = defaultStruct()

  if (typeof config == 'function') {
    config = await config((await import('prompts')).default)
  }

  if (preprepare) {
    const result = await preprepare(cloneDeep(struct), cloneDeep(config), dest)

    if (result) {
      struct = merge(struct, result)
    }
  }

  struct = parseConfig(struct, config, dest)

  if (postprepare) {
    const result = await postprepare(cloneDeep(struct), cloneDeep(config), dest)

    if (result) {
      struct = merge(struct, result)
    }
  }

  return struct
}

function parseConfig(struct: Required<ProjectStruct>, config: TemplateConfigOptions, dest: string) {
  const { dirs = [], files = [], lint = [] } = config

  struct = merge(struct, { files })
  struct = merge(struct, { dirs, files: [] })
  struct = merge(struct, parser.tsConfig(config))
  struct = merge(struct, parser.e2eConfig(config))
  struct = merge(struct, parser.testConfig(config))
  struct = merge(struct, parser.vsCodeConfig(config))
  struct = merge(struct, parser.ignoreConfig(config))
  struct = merge(struct, parser.bundlerConfig(config))
  ;(isEmpty(lint) ? lint : ['husky', ...lint]).forEach((rule) => (struct = merge(struct, parser.lintConfig(rule, config))))

  return merge(struct, parser.pkgConfig(basename(dest), config, struct))
}

function merge(object: ProjectStruct, source: ProjectStruct): Required<ProjectStruct> {
  const objectClone = Object.assign({}, defaultStruct(), object)
  const sourceClone = Object.assign({}, defaultStruct(), source)

  return {
    files: [...objectClone.files, ...sourceClone.files],
    dirs: uniq([...objectClone.dirs, ...sourceClone.dirs]),
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
