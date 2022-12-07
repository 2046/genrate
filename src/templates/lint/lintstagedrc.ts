import { stringify } from '../../utils'
import { TemplateConfigOptions } from '../../../types'

export default function (type: string, templateConfig: TemplateConfigOptions) {
  const { ts, framework = '' } = templateConfig
  let extName = ['md', 'json', 'yml', 'js', 'jsx']

  if (ts) {
    extName = [...extName, 'ts', 'tsx']
  }

  if (['vue'].includes(framework)) {
    extName = [...extName, 'vue']
  }

  if (type === 'prettier') {
    return stringify({ [`*.{${extName.join(',')}}`]: 'prettier --write' })
  }

  if (type === 'eslint') {
    return stringify({ [`*.{${extName.join(',')}}`]: 'eslint --fix' })
  }

  return ''
}
