import type { ParseError } from 'jsonc-parser'

import { parse as jsoncParse } from 'jsonc-parser'
import fs from 'fs/promises'
import https from 'https'
import path from 'path'

import { getDirname } from './theme/lib/get-dirname.js'

let dirname = getDirname(import.meta.url)

let themeUrl =
  'https://github.com/jdinhify/vscode-theme-gruvbox/blob/main/themes/gruvbox-dark-hard.json'

export let get = async (
  url: string,
  encoding: BufferEncoding = 'utf-8',
): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let { statusCode } = res
        if (statusCode !== 200) {
          reject(new Error('Request failed'))
        }

        res.setEncoding(encoding)
        if (encoding === 'utf-8') {
          let rawData = ''
          res.on('data', chunk => (rawData += chunk))
          res.on('end', () => {
            resolve(rawData)
          })
        } else if (encoding === 'binary') {
          let data: Uint8Array[] = []
          res.on('data', chunk => data.push(Buffer.from(chunk, 'binary')))
          res.on('end', () => {
            resolve(Buffer.concat(data).toString())
          })
          res.on('error', () => {
            reject(new Error('Get failed'))
          })
        }
      })
      .on('error', () => {
        reject(new Error('Get failed'))
      })
  })

let convertGHURLToDownloadURL = (ghURL: string): string => {
  let oldPath = new URL(ghURL).pathname
  return 'https://raw.githubusercontent.com' + oldPath.replace('/blob/', '/')
}

let parseJson = (jsonc: string): string => {
  let errors: ParseError[] = []
  let result = jsoncParse(jsonc, errors, { allowTrailingComma: true })
  if (errors.length) {
    throw errors[0]
  }
  return result
}

let targetUrl = convertGHURLToDownloadURL(themeUrl)

let content: string

try {
  content = await get(targetUrl)
} catch (e) {
  throw Error(`Failed to download theme from ${themeUrl}: ${e}`)
}

let contentObj = parseJson(content)

await fs.mkdir(path.join(dirname, '../theme'), { recursive: true })

await fs.writeFile(
  path.join(dirname, './theme/layout/gruvbox.json'),
  JSON.stringify(contentObj, null, 2),
)
