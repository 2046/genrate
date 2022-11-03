import npm from './npm'
import axios from 'axios'
import { basename, join } from 'path'
import { TMP_PATH } from './constants'
import { createWriteStream } from 'fs'

export { npm, TMP_PATH }

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
