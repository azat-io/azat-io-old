import type { MarkdownRenderer } from 'vitepress'

import { createMarkdownRenderer } from 'vitepress'
import readingTime from 'reading-time'
import removeMd from 'remove-markdown'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import ISO6391 from 'iso-639-1'
import fs from 'fs/promises'
import path from 'path'

let md: MarkdownRenderer | null

const dirname = path.dirname(fileURLToPath(import.meta.url))
const baseDir = path.resolve(dirname, '../../')

interface AvailableLanguage {
  languageName: string
  language: string
  href: string
}

export interface Post {
  availableLanguages: AvailableLanguage[]
  title: string
  href: string
  date: {
    time: number
    string: string
  }
  language: string
  readingTime: number
}

interface PostFile {
  directory: string
  file: string
}

declare const data: Post[]
export { data }

let load = async (): Promise<Post[]> => {
  md = md || (await createMarkdownRenderer(process.cwd()))

  let ls = await fs.readdir(baseDir, { withFileTypes: true })
  let directories = ls.filter(dirent => dirent.isDirectory())
  let postsDirectories = directories.filter(({ name }) => name.length === 2)
  let postsFiles: PostFile[] = (
    await Promise.all(
      postsDirectories.map(async ({ name }) => {
        let directory = path.join(baseDir, name)
        let files = await fs.readdir(directory)
        return files.map(file => ({
          directory: name,
          file,
        }))
      }),
    )
  )
    .flat()
    .filter(({ file }) => file !== 'index.md')

  let posts = await Promise.all(
    postsFiles.map(({ file, directory }) =>
      getPost(file, directory, postsFiles),
    ),
  )
  return posts.sort((a, b) => b.date.time - a.date.time)
}

export default {
  watch: path.join(baseDir, '**/*.md'),
  load,
}

let cache = new Map()

let getPost = async (
  file: string,
  postDir: string,
  appPages: PostFile[],
): Promise<Post> => {
  let fullPath = path.join(baseDir, postDir, file)
  let timestamp = (await fs.stat(fullPath)).mtimeMs

  let cached = cache.get(fullPath)
  if (cached && timestamp === cached.timestamp) {
    return cached.post
  }

  let src = await fs.readFile(fullPath, 'utf-8')
  let { data: fileData, content } = matter(src, { excerpt: true })

  let getLanguage = (filePath: string): string => filePath.substring(0, 2)
  let formatUrl = (filePath: string): string => filePath.replace(/\.md$/, '')
  let language = getLanguage(postDir)

  let post: Post = {
    availableLanguages: appPages.reduce<AvailableLanguage[]>(
      (accumulator, current) => {
        if (current.file === file && current.directory !== postDir) {
          let currentLanguage = getLanguage(current.directory)
          return [
            ...accumulator,
            {
              href: path.join('/', current.directory, formatUrl(current.file)),
              languageName: ISO6391.getNativeName(currentLanguage),
              language: currentLanguage,
            },
          ]
        }
        return accumulator
      },
      [],
    ),
    readingTime: Math.ceil(readingTime(removeMd(content)).minutes),
    href: formatUrl(`/${postDir}/${file}`),
    date: formatDate(fileData.date, language),
    title: fileData.title,
    language,
  }

  cache.set(fullPath, {
    timestamp,
    post,
  })

  return post
}

let formatDate = (date: string | Date, language: string): Post['date'] => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
