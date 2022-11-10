import npm from '../utils/npm'
import npa from 'npm-package-arg'
import { parse } from '../configs'
import { join, dirname } from 'path'
import { ProjectStruct } from '../../types'
import { TMP_PATH, TEMPLATE_PATH } from '../utils/constants'
import { isDirectory, createDirSync, writeFileSync } from '../utils/fs'
import { download, unzip, loadTemplateConfig, toAbsolutePath, output } from '../utils'

export default async function use(template = '') {
  if (!template) {
    return output('Please enter [template] name')
  }

  const dest = toAbsolutePath(process.argv[4] || process.cwd())
  const { name, version } = parsePackageName(template)
  const templatePath = join(TEMPLATE_PATH, name)

  if (!isDirectory(templatePath)) {
    if (await npm.checkPackageValid(name, version)) {
      const url = await npm.getCompressedPackageUrl(name, version)
      const zipPath = await download(url, TMP_PATH)

      await unzip(zipPath, templatePath, { override: true })
    } else {
      return output(`The [${template}] not found or is illegal`)
    }
  }

  const templateConfig = await loadTemplateConfig(templatePath)

  if (templateConfig) {
    createProject(parse(templateConfig), dest)

    output(`Generated project in ${dest}

Next steps:
  ${process.argv[4] ? '\n  cd ' + process.argv[4] : ''}
  npm install
  npm run dev`)
  } else {
    output(`The [${template}] is illegal`)
  }
}

function parsePackageName(packageName: string) {
  const { name, rawSpec } = <{ name: string; rawSpec: string }>npa(packageName)

  return rawSpec === '*' ? { name, version: 'latest' } : { name, version: rawSpec }
}

function createProject(struct: Required<ProjectStruct>, dest: string) {
  const { files, dirs } = struct

  for (const dir of dirs) {
    createDirSync(join(dest, dir))
  }

  for (const [fileName, content] of files) {
    const filePath = join(dest, fileName)
    const dirPath = dirname(filePath)

    if (!isDirectory(dirPath)) {
      createDirSync(dirPath)
    }

    writeFileSync(filePath, content)
  }
}
