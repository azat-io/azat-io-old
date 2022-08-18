declare const __VUEPRESS_SSR__: boolean

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>

declare module '@temp/posts/data' {
  import type { Post } from '~/plugins/posts/typings/index.d.ts'

  export let posts: Post[]
}

declare module 'postcss-100vh-fix' {
  import { Plugin } from 'postcss'

  export default Plugin
}

declare module 'markdown-it-image-lazy-loading' {
  import { PluginSimple } from 'markdown-it'

  let plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-imsize' {
  import { PluginSimple } from 'markdown-it'

  let plugin: PluginSimple
  export default plugin
}

declare module '*.svg' {
  import type { DefineComponent } from 'vue'

  let component: DefineComponent
  export default component
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  let component: DefineComponent
  export default component
}
