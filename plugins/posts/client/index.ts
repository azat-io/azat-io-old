import type { Post } from '../typings/index.d'
import type { ComputedRef } from 'vue'

import { usePageLang, usePageData } from '@vuepress/client'
import { posts } from '@temp/posts/data'
import { ref, computed } from 'vue'

import { getLanguage } from '../shared'

let postsMap = ref(posts)

export let usePosts = (): ComputedRef<Post[]> => {
  let lang = usePageLang()
  let language = computed(() => getLanguage(lang.value))
  return computed(() =>
    postsMap.value.filter(
      ({ language: currentLanguage }) => language.value === currentLanguage,
    ),
  )
}

export let usePost = (): ComputedRef<Post> => {
  let page = usePageData()
  return computed(() =>
    postsMap.value.find(
      ({ path }) =>
        path ===
        (page.value.path.endsWith('.html')
          ? page.value.path.slice(0, -5)
          : page.value.path),
    ),
  )
}

// @ts-ignore
if (import.meta.hot) {
  __VUE_HMR_RUNTIME__.updatePosts = (map: Post[]): void => {
    postsMap.value = map
  }
}
