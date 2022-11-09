import { join } from 'path'
import { output } from '../utils'
import { TEMPLATE_PATH } from '../utils/constants'
import { rmDirSync, isDirectory } from '../utils/fs'

export default function rm(template = '') {
  const path = join(TEMPLATE_PATH, template)

  if (!template) {
    return output('Please enter [template] name')
  }

  if (!isDirectory(path)) {
    return output(`The [${template}] template does not exist locally`)
  }

  rmDirSync(path)
  output(`The [${template}] template delete done`)
}
