import { getNpmRegistry } from '../utils'

export default function (template: string) {
  const npmRegistry = getNpmRegistry()

  console.log(npmRegistry, template)
}
