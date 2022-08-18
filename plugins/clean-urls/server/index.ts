import type { PluginFunction } from '@vuepress/core'

export let cleanUrlsPlugin = (): PluginFunction => () => ({
  name: 'vuepress-clean-urls',
  extendsPage: page => {
    let { path, frontmatter = {} } = page
    if (frontmatter.permalink) return
    if (path === '/404.html') {
      page.path = '/404.html'
    } else if (path.endsWith('.html')) {
      page.path = path.slice(0, -5) + ''
    } else if (path.endsWith('/')) {
      page.path = path.slice(0, -1) + '/'
    }
  },
})
