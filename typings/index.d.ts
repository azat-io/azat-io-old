declare const __VUEPRESS_SSR__: boolean

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>

declare module '@temp/posts/data' {
  import type { Post } from '~/plugins/posts/typings/index.d.ts'

  export let posts: Post[]
}

declare module '~/data/countries.json' {
  interface Country {
    name: string
    originName: string
    code: string
  }

  let countries: Country[]
  export default countries
}

declare module 'postcss-100vh-fix' {
  import type { PluginCreator } from 'postcss'

  let plugin: PluginCreator
  export default plugin
}

declare module 'markdown-it-image-lazy-loading' {
  import type { PluginSimple } from 'markdown-it'

  let plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-imsize' {
  import type { PluginSimple } from 'markdown-it'

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
