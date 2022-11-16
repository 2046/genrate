import { join } from 'path'
import npm from '../utils/npm'
import { output } from '../utils'
import { isDirectory, readdir } from '../utils/fs'
import { TEMPLATE_PATH } from '../utils/constants'

export default async function ls() {
  let templates = await readdir(TEMPLATE_PATH)

  templates = templates.filter((item) => isDirectory(join(TEMPLATE_PATH, item)))

  const tree = templates.length
    ? [
        TEMPLATE_PATH,
        ...templates.map((template, index) => {
          const branch = index === templates.length - 1 ? '└── ' : '├── '
          const version = npm.readPackageJson(join(TEMPLATE_PATH, template)).version

          return `${branch}${template}@${version}`
        })
      ]
    : [TEMPLATE_PATH, '└── (empty)']

  output(tree.join('\n'))
}
