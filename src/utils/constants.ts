import os from 'os'
import { join } from 'path'

export const TMP_PATH = join(os.tmpdir(), 'scaffold')
export const TEMPLATE_PATH = join(os.homedir(), '.scaffold')
