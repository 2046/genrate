import npm from './npm'
import { resolve } from 'path'
import { readJsonSync } from 'fs-extra'

export { npm }

export function getPackageInfo() {
  return <{ version: string; description: string }>readJsonSync(resolve(process.cwd(), 'package.json'))
}
