declare module '*.svg' {
  let path: string
  export default path
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  let component: DefineComponent
  export default component
}
