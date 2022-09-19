declare const __VUEPRESS_SSR__: boolean

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>

declare module '~/data/anime.json' {
  import type { Anime } from './anime.d.js'

  let animeList: Anime[]
  export default animeList
}

declare module '~/data/artists.json' {
  import type { Artist } from './artist.d.js'

  let artists: Artist[]
  export default artists
}

declare module '~/data/countries.json' {
  import type { Country } from './country.d.js'

  let countries: Country[]
  export default countries
}

declare module '@csstools/postcss-oklab-function' {
  import type { PluginCreator } from 'postcss'

  let plugin: PluginCreator
  export default plugin
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
