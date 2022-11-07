import { defineClientConfig } from '@vuepress/client'
import { defineAsyncComponent } from 'vue'

import NotFound from '~/pages/not-found.vue'
import Layout from '~/pages/layout.vue'
import Root from '~/pages/root.vue'
import Home from '~/pages/home.vue'
import '~/layout/colors.css'
import '~/layout/sizes.css'
import '~/layout/fonts.css'
import '~/layout/base.css'
import '~/layout/code.css'

export default defineClientConfig({
  layouts: {
    NotFound,
    Layout,

    'travel-map': defineAsyncComponent(() => import('~/pages/travel-map.vue')),
    timeline: defineAsyncComponent(() => import('~/pages/timeline.vue')),
    anime: defineAsyncComponent(() => import('~/pages/anime.vue')),
    root: Root,
    home: Home,
  },
})
