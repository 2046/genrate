import axios from 'axios'
import { exec } from './shell'
import { basename, join } from 'path'
import { createWriteStream } from 'fs'
import { TMP_PATH } from './constants'

export default {
  registry: (function () {
    const { code, stdout, stderr } = exec('npm config get registry')

    if (!code) {
      return stdout.trim()
    } else {
      throw new Error(stderr)
    }
  })(),
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
  downloadCompressedPackage(url: string) {
    return new Promise<string>((resolve, reject) => {
      void axios.get<NodeJS.ReadableStream>(url, { responseType: 'stream' }).then((res) => {
        const destPath = join(TMP_PATH, basename(url))

        res.data
          .pipe(createWriteStream(destPath))
          .on('close', () => resolve(destPath))
          .on('error', (error) => reject(error))
      })
    })
  }
}
