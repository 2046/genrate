import { join } from 'path'
import npa from 'npm-package-arg'
import { npm, rmdir, download, unzip, isDirectory, TMP_PATH, TEMPLATE_PATH } from '../utils'

type PackageJsonProperty = ReturnType<typeof npm.readPackageJson>

export default async function use(template: string) {
  const dest = process.argv[4] || process.cwd()
  const { name, version } = parsePackageName(template)
  const templatePath = join(TEMPLATE_PATH, <string>name)

  if (!isDirectory(templatePath)) {
    const url = await npm.getCompressedPackageUrl(<string>name, version)
    const tmpPath = await download(url, TMP_PATH)

    await unzip(tmpPath, templatePath, { override: true })

    const genrateProperty = readPackageProperty<'genrate'>(templatePath, 'genrate')

    if (!genrateProperty) {
      return await rmdir(templatePath)
    }
  }
}

function parsePackageName(packageName: string) {
  const { name, rawSpec } = npa(packageName)

  return rawSpec === '*' ? { name, version: 'latest' } : { name, version: rawSpec }
}

function readPackageProperty<K extends keyof PackageJsonProperty>(templatePath: string, property: keyof PackageJsonProperty) {
  return npm.readPackageJson(join(templatePath, 'package.json'))[property] as PackageJsonProperty[K]
}
