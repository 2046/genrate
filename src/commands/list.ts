import { join } from 'path'
import { readdir } from 'fs-extra'
import { npm, TEMPLATE_PATH } from '../utils'

export default async function list() {
  const templates = await readdir(TEMPLATE_PATH)

  const tree = templates.length
    ? [
        TEMPLATE_PATH,
        ...templates.map((template, index) => {
          const branch = index === templates.length - 1 ? '└── ' : '├── '
          const version = npm.readPackageJson(join(TEMPLATE_PATH, template, 'package.json')).version

          return `${branch}${template}@${version}`
        })
      ]
    : [TEMPLATE_PATH, '└── (empty)']

  console.log(tree.join('\n'))
}
