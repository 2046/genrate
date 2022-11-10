export type TemplateConfigPlugin = (struct: ProjectStruct, config: TemplateConfigOptions, dest: string) => void

export interface TemplateConfig {
  config: TemplateConfigOptions
  preprepare?: TemplateConfigPlugin
  postprepare?: TemplateConfigPlugin
}

export interface TemplateConfigOptions {
  ts?: boolean
  dirs?: Array<string>
  files?: Array<string>
  framework?: 'web' | 'vue' | 'react' | 'electron'
  lint?: Array<'stylelint' | 'eslint' | 'commitlint'>
  bundler?: 'rollup' | 'webpack' | 'vite'
  vscode?: Array<string>
  test?: boolean
  e2e?: boolean
  ignore?: boolean
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
