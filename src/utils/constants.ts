import os from 'os'
import { join } from 'path'
import { ensureDirSync } from 'fs-extra'

export const TMP_PATH = ensureDir(join(os.tmpdir(), 'scaffold'))
export const TEMPLATE_PATH = ensureDir(join(os.homedir(), '.scaffold'))

function ensureDir(path: string) {
  ensureDirSync(path)
  return path
}
