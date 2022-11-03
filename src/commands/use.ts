import { join } from 'path'
import { npm, download, unzip, TMP_PATH, TEMPLATE_PATH } from '../utils'

export default async function use(template: string) {
  const url = await npm.getCompressedPackageUrl(template, 'latest')
  const tmpPath = await download(url, TMP_PATH)
  const templatePath = await unzip(tmpPath, join(TEMPLATE_PATH, template), { override: true })

  console.log({
    template,
    url,
    tmpPath,
    templatePath
  })
}
