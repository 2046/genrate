import { join } from 'path'
import { npm } from './utils'
import commands from './commands'
import { program } from 'commander'

const packageInfo = npm.readPackageJson(join(process.cwd(), 'package.json'))

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
