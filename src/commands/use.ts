import npm from '../utils/npm'
import npa from 'npm-package-arg'
import { parse } from '../configs'
import { join, dirname } from 'path'
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
    createProject(parse(templateConfig.config).files, dest)

    output(`Generated project in ${dest}

Next steps:

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

function createProject(files: Array<Array<string>>, dest: string) {
  for (const [fileName, content] of files) {
    const filePath = join(dest, fileName)

    if (!isDirectory(dirname(filePath))) {
      createDirSync(dirname(filePath))
    }

    writeFileSync(filePath, content)
  }
}
