import { join } from 'path'
import { rmdir, isDirectory, TEMPLATE_PATH } from '../utils'

export default async function remove(template: string) {
  const path = join(TEMPLATE_PATH, template)

  if (isDirectory(path)) {
    await rmdir(path)
  }
}
