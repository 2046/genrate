import npm from './npm'
import axios from 'axios'
import decompress from 'decompress'
import { createWriteStream } from 'fs'
import { basename, join, resolve, isAbsolute } from 'path'
import { createDirSync, rmDirSync, isDirectory } from './fs'
import { TemplateConfig, TemplateConfigOptions, TemplateConfigPlugin } from '../../types'

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
    rmDirSync(dest)
  }

  createDirSync(dest)
  await decompress(filePath, dest, { strip: 1 })

  return dest
}

export function output(message: string) {
  console.log(`${message}\n`)
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

export async function dynamicImport<T>(path: string): Promise<T> {
  return (await import(path).then((val) => <{ default: T }>val)).default
}

export async function loadTemplateConfig(path: string): Promise<TemplateConfig | null> {
  const { main = '', preprepare = '', postprepare = '' } = npm.readPackageJson(join(path)).template || {}

  if (main) {
    const templateConfig: TemplateConfig = {
      config: await dynamicImport<TemplateConfigOptions>(resolve(join(path, main)))
    }

    if (preprepare) {
      templateConfig.preprepare = await dynamicImport<TemplateConfigPlugin>(resolve(join(path, preprepare)))
    }

    if (postprepare) {
      templateConfig.postprepare = await dynamicImport<TemplateConfigPlugin>(resolve(join(path, postprepare)))
    }

    return templateConfig
  } else {
    return null
  }
}

export function stringify(value: unknown) {
  return JSON.stringify(value, null, 2)
}
