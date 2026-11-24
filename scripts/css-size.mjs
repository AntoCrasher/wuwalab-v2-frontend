import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MAX_LINES = 300

export function cssLines(path) {
  return readFileSync(path, 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '').length
}

export function cssOverLimit(path) {
  const lines = cssLines(path)
  return lines > MAX_LINES ? `${path}: ${lines} lines, the limit is ${MAX_LINES}` : null
}

function cssFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return cssFiles(path)
    return name.endsWith('.css') ? [path] : []
  })
}

if (process.argv[1]?.endsWith('css-size.mjs')) {
  const problems = cssFiles('src')
    .map(cssOverLimit)
    .filter((problem) => problem !== null)
  if (problems.length > 0) {
    console.error(problems.join('\n'))
    process.exit(1)
  }
}
