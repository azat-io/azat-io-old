import type { PluginFunction } from '@vuepress/core'

import { getDirname, path } from '@vuepress/utils'

let __dirname = getDirname(import.meta.url)

export let copyCodeButtonPlugin = (): PluginFunction => () => ({
  name: 'vuepress-plugin-copy-code-button',
  clientConfigFile: path.resolve(__dirname, '../client/index.js'),
})
