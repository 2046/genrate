import type prompts from 'prompts'

export type TemplateConfigPlugin = (struct: ProjectStruct, config: TemplateConfigOptions, dest: string) => Promise<ProjectStruct | void>
export type TS_TEMPLATE_TYPE = 'web' | 'webpack' | 'nodepack'

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
  framework?: 'web' | 'vue' | 'react' | 'electron'
  lint?: Array<'stylelint' | 'eslint' | 'commitlint'>
  bundler?: 'rollup' | 'webpack' | 'vite'
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
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export type RequiredByKeys<T, K extends keyof T = keyof T> = {
  [Key in Exclude<keyof T, K>]?: T[Key]
} & {
  [Key in K]-?: T[Key]
} extends infer R
  ? { [Key in keyof R]: R[Key] }
  : never
