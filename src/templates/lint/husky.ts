export default function (cmd: string) {
  return `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\n${cmd}`
}
