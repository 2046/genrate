import rollup from './rollup'
import { TemplateConfigOptions } from '../../../types'

export default function (templateConfig: TemplateConfigOptions) {
  switch (templateConfig.bundler) {
    case 'rollup':
      if (templateConfig.ts) {
        const { lib = false } = templateConfig
        return rollup.tsTemplate(lib)
      } else {
        return rollup.jsTemplate()
      }
    default:
      return ''
  }
}
