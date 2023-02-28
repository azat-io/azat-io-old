import type { Post } from '../../data.js'
import type { ComputedRef } from 'vue'

import { useData } from 'vitepress'
import { computed } from 'vue'

import { usePosts } from '~/hooks/use-posts.js'

export let usePost = (): ComputedRef<{
  current: Post
  previous?: Post
  next?: Post
}> => {
  let { page } = useData()
  let posts = usePosts()
  let formattedPostList = computed(() => posts.value.reverse())
  let cleanPath = (path: string): string =>
    path.replace(/^\//, '').replace(/\.md$/, '')
  let currentPostIndex = computed(() =>
    formattedPostList.value.findIndex(
      ({ path }) => cleanPath(path) === cleanPath(page.value.relativePath),
    ),
  )
  return computed(() => ({
    current: formattedPostList.value[currentPostIndex.value],
    previous: formattedPostList.value[currentPostIndex.value - 1],
    next: formattedPostList.value[currentPostIndex.value + 1],
  }))
}
