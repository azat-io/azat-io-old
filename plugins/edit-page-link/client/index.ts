import type { ComputedRef } from 'vue'

import { usePageData } from '@vuepress/client'
import { computed } from 'vue'

declare let __EDIT_PAGE_LINK_REPOSITORY__: string
declare let __EDIT_PAGE_CONTENT__: string
declare let __EDIT_PAGE_BRANCH__: string

export let useEditPageLink = (): ComputedRef<string> => {
  let page = usePageData()
  return computed(
    () =>
      `${__EDIT_PAGE_LINK_REPOSITORY__}/blob/${__EDIT_PAGE_BRANCH__}/${__EDIT_PAGE_CONTENT__}${page.value.path.replace(
        /\.html$/,
        '.md',
      )}`,
  )
}
