import fs from 'fs-extra'
import rimraf from 'rimraf'
import { join } from 'path'

export function createDirSync(path: string) {
  fs.ensureDirSync(path)
  return path
}

export function isDirectory(path: string) {
  try {
    return fs.lstatSync(path).isDirectory()
  } catch (error) {
    return false
  }
}

export function rmDirSync(path: string) {
  rimraf.sync(path)
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

export function readPackageJson<T>(path: string) {
  return fs.readJsonSync(path) as T
}

export function writeFileSync(path: string, data: string) {
  fs.writeFileSync(path, data, { encoding: 'utf8' })
}
