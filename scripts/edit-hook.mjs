import { spawnSync } from 'node:child_process'
import { relative, resolve, sep } from 'node:path'
import { cssOverLimit } from './css-size.mjs'

function readStdin() {
  return new Promise((done) => {
    let text = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => (text += chunk))
    process.stdin.on('end', () => done(text))
  })
}

function fail(message) {
  console.error(`Size or nesting limit broken. Split the file before going on.\n${message}`)
  process.exit(2)
}

const payload = JSON.parse((await readStdin()) || '{}')
const file = payload?.tool_input?.file_path
if (typeof file !== 'string') process.exit(0)

const path = relative(process.cwd(), resolve(file)).split(sep).join('/')
if (!path.startsWith('src/')) process.exit(0)

if (path.endsWith('.css')) {
  const problem = cssOverLimit(path)
  if (problem !== null) fail(problem)
  process.exit(0)
}

if (/[.]tsx?$/.test(path)) {
  const run = spawnSync(process.execPath, ['node_modules/oxlint/bin/oxlint', path], { encoding: 'utf8' })
  if (run.status !== 0) fail(`${run.stdout}${run.stderr}`)
}
