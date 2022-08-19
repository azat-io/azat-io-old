<script lang="ts" setup>
import { useRouter } from 'vue-router'

let router = useRouter()

if (!__VUEPRESS_SSR__) {
  let isLang = (language: string | string[]): boolean => {
    let checkLang = (lang: string): boolean =>
      !!(window.navigator.language.indexOf(lang) + 1)
    if (typeof language === 'string') {
      return checkLang(language)
    }
    return language.some(lang => checkLang(lang))
  }
  if (isLang(['ru', 'uk', 'be'])) {
    router.push('/ru')
  } else {
    router.push('/en')
  }
}
</script>

<template>
  <div />
</template>
