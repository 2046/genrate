import { resolve } from 'path'
import commands from './commands'
import { program } from 'commander'
import { readJsonSync } from 'fs-extra'

const packageInfo = getPackageInfo()

program
  .name('gen')
  .usage('[command]')
  .helpOption(false)
  .addHelpCommand(false)
  .description(packageInfo.description)
  .version(packageInfo.version, '-v, --version', 'output the current version')

commands.forEach((commandOption) => {
  program.command(commandOption.command).description(commandOption.description).action(commandOption.action)
})

program.parse()

function getPackageInfo() {
  return <{ version: string; description: string }>readJsonSync(resolve(process.cwd(), 'package.json'))
}
