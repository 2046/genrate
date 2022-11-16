import rollup from './rollup'
import { TemplateConfigOptions } from '../../../types'

export default function (templateConfig: TemplateConfigOptions) {
  switch (templateConfig.bundler) {
    case 'rollup':
      if (templateConfig.ts) {
        return rollup.tsTemplate
      } else {
        return rollup.jsTemplate
      }
    default:
      return ''
  }
}
