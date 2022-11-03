import shelljs from 'shelljs'

export function exec(command: string, silent = true) {
  return shelljs.exec(command, { silent })
}
