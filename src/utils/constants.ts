import os from 'os'
import { join } from 'path'
import { createDirSync } from './fs'

export const TMP_PATH = createDirSync(join(os.tmpdir(), 'scaffold'))
export const TEMPLATE_PATH = createDirSync(join(os.homedir(), '.scaffold'))
