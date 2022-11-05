import axios from 'axios'
import { join } from 'path'
import { exec } from './shell'
import { readJsonSync } from 'fs-extra'

interface PackageJson {
  version: string
  description: string
  _template?: {
    main: string
    plugin?: string
  }
}

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
    return <PackageJson>readJsonSync(join(filePath, 'package.json'))
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
  },
  async checkPackageValid(packageName: string, version: string) {
    const { data } = await axios.get<PackageJson>(`${this.registry}${packageName}/${version}`)

    return !!data._template && !!data._template.main
  }
}
