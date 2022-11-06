import { join } from 'path'
import npm from '../utils/npm'
import npa from 'npm-package-arg'
import { isDirectory } from '../utils/fs'
import { TMP_PATH, TEMPLATE_PATH } from '../utils/constants'
import { download, unzip, loadTemplateConfig, toAbsolutePath } from '../utils'

export default async function use(template: string) {
  const dest = toAbsolutePath(process.argv[4] || process.cwd())
  const { name, version } = parsePackageName(template)
  const templatePath = join(TEMPLATE_PATH, name)

  if (!isDirectory(templatePath)) {
    if (await npm.checkPackageValid(name, version)) {
      const url = await npm.getCompressedPackageUrl(name, version)
      const tmpPath = await download(url, TMP_PATH)

      await unzip(tmpPath, templatePath, { override: true })
    } else {
      return
    }
  }

  const templateConfig = await loadTemplateConfig(templatePath)

  // parse template config
  // genrate project structure
}

function parsePackageName(packageName: string) {
  const { name, rawSpec } = <{ name: string; rawSpec: string }>npa(packageName)

  return rawSpec === '*' ? { name, version: 'latest' } : { name, version: rawSpec }
}
