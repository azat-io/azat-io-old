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
