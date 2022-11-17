import { LINT_STAGE_TYPE } from '../../../types'

export default function (type?: LINT_STAGE_TYPE, ts?: boolean) {
  const extName = ts ? ['js', 'jsx', 'ts', 'tsx'] : ['js', 'jsx']

  if (type === 'prettier') {
    return [`*.{${extName.join(',')}}`, 'prettier --write']
  } else if (type === 'eslint') {
    return [`*.{${extName.join(',')}}`, 'eslint --fix']
  } else {
    return []
  }
}
