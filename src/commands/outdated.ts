import chalk from 'chalk'
import { join } from 'path'
import npm from '../utils/npm'
import table from 'text-table'
import { output, compareVersion } from '../utils'
import { isDirectory, readdir } from '../utils/fs'
import { TEMPLATE_PATH } from '../utils/constants'

export default async function outdated() {
  let templates = await readdir(TEMPLATE_PATH)
  const THead = ['Template', 'Current', 'Latest'].map((s) => chalk.underline(s))

  templates = templates.filter((item) => isDirectory(join(TEMPLATE_PATH, item)))

  const TBody = templates.length
    ? await Promise.all(
        templates.map((template, index) => {
          return new Promise<Array<string>>((resolve) => {
            const currentVersion = npm.readPackageJson(join(TEMPLATE_PATH, template)).version

            setTimeout(() => {
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
                .catch(() => resolve([chalk.red(template), chalk.magenta(currentVersion), '*']))
            }, index * 400)
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
