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

declare module '~/temp/posts.json' {
  import type { Post } from '../../data.js'

  let post: Post[]
  return posts
}
