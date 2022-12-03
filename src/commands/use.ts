import { join } from 'path'
import prompts from 'prompts'
import npm from '../utils/npm'
import npa from 'npm-package-arg'
import { parse } from '../configs'
import { TMP_PATH, TEMPLATE_PATH } from '../utils/constants'
import { isDirectory, createProject, isEmptyDirectory, rmDirSync } from '../utils/fs'
import { download, unzip, loadTemplateConfig, toAbsolutePath, output } from '../utils'

export default async function use(template = '') {
  if (!template) {
    return output('Please enter [template] name')
  }

  const dest = toAbsolutePath(process.argv[4] || process.cwd())
  const { name, version } = parsePackageName(template)
  const templatePath = join(TEMPLATE_PATH, name)

  if (!(await isEmptyDirectory(dest))) {
    const answers = await prompts([
      {
        initial: true,
        type: 'confirm',
        name: 'overwrite',
        message: 'Current directory is not empty. Remove existing files and continue?'
      }
    ])

    if (!answers.overwrite) {
      return
    }

    rmDirSync(dest)
  }

  if (!isDirectory(templatePath)) {
    if (await npm.checkPackageValid(name, version)) {
      const url = await npm.getCompressedPackageUrl(name, version)
      const zipPath = await download(url, TMP_PATH)

      await unzip(zipPath, templatePath, { override: true })
    } else {
      return output(`The [${template}] not found or is illegal`)
    }
  }

  const templateConfig = await loadTemplateConfig(templatePath)

  if (templateConfig) {
    createProject(await parse(templateConfig, dest), dest)

    output(`Generated project in ${dest}

Next steps:
  ${process.argv[4] ? '\n  cd ' + process.argv[4] : ''}
  npm install
  npm run dev`)
  } else {
    output(`The [${template}] is illegal`)
  }
}

function parsePackageName(packageName: string) {
  const { name, rawSpec } = <{ name: string; rawSpec: string }>npa(packageName)

  return rawSpec === '*' ? { name, version: 'latest' } : { name, version: rawSpec }
}
