import type { Plugin } from '@vuepress/core'

interface OpenGraphPluginOptions {
  host: string
  defaultImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
  twitterSite?: string
}

export let openGraphPlugin =
  ({
    defaultImage,
    twitterCard = 'summary',
    twitterSite,
    host,
  }: OpenGraphPluginOptions): Plugin =>
  () => ({
    name: 'vuepress-plugin-open-graph',
    extendsPage: page => {
      let head = page.frontmatter.head || []
      head.push(['meta', { property: 'og:locale', content: page.lang }])
      if (page.title) {
        head.push(['meta', { property: 'og:title', content: page.title }])
      }
      if (page.frontmatter.description) {
        head.push([
          'meta',
          { property: 'og:description', content: page.frontmatter.description },
        ])
      }
      if (!page.frontmatter.layout) {
        head.push(['meta', { property: 'og:type', content: 'article' }])
        head.push([
          'meta',
          {
            property: 'article:published_time',
            content: new Date(page.frontmatter.date!).toISOString(),
          },
        ])
      }
      head.push([
        'meta',
        { property: 'og:url', content: `${host}${page.path}` },
      ])
      if (page.frontmatter.image) {
        head.push([
          'meta',
          { property: 'og:image', content: page.frontmatter.image as string },
        ])
      } else if (defaultImage) {
        head.push(['meta', { property: 'og:image', content: defaultImage }])
      }
      if (page.title) {
        head.push(['meta', { name: 'twitter:title', content: page.title }])
      }
      if (page.frontmatter.description) {
        head.push([
          'meta',
          {
            name: 'twitter:description',
            content: page.frontmatter.description,
          },
        ])
      }
      if (page.frontmatter.image) {
        head.push([
          'meta',
          {
            name: 'twitter:image',
            content: page.frontmatter.image as string,
          },
        ])
      } else {
        head.push([
          'meta',
          { name: 'twitter:image', content: '/assets/hero-preview.png' },
        ])
      }
      head.push(['meta', { name: 'twitter:card', content: twitterCard }])
      if (twitterSite) {
        head.push(['meta', { name: 'twitter:site', content: twitterSite }])
      }
      page.frontmatter.head = head
    },
  })
