import tsConfig from './tsConfig'
import pkgConfig from './pkgConfig'

interface Config {
  ts?: boolean
  dirs?: Array<string>
  files?: Array<string>
}

export function parse(options: Config) {
  let config: {
    files: Array<Array<string>>
    devDependencies: Record<string, string>
  } = {
    files: [],
    devDependencies: {}
  }

  if (options.ts) {
    config = tsConfig()
  }

  return {
    files: [...config.files, ...pkgConfig(config).files]
  }
}
