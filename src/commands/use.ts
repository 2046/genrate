import { npm, download, TMP_PATH } from '../utils'

export default async function (template: string) {
  const url = await npm.getCompressedPackageUrl(template, 'latest')
  const filePath = await download(url, TMP_PATH)

  console.log(filePath)
}
