import chalk from 'chalk'
import { join } from 'path'
import table from 'text-table'
import { npm, output, readdir, compareVersion, TEMPLATE_PATH } from '../utils'

export default async function outdate() {
  const templates = await readdir(TEMPLATE_PATH)
  const THead = ['Template', 'Current', 'Latest'].map((s) => chalk.underline(s))

  const TBody = templates.length
    ? await Promise.all(
        templates.map((template) => {
          return new Promise<Array<string>>((resolve) => {
            const currentVersion = npm.readPackageJson(join(TEMPLATE_PATH, template)).version

            npm
              .getLatestVersion(template)
              .then((latestVersion) => {
                const isUpdate = compareVersion(currentVersion, latestVersion) === 1

                resolve([
                  chalk.red(template),
                  chalk.magenta(currentVersion),
                  isUpdate ? chalk.green(latestVersion) : chalk.magenta(latestVersion)
                ])
              })
              .catch((err) => console.log(err))
          })
        })
      )
    : [['empty', 'empty', 'empty']]

  output(
    table([THead, ...TBody], {
      align: ['l', 'r', 'r'],
      stringLength: (s) => ansiTrim(s).length
    })
  )
}

function ansiTrim(str: string) {
  const r = new RegExp('\x1b(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|' + '\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)', 'g')

  return str.replace(r, '')
}
