import chalk from 'chalk'
import { parse } from '../configs'
import { capitalize } from 'lodash'
import { JSONObject } from 'types-json'
import prompts, { PromptObject } from 'prompts'
import { toAbsolutePath, output } from '../utils'
import { TemplateConfigOptions } from '../../types'
import { createProject, isEmptyDirectory, rmDirSync } from '../utils/fs'

export default async function init() {
  const questions: Array<PromptObject> = [
    { type: 'toggle', name: 'ts', active: 'yes', inactive: 'no', initial: true, message: 'Use the TypeScript language?' },
    { type: 'toggle', name: 'lib', active: 'yes', inactive: 'no', initial: false, message: 'Create a library project?' },
    {
      type: 'select',
      name: 'framework',
      message: 'Select a framework?',
      choices: [
        { title: colors('vue'), value: 'vue' },
        { title: colors('node'), value: 'node' },
        { title: colors('nest'), value: 'nest' },
        { title: colors('react'), value: 'react' },
        { title: colors('vanilla'), value: 'vanilla' },
        { title: colors('electron'), value: 'electron' }
      ]
    },
    {
      type: 'multiselect',
      name: 'lint',
      instructions: false,
      message: 'Select the lint tools',
      hint: '- Space to select. Return to submit',
      choices: [
        { title: 'ESlint', value: 'eslint' },
        { title: 'Stylelint', value: 'stylelint' },
        { title: 'Commitlint', value: 'commitlint' }
      ]
    },
    { type: 'toggle', name: 'test', active: 'yes', inactive: 'no', initial: false, message: 'Add unit testing?' },
    {
      type: (prev) => (prev == true ? 'toggle' : null),
      name: 'e2e',
      active: 'yes',
      inactive: 'no',
      initial: false,
      message: 'Add an End-to-End Testing Solution?'
    }
  ]

  const dest = toAbsolutePath(process.argv[3] || process.cwd())

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

  const templateConfig = getTemplateConfig(await prompts(questions))

  createProject(await parse({ config: templateConfig }, dest), dest)

  output(`Generated project in ${dest}

Next steps:
  ${process.argv[4] ? '\n  cd ' + process.argv[4] : ''}
  npm install
  npm run dev`)
}

function getTemplateConfig(answers: JSONObject) {
  if (answers.framework === 'node') {
    delete answers.framework
  }

  return Object.assign({}, { vscode: [], dirs: ['src'] }, answers)
}

function colors(type: Required<TemplateConfigOptions>['framework'] | 'node') {
  const colors = {
    vue: '#42B883',
    node: '#046E01',
    nest: '#E0234D',
    react: '#61DAFB',
    vanilla: '#FF6600',
    electron: '#9EEAF9'
  }

  return chalk.hex(colors[type])(capitalize(type))
}
