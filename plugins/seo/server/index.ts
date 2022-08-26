import type { PluginFunction } from '@vuepress/core'

export let seoPlugin = (): PluginFunction => () => ({
  name: 'vuepress-seo',
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
      { property: 'og:url', content: `https://azat.io${page.path}` },
    ])
    if (page.frontmatter.preview) {
      head.push([
        'meta',
        { property: 'og:image', content: page.frontmatter.preview as string },
      ])
    } else {
      head.push([
        'meta',
        { property: 'og:image', content: '/assets/hero-preview.png' },
      ])
    }
    if (page.title) {
      head.push(['meta', { name: 'twitter:title', content: page.title }])
    }
    if (page.frontmatter.description) {
      head.push([
        'meta',
        { name: 'twitter:description', content: page.frontmatter.description },
      ])
    }
    if (page.frontmatter.preview) {
      head.push([
        'meta',
        { name: 'twitter:image', content: page.frontmatter.preview as string },
      ])
    } else {
      head.push([
        'meta',
        { name: 'twitter:image', content: '/assets/hero-preview.png' },
      ])
    }
    head.push(['meta', { name: 'twitter:card', content: 'summary' }])
    head.push(['meta', { name: 'twitter:site', content: '@azat_io' }])
    page.frontmatter.head = head
  },
})
