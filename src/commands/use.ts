import { npm } from '../utils'

export default async function (template: string) {
  const fileUrl = await npm.getCompressedPackage(template, 'latest')
}
