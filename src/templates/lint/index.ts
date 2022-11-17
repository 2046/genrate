import prettierrc from './prettierrc'
import { stringify } from '../../utils'
import lintstagedrc from './lintstagedrc'
import { LINT_STAGE_TYPE } from '../../../types'

function rc(lintrc: 'prettierrc'): string
function rc(lintrc: 'lintstagedrc', options: { type: LINT_STAGE_TYPE; ts?: boolean }): string
function rc(lintrc: string, options?: { type: LINT_STAGE_TYPE; ts?: boolean }): string {
  switch (lintrc) {
    case 'lintstagedrc':
      const [key, value] = lintstagedrc(options?.type, options?.ts)

      return stringify({ [key]: value })
    case 'prettierrc':
      return stringify(prettierrc)
    default:
      return ''
  }
}

export default rc
