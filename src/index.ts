import npm from './utils/npm'
import commands from './commands'
import { program } from 'commander'
import { join, resolve } from 'path'

const packageInfo = npm.readPackageJson(resolve(join(__dirname, '..')))

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
