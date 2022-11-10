export type TemplateConfigPlugin = () => void

export interface TemplateConfig {
  config: TemplateConfigOptions
  plugin?: TemplateConfigPlugin
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
    plugin?: string
  }
}
