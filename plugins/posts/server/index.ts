import type { PluginFunction, App } from '@vuepress/core'

import readingTime from 'reading-time'
import { watch } from 'chokidar'
import ISO6391 from 'iso-639-1'

import { getLanguage } from '../shared/index.js'

const HMR_CODE = `
if (import.meta.hot) {
  import.meta.hot.accept(({ posts }) => {
    __VUE_HMR_RUNTIME__.updatePosts(posts)
  })
}
`

let preparePosts = async (app: App): Promise<void> => {
  let posts = app.pages
    .filter(({ frontmatter }) => !frontmatter.layout)
    .map(({ frontmatter, content, lang, slug, path }) => ({
      availableLanguages: app.pages
        .filter(
          ({ slug: currentSlug, path: currentPath }) =>
            currentSlug === slug && path !== currentPath,
        )
        .map(({ path: languagePagePath, htmlFilePathRelative }) => ({
          language: ISO6391.getNativeName(getLanguage(htmlFilePathRelative)),
          path: languagePagePath,
        })),
      formattedDate: new Intl.DateTimeFormat(lang, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(frontmatter.date ?? Date.now())),
      readingTime: Math.ceil(readingTime(content).minutes),
      language: getLanguage(lang),
      title: frontmatter.title!,
      date: frontmatter.date!,
      path,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  await app.writeTemp(
    'posts/data.js',
    `export let posts = ${JSON.stringify(posts)}\n${HMR_CODE}`,
  )
}

export let postsPlugin = (): PluginFunction => () => ({
  name: 'vuepress-posts',
  onPrepared: async app => {
    await preparePosts(app)
  },
  onWatched: (app, watchers) => {
    let postsWatcher = watch('**/*.js', {
      cwd: app.dir.temp(),
      ignoreInitial: true,
    })
    postsWatcher.on('add', () => {
      preparePosts(app)
    })
    postsWatcher.on('change', () => {
      preparePosts(app)
    })
    postsWatcher.on('unlink', () => {
      preparePosts(app)
    })
    watchers.push(postsWatcher)
  },
})
