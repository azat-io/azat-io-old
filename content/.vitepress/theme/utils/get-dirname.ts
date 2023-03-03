import { fileURLToPath } from 'url'
import path from 'path'

export let getDirname = (importMetaUrl: string): string =>
  path.dirname(fileURLToPath(importMetaUrl))
