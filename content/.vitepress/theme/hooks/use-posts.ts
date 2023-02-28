import type { Post } from '../../data.js'
import type { ComputedRef } from 'vue'

import { useData } from 'vitepress'
import { computed, ref } from 'vue'

import posts from '~/temp/posts.json'

let postsMap = ref(posts as unknown as Post[])

export let usePosts = (): ComputedRef<Post[]> => {
  let { lang } = useData()
  return computed(() =>
    postsMap.value.filter(
      ({ language: currentLanguage }) => lang.value === currentLanguage,
    ),
  )
}
