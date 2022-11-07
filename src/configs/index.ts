import tsConfig from './tsConfig'

interface Config {
  ts?: boolean
  dirs?: Array<string>
  files?: Array<string>
}

export function parse(options: Config) {
  if (options.ts) {
    console.log(tsConfig())
  }
}
