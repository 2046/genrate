import { join } from 'path'
import { TEMPLATE_PATH } from '../utils/constants'
import { rmDirSync, isDirectory } from '../utils/fs'

export default function remove(template: string) {
  const path = join(TEMPLATE_PATH, template)

  if (isDirectory(path)) {
    rmDirSync(path)
  }
}
