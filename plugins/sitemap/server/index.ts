import type { Plugin } from '@vuepress/core'

import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'fs'

interface SitemapPluginOptions {
  hostname: string
}

export let sitemapPlugin =
  ({ hostname }: SitemapPluginOptions): Plugin =>
  () => ({
    name: 'vuepress-sitemap',
    onGenerated: async app => {
      let sitemap = new SitemapStream({
        hostname,
      })
      app.pages
        .filter(({ frontmatter }) => frontmatter.layout !== '404')
        .forEach(({ frontmatter, path }) => {
          sitemap.write({
            url: `${hostname}${path}`,
            priority: frontmatter.layout === 'home' ? 0.7 : 0.5,
            changefreq: 'daily',
          })
        })
      sitemap.end()
      let sitemapPath = app.dir.dest('sitemap.xml')
      let writeStream = createWriteStream(sitemapPath)
      sitemap.pipe(writeStream)
    },
  })
