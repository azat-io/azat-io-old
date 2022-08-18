import { defineClientConfig } from '@vuepress/client'

import Root from '~/pages/root.vue'
import Home from '~/pages/home.vue'
import '~/layout/colors.css'
import '~/layout/sizes.css'
import '~/layout/fonts.css'
import '~/layout/base.css'

export default defineClientConfig({
  enhance({ app, router }) {
    app.component('root', Root)
    app.component('home', Home)
    if (!__VUEPRESS_SSR__) {
      let isLang = (language: string | string[]): boolean => {
        let checkLang = (lang: string): boolean =>
          !!(window.navigator.language.indexOf(lang) + 1)
        if (typeof language === 'string') {
          return checkLang(language)
        }
        return language.some(lang => checkLang(lang))
      }
      router.beforeEach((to, _from, next) => {
        if (to.path === '/') {
          if (isLang(['ru', 'uk', 'be'])) {
            next('/ru')
          } else {
            next('/en')
          }
        } else {
          next()
        }
      })
    }
  },
})
