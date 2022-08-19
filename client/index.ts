import { defineClientConfig } from '@vuepress/client'

import Root from '~/pages/root.vue'
import Home from '~/pages/home.vue'
import '~/layout/colors.css'
import '~/layout/sizes.css'
import '~/layout/fonts.css'
import '~/layout/base.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('root', Root)
    app.component('home', Home)
  },
})
