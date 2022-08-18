import type { PluginFunction } from '@vuepress/core'

import { path } from '@vuepress/utils'

export let copyCodePlugin = (): PluginFunction => () => ({
  name: 'vuepress-copy-code',
  clientConfigFile: path.resolve(__dirname, '../client/index.ts'),
})
