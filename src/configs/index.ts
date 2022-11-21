import ts from './ts'
import pkg from './pkg'
import lint from './lint'
import test from './test'
import prompts from 'prompts'
import vscode from './vscode'
import ignore from './ignore'
import bundler from './bundler'
import { basename } from 'path'
import { stringify } from '../utils'
import { JSONObject } from 'types-json'
import { cloneDeep, uniq, isEmpty } from 'lodash'
import { ProjectStruct, TemplateConfig, TemplateConfigOptions } from '../../types'

export async function parse(templateConfig: TemplateConfig, dest: string) {
  let { config } = templateConfig
  const { preprepare, postprepare } = templateConfig
  let struct: Required<ProjectStruct> = defaultStruct()

  if (typeof config == 'function') {
    config = await config(prompts)
  }

  if (preprepare) {
    struct = {
      ...struct,
      ...(await preprepare(cloneDeep(struct), cloneDeep(config), dest))
    }
  }

  struct = parseConfig(struct, config, dest)

  if (postprepare) {
    struct = {
      ...struct,
      ...(await postprepare(cloneDeep(struct), cloneDeep(config), dest))
    }
  }

  return struct
}

function parseConfig(struct: Required<ProjectStruct>, config: TemplateConfigOptions, dest: string) {
  if (config.ts) {
    struct = merge(struct, ts(config))
  }

  if (config.dirs) {
    struct = merge(struct, { dirs: config.dirs, files: [] })
  }

  if (config.files) {
    struct = merge(struct, { files: config.files })
  }

  if (config.bundler) {
    struct = merge(struct, bundler(config))
  }

  if (config.lint) {
    config.lint.forEach((rule) => {
      struct = merge(struct, lint(rule, config))
    })
  }

  if (config.vscode && !isEmpty(config.vscode)) {
    struct = merge(struct, vscode(config.vscode))
  }

  if (config.test) {
    struct = merge(struct, test(config))
  }

  if (config.test && config.e2e) {
    // todo
  }

  struct = merge(struct, ignore('git'))
  struct = mergeLintstagedConfig(struct)

  return merge(struct, pkg(basename(dest), config, struct))
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

function mergeLintstagedConfig(struct: ProjectStruct) {
  const lintstagedrc = struct.files
    .filter(([fileName]) => fileName === '.lintstagedrc')
    .reduce((result: JSONObject, file: Array<string>) => {
      const json = <JSONObject>JSON.parse(file[1])

      for (const key in json) {
        if (result[key] && Array.isArray(result[key])) {
          result[key] = [...(<Array<string>>result[key]), <string>json[key]]
        } else if (result[key]) {
          result[key] = [<string>result[key], <string>json[key]]
        } else {
          result[key] = json[key]
        }
      }

      return result
    }, {})

  struct.files = struct.files.filter(([fileName]) => fileName !== '.lintstagedrc')

  return merge(struct, { files: isEmpty(lintstagedrc) ? [] : [['.lintstagedrc', stringify(lintstagedrc)]] })
}
