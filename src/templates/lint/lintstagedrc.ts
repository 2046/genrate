import { stringify } from '../../utils'
import { TemplateConfigOptions } from '../../../types'

export default function (type: string, templateConfig: TemplateConfigOptions) {
  const { ts } = templateConfig
  const extName = ts ? ['js', 'jsx', 'ts', 'tsx'] : ['js', 'jsx']

  if (type === 'prettier') {
    return stringify({ [`*.{${extName.join(',')}}`]: 'prettier --write' })
  }

  if (type === 'eslint') {
    return stringify({ [`*.{${extName.join(',')}}`]: 'eslint --fix' })
  }

  return ''
}
