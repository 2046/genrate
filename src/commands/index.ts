import ls from './ls'
import rm from './rm'
import use from './use'
import init from './init'
import outdated from './outdated'

export default [
  {
    command: 'use [template]',
    description: 'initialize the project using the template',
    action: use
  },
  {
    command: 'init',
    description: 'create a template file',
    action: init
  },
  {
    command: 'ls',
    description: 'list installed templates',
    action: ls
  },
  {
    command: 'outdated',
    description: 'check for outdated templates',
    action: outdated
  },
  {
    command: 'rm [template]',
    description: 'remove a template file',
    action: rm
  }
]
