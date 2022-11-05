import { join } from 'path'
import npa from 'npm-package-arg'
import { npm, download, unzip, isDirectory, TMP_PATH, TEMPLATE_PATH } from '../utils'

export default async function use(template: string) {
  const dest = process.argv[4] || process.cwd()
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

  // load tempalte config
  // parse template config
  // genrate project structure
}

function parsePackageName(packageName: string) {
  const { name, rawSpec } = <{ name: string; rawSpec: string }>npa(packageName)

  return rawSpec === '*' ? { name, version: 'latest' } : { name, version: rawSpec }
}
