import { join } from 'path'
import { output } from '../utils'
import { TEMPLATE_PATH } from '../utils/constants'
import { rmDirSync, isDirectory } from '../utils/fs'

export default function rm(template = '') {
  if (!template) {
    return output('Please enter [template] name')
  }

  const templatePath = join(TEMPLATE_PATH, template)

  if (!isDirectory(templatePath)) {
    return output(`The [${template}] template does not exist locally`)
  }

  rmDirSync(templatePath)
  output(`The [${template}] template delete done`)
}
