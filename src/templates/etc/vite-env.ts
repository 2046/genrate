import { JSONObject } from 'types-json'

export default function ({ component, metaEnv }: JSONObject) {
  let str = `/// <reference types="vite/client" />

`

  if (component) {
    str += `declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

`
  }

  if (metaEnv) {
    str += `interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}
    
interface ImportMeta {
  readonly env: ImportMetaEnv
}`
  }

  return str
}
