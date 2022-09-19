import { defineClientConfig } from '@vuepress/client'

import TravelMap from '~/pages/travel-map.vue'
import NotFound from '~/pages/not-found.vue'
import Timeline from '~/pages/timeline.vue'
import Layout from '~/pages/layout.vue'
import Anime from '~/pages/anime.vue'
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

    'travel-map': TravelMap,
    timeline: Timeline,
    anime: Anime,
    root: Root,
    home: Home,
  },
})
