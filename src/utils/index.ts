import { resolve } from 'path'
import { exec } from './shell'
import { readJsonSync } from 'fs-extra'

export function getNpmRegistry() {
  const { code, stdout, stderr } = exec('npm config get registry')

  if (!code) {
    return stdout.trim()
  } else {
    throw new Error(stderr)
  }
}

export function getPackageInfo() {
  return <{ version: string; description: string }>readJsonSync(resolve(process.cwd(), 'package.json'))
}
