<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import { useSiteLocaleData, useRouteLocale } from '@vuepress/client'
import { directive as vClickAway } from 'vue3-click-away'
import { watchEffect, shallowRef, ref } from 'vue'

import LanguageIcon from '~/assets/language.svg'
import Country from '~/components/country.vue'
import Logo from '~/assets/logo.svg'

interface Props {
  transparent?: boolean
}

let props = withDefaults(defineProps<Props>(), {
  transparent: false,
})

let header = shallowRef<HTMLElement>()

let data = useSiteLocaleData()
let route = useRouteLocale()
let t = useThemeLocaleData<{
  language: string
  languages: {
    en: string
    ru: string
  }
}>()

let locales = shallowRef<
  {
    code: string
    name: string
    originName: string
    path: string
  }[]
>([])

let localePopupOpen = ref(false)

let onTop = ref(true)

let openLocalePopup = () => {
  if (!localePopupOpen.value) {
    localePopupOpen.value = true
  }
}

let closeLocalePopup = () => {
  localePopupOpen.value = false
}

let onScroll = () => {
  onTop.value =
    window?.scrollY < (header.value?.getBoundingClientRect().height ?? 0)
}

watchEffect(() => {
  locales.value = [
    {
      code: 'us',
      name: t.value.languages.en,
      originName: 'English',
      path: '/en',
    },
    {
      code: 'ru',
      name: t.value.languages.ru,
      originName: 'Русский',
      path: '/ru',
    },
  ]
})

watchEffect(() => {
  if (!__VUEPRESS_SSR__ && props.transparent) {
    document.addEventListener('scroll', onScroll)
  }
})
</script>

<template>
  <header
    ref="header"
    :class="{
      [$style.header]: true,
      [$style.transparent]: props.transparent && onTop && !localePopupOpen,
    }"
  >
    <RouterLink :class="$style.title" :to="route === '/' ? '/en' : route">
      <Logo :class="$style.logo" />
      {{ data.title }}
    </RouterLink>
    <button :class="$style.item" @click="openLocalePopup">
      <LanguageIcon :class="$style.icon" />
      {{ t.language }}
    </button>
    <Transition
      :enter-active-class="$style['locale-list-enter']"
      :leave-active-class="$style['locale-list-leave']"
    >
      <div
        v-if="localePopupOpen"
        v-click-away="closeLocalePopup"
        :class="$style['locale-list']"
      >
        <RouterLink
          v-for="{ path, ...locale } in locales"
          :key="path"
          :class="$style['locale-item']"
          :to="path"
          @click="closeLocalePopup"
        >
          <Suspense>
            <Country :class="$style.country" v-bind="locale" />
          </Suspense>
        </RouterLink>
      </div>
    </Transition>
  </header>
</template>

<style module>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 320px;
  height: var(--size-header);
  padding: 0 var(--size-s);
  background: var(--color-primary);
  border-bottom: 1px solid var(--color-tertiary);
  transition: all 250ms;
  will-change: background, border-color;
}

.transparent {
  background: transparent;
  border-color: transparent;
  transition-delay: 250ms;
}

.title {
  display: flex;
  column-gap: 0.75rem;
  align-items: center;
  font-size: var(--font-size-l);
  font-weight: 700;
  line-height: var(--line-height-l);
  color: var(--color-text);
}

.title:hover {
  background: none;
}

.logo {
  height: var(--size-m);
  color: var(--color-brand);
}

.item {
  display: flex;
  column-gap: var(--size-xs);
  align-items: center;
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--color-text);
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: var(--size-xxs);
  outline: none;
  transition: all 250ms;
  will-change: background, box-shadow, color;
}

.item:hover {
  color: var(--color-brand);
}

.item:focus-visible {
  background: var(--color-brand-overlay);
  box-shadow: 0 0 0 2px var(--color-brand);
}

.icon {
  width: 20px;
  height: 20px;
}

.locale-list {
  position: absolute;
  top: var(--size-header);
  right: var(--size-m);
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-primary);
  border: 1px solid var(--color-tertiary);
  border-radius: 0 0 var(--size-xs) var(--size-xs);
  transform-origin: top center;
}

.locale-list-enter {
  animation: grow-down 250ms ease-in-out forwards;
}

.locale-list-leave {
  animation: grow-up 250ms ease-in-out forwards;
}

.locale-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}

.locale-item:hover {
  background: inherit;
}

.country {
  padding: var(--size-xs) var(--size-m);
}

.locale-item:first-child .country {
  margin-top: var(--size-s);
}

.locale-item:last-child .country {
  margin-bottom: var(--size-s);
}

@keyframes grow-down {
  0% {
    transform: scaleY(0);
  }

  80% {
    transform: scaleY(1.1);
  }

  100% {
    transform: scaleY(1);
  }
}

@keyframes grow-up {
  0% {
    transform: scaleY(1);
  }

  20% {
    transform: scaleY(1.1);
  }

  100% {
    transform: scaleY(0);
  }
}

@media (min-width: 480px) {
  .header {
    padding: 0 var(--size-m);
  }
}
</style>
