import type { Plugin } from '@vuepress/core'

import { path } from '@vuepress/utils'

interface UmamiPluginOptions {
  id: string
  src: string
}

export let umamiPlugin =
  ({ id, src }: UmamiPluginOptions): Plugin =>
  app => {
    let plugin = {
      name: 'vuepress-umami',
    }

    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/index.ts'),

      define: {
        __UMAMI_ID__: id,
        __UMAMI_SRC__: src,
      },
    }
  }
