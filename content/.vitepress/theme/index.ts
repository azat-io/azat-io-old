import type { Theme } from 'vitepress'

import NotFound from '~/pages/not-found.vue'
import Layout from '~/layout.vue'
import '~/layout/colors.css'
import '~/layout/spaces.css'
import '~/layout/fonts.css'
import '~/layout/base.css'
import '~/layout/code.css'

let theme: Theme = {
  NotFound,
  Layout,
}

export default theme
