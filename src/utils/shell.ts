import shelljs from 'shelljs'
import cp, { ExecException } from 'child_process'

export function exec(
  command: string,
  options?: {
    cwd?: string
    silent?: boolean
  }
) {
  const { cwd = '', silent = true } = options || {}

  if (cwd) {
    try {
      const result = cp.execSync(command, { cwd, stdio: silent ? 'ignore' : undefined })
      return { code: 0, stdout: result.toString(), stderr: '' }
    } catch (error) {
      return { code: 1, stdout: '', stderr: (error as ExecException).message }
    }
  } else {
    return shelljs.exec(command, { silent })
  }
}
