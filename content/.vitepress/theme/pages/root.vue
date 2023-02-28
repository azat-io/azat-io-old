<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { onMounted } from 'vue'

let { go } = useRouter()

onMounted(() => {
  let isLang = (language: string | string[]): boolean => {
    let checkLang = (lang: string): boolean =>
      !!(window.navigator.language.indexOf(lang) + 1)
    if (typeof language === 'string') {
      return checkLang(language)
    }
    return language.some(lang => checkLang(lang))
  }
  if (isLang(['ru', 'uk', 'be'])) {
    go('/ru/')
  } else {
    go('/en/')
  }
})
</script>

<template>
  <div />
</template>
