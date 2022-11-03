import { npm } from '../utils'

export default async function (template: string) {
  const url = await npm.getCompressedPackageUrl(template, 'latest')
  const filePath = await npm.downloadCompressedPackage(url)
}
