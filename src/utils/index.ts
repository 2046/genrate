import npm from './npm'
import axios from 'axios'
import rimraf from 'rimraf'
import { promisify } from 'util'
import decompress from 'decompress'
import { lstatSync } from 'fs-extra'
import { basename, join } from 'path'
import { createWriteStream } from 'fs'
import { TMP_PATH, TEMPLATE_PATH } from './constants'

export { npm, TMP_PATH, TEMPLATE_PATH }

export function download(url: string, dest: string) {
  return new Promise<string>((resolve, reject) => {
    void axios.get<NodeJS.ReadableStream>(url, { responseType: 'stream' }).then((res) => {
      const destPath = join(dest, basename(url))

      res.data
        .pipe(createWriteStream(destPath))
        .on('close', () => resolve(destPath))
        .on('error', (error) => reject(error))
    })
  })
}

export async function unzip(filePath: string, dest: string, options: { override: boolean } = { override: false }) {
  if (options.override && lstatSync(dest).isDirectory()) {
    await promisify(rimraf)(dest)
  }

  await decompress(filePath, dest, { strip: 1 })

  return dest
}
