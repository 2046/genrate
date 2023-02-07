import fs from 'fs-extra'
import rimraf from 'rimraf'
import { join } from 'path'
import { exec } from './shell'
import { dirname } from 'path'
import { ProjectStruct } from '../../types'

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
  const files = fs.readdirSync(path)

  for (const file of files.filter((file) => !isdotfile(file))) {
    rimraf.sync(join(path, file))
  }
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
  fs.writeFileSync(path, data, { encoding: 'utf8', mode: 0o0755 })
}

export async function isEmptyDirectory(path: string) {
  if (isDirectory(path)) {
    const dirs = await fs.readdir(path)

    return !dirs.length
  } else {
    return true
  }
}

export function createProject(struct: Required<ProjectStruct>, dest: string, vcs = true) {
  const { files, dirs } = struct

  for (const dir of dirs) {
    createDirSync(join(dest, dir))
  }

  for (const [fileName, content] of files) {
    const filePath = join(dest, fileName)
    const dirPath = dirname(filePath)

    if (!isDirectory(dirPath)) {
      createDirSync(dirPath)
    }

    writeFileSync(filePath, content)
  }

  if (vcs) {
    exec('git init', { cwd: dest })
  }
}

function isdotfile(fileName: string) {
  return /(?:^|[\\\/])(\.(?!\.)[^\\\/]+)$/.test(fileName)
}
