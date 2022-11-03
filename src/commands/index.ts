import use from './use'
import init from './init'
import list from './list'
import outdate from './outdate'
import remove from './remove'

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
    command: 'list',
    description: 'list installed templates',
    action: list
  },
  {
    command: 'outdate',
    description: 'check for outdated templates',
    action: outdate
  },
  {
    command: 'remove [template]',
    description: 'remove a template file',
    action: remove
  }
]
