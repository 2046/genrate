import { join } from 'path'
import npm from '../utils/npm'
import { isDirectory } from '../utils/fs'
import { TEMPLATE_PATH, TMP_PATH } from '../utils/constants'
import { output, compareVersion, download, unzip } from '../utils'

export default async function update(template = '') {
  if (!template) {
    return output('Please enter [template] name')
  }

  const templatePath = join(TEMPLATE_PATH, template)

  if (!isDirectory(templatePath)) {
    return output(`The [${template}] template does not exist locally`)
  }

  const latestVersion = await npm.getLatestVersion(template)
  const currentVersion = npm.readPackageJson(templatePath).version
  const isUpdate = compareVersion(currentVersion, latestVersion) === 1

  if (isUpdate) {
    const url = await npm.getCompressedPackageUrl(template, latestVersion)
    const zipPath = await download(url, TMP_PATH)

    await unzip(zipPath, templatePath, { override: true })

    output(`The [${template}] template updated`)
  }
}
