import npm from './npm'
import axios from 'axios'
import fs from 'fs-extra'
import rimraf from 'rimraf'
import { promisify } from 'util'
import decompress from 'decompress'
import { createWriteStream } from 'fs'
import { TMP_PATH, TEMPLATE_PATH } from './constants'
import { basename, join, resolve, isAbsolute } from 'path'

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
  if (options.override && isDirectory(dest)) {
    await rmdir(dest)
  }

  await fs.ensureDir(dest)
  await decompress(filePath, dest, { strip: 1 })

  return dest
}

export function isDirectory(dest: string) {
  try {
    return fs.lstatSync(dest).isDirectory()
  } catch (error) {
    return false
  }
}

export function output(message: string) {
  console.log(message)
}

export function toAbsolutePath(path: string) {
  return isAbsolute(path) ? path : resolve(join(process.cwd(), path))
}

export function compareVersion(targetVerison: string, currentVersion: string) {
  const targetVersions = targetVerison.split('.')
  const currentVersions = currentVersion.split('.')

  for (let index = 0, num1, num2; index < targetVersions.length; index++) {
    num1 = parseInt(targetVersions[index], 10) || 0
    num2 = parseInt(currentVersions[index], 10) || 0
    if (num1 > num2) return -1
    if (num1 < num2) return 1
  }

  return 0
}

export async function rmdir(path: string) {
  await promisify(rimraf)(path)
}

export async function readdir(path: string) {
  const dirs = await fs.readdir(path)

  return dirs.reduce((previousValue: Array<string>, currentValue: string) => {
    if (currentValue.startsWith('@')) {
      return [...previousValue, ...fs.readdirSync(join(path, currentValue)).map((value) => join(currentValue, value))]
    } else {
      return [...previousValue, currentValue]
    }
  }, [])
}

export async function dynamicImport<T>(path: string): Promise<T> {
  return (await import(path).then((val) => <{ default: T }>val)).default
}

export async function loadTemplateConfig(path: string) {
  const { main = '', plugin = '' } = npm.readPackageJson(join(path))._template || {}

  if (main && plugin) {
    return {
      config: await dynamicImport<{ files: Array<string> }>(resolve(join(path, main))),
      plugin: await dynamicImport<() => void>(resolve(join(path, plugin)))
    }
  }

  if (main) {
    return {
      config: await dynamicImport<{ files: Array<string> }>(resolve(join(path, main)))
    }
  }

  return null
}
