import axios from 'axios'
import { exec } from './shell'
import { readJsonSync } from 'fs-extra'

export default {
  registry: (function () {
    const { code, stdout, stderr } = exec('npm config get registry')

    if (!code) {
      return stdout.trim()
    } else {
      throw new Error(stderr)
    }
  })(),
  readPackageJson(filePath: string) {
    return <
      {
        version: string
        description: string
      }
    >readJsonSync(filePath)
  },
  async getLatestVersion(packageName: string) {
    const { data } = await axios.get<{
      'dist-tags': { latest: string }
    }>(`${this.registry}${packageName}`)

    return data['dist-tags'].latest
  },
  async getCompressedPackageUrl(packageName: string, version: string) {
    const { data } = await axios.get<{
      dist: { tarball: string }
    }>(`${this.registry}${packageName}/${version}`)

    return data.dist.tarball
  }
}
