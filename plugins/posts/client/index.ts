import type { ComputedRef } from 'vue'

import { usePageLang, usePageData } from '@vuepress/client'
import { posts } from '@temp/posts/data'
import { ref, computed } from 'vue'

import { getLanguage } from '../shared/index.js'

export interface Post {
  availableLanguages: {
    language: string
    path: string
  }[]
  formattedDate: string
  date: string
  language: string
  path: string
  readingTime: number
  title: string
}

let postsMap = ref<Post[]>(posts)

export let usePosts = (): ComputedRef<Post[]> => {
  let lang = usePageLang()
  let language = computed(() => getLanguage(lang.value))
  return computed(() =>
    postsMap.value.filter(
      ({ language: currentLanguage }) => language.value === currentLanguage,
    ),
  )
}

export let usePost = (): ComputedRef<{
  current: Post
  previous: Post | undefined
  next: Post | undefined
}> => {
  let page = usePageData()
  let postList = usePosts()
  let formattedPostList = computed(() => postList.value.reverse())

  let currentPostIndex = computed(() =>
    formattedPostList.value.findIndex(
      ({ path }) =>
        path ===
        (page.value.path.endsWith('.html')
          ? page.value.path.slice(0, -5)
          : page.value.path),
    ),
  )
  return computed(() => ({
    current: formattedPostList.value[currentPostIndex.value],
    previous: formattedPostList.value[currentPostIndex.value - 1],
    next: formattedPostList.value[currentPostIndex.value + 1],
  }))
}

// @ts-ignore
if (import.meta.hot) {
  __VUE_HMR_RUNTIME__.updatePosts = (map: Post[]): void => {
    postsMap.value = map
  }
}
