import readingTime from 'reading-time'
import removeMd from 'remove-markdown'
import matter from 'gray-matter'
import ISO6391 from 'iso-639-1'
import fs from 'fs/promises'
import path from 'path'

import { getDirname } from './theme/utils/get-dirname.js'

interface AvailableLanguage {
  languageName: string
  language: string
  path: string
}

export interface Post {
  availableLanguages: AvailableLanguage[]
  formattedDate: string
  readingTime: number
  language: string
  title: string
  date: Date
  path: string
}

interface PostFile {
  directory: string
  file: string
}

let dirname = getDirname(import.meta.url)

let baseDir = path.resolve(dirname, '../')

let getPost = async (
  file: string,
  postDir: string,
  appPages: PostFile[],
): Promise<Post> => {
  let fullPath = path.join(baseDir, postDir, file)

  let getLanguage = (filePath: string): string => filePath.substring(0, 2)
  let language = getLanguage(postDir)
  let src = await fs.readFile(fullPath, 'utf-8')
  let { data, content } = matter(src, { excerpt: true })
  let formatUrl = (filePath: string): string => filePath.replace(/\.md$/, '')

  let post: Post = {
    path: path.join('/', postDir, formatUrl(file)),
    title: data.title,
    date: data.date,
    readingTime: Math.ceil(readingTime(removeMd(content)).minutes),
    formattedDate: new Intl.DateTimeFormat(language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(data.date ?? Date.now())),
    availableLanguages: appPages.reduce<AvailableLanguage[]>(
      (accumulator, current) => {
        if (current.file === file && current.directory !== postDir) {
          let currentLanguage = getLanguage(current.directory)
          return [
            ...accumulator,
            {
              path: path.join('/', current.directory, formatUrl(current.file)),
              languageName: ISO6391.getNativeName(currentLanguage),
              language: currentLanguage,
            },
          ]
        }
        return accumulator
      },
      [],
    ),
    language,
  }

  return post
}

let load = async (): Promise<void> => {
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
    postsFiles.map(({ directory, file }) =>
      getPost(file, directory, postsFiles),
    ),
  )
  posts.sort((a, b) => b.date.getTime() - a.date.getTime())
  let tempDir = path.join(dirname, 'temp')
  try {
    await fs.stat(tempDir)
  } catch (error) {
    await fs.mkdir(tempDir, { recursive: true })
  }
  await fs.writeFile(path.join(tempDir, 'posts.json'), JSON.stringify(posts))
}

await load()
