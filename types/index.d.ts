import type prompts from 'prompts'
import type { JSONObject } from 'types-json'

export type TemplateConfigPlugin = (struct: ProjectStruct, config: TemplateConfigOptions, dest: string) => Promise<ProjectStruct | void>

export interface TemplateConfig {
  preprepare?: TemplateConfigPlugin
  postprepare?: TemplateConfigPlugin
  config: TemplateConfigOptions | ((prompts: prompts) => Promise<TemplateConfigOptions>)
}

export interface TemplateConfigOptions {
  ts?: boolean
  lib?: boolean
  dirs?: Array<string>
  files?: Array<Array<string>>
  framework?: 'vanilla' | 'vue' | 'react' | 'electron' | 'nest'
  fvs?: string
  lint?: Array<'stylelint' | 'eslint' | 'commitlint'>
  vscode?: Array<string>
  test?: boolean
  e2e?: boolean
}

export interface TemplateConfigPackageJson {
  version: string
  description: string
  template?: {
    main: string
    preprepare?: string
    postprepare?: string
  }
}

export interface ProjectStruct {
  dirs?: Array<string>
  files: Array<Array<string>>
  dependencies?: JSONObject
  devDependencies?: JSONObject
}

export type RequiredByKeys<T, K extends keyof T = keyof T> = {
  [Key in Exclude<keyof T, K>]?: T[Key]
} & {
  [Key in K]-?: T[Key]
} extends infer R
  ? { [Key in keyof R]: R[Key] }
  : never
