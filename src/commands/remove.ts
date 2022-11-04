import { join } from 'path'
import rimraf from 'rimraf'
import { promisify } from 'util'
import { isDirectory, TEMPLATE_PATH } from '../utils'

export default async function remove(template: string) {
  const path = join(TEMPLATE_PATH, template)

  if (isDirectory(path)) {
    await promisify(rimraf)(path)
  }
}
