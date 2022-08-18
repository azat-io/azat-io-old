import type { ParseError } from 'jsonc-parser'

import { parse as jsoncParse } from 'jsonc-parser'
import { writeFileSync, mkdir } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

let themeUrl =
  'https://github.com/jdinhify/vscode-theme-gruvbox/blob/main/themes/gruvbox-dark-hard.json'

let __filename = fileURLToPath(import.meta.url)

let __dirname = dirname(__filename)

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
            try {
              resolve(rawData)
            } catch (e) {
              reject(new Error('Get failed'))
            }
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

mkdir(join(__dirname, '../theme'), { recursive: true }, error => {
  if (error) throw error
})

writeFileSync(
  join(__dirname, '../theme/gruvbox.json'),
  JSON.stringify(contentObj, null, 2),
)
