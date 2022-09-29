<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useSiteLocaleData, useRouteLocale } from '@vuepress/client'
import { directive as vClickAway } from 'vue3-click-away'
import { watchEffect, shallowRef, ref } from 'vue'

import LanguageIcon from '~/icons/language.svg'
import Country from '~/components/country.vue'
import Logo from '~/assets/logo.svg'

interface Props {
  transparent?: boolean
}

let props = withDefaults(defineProps<Props>(), {
  transparent: false,
})

let header = shallowRef<HTMLElement>()
let languageButton = shallowRef<HTMLElement>()

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

let toggleLocalePopup = () => {
  localePopupOpen.value = !localePopupOpen.value
}

let closeLocalePopup = (event: MouseEvent) => {
  if (!(event.type === 'touchstart' && event.target === languageButton.value)) {
    localePopupOpen.value = false
  }
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
      [$style.fixed]: props.transparent,
    }"
  >
    <RouterLink :class="$style.title" :to="route === '/' ? '/en' : route">
      <Logo :class="$style.logo" />
      {{ data.title }}
    </RouterLink>
    <button
      ref="languageButton"
      :class="$style.item"
      @click="toggleLocalePopup"
    >
      <LanguageIcon :class="$style.icon" />
      {{ t.language }}
    </button>
    <Transition
      v-click-away="closeLocalePopup"
      :enter-active-class="$style['locale-list-enter']"
      :leave-active-class="$style['locale-list-leave']"
    >
      <div v-if="localePopupOpen" :class="$style['locale-list']">
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
  position: sticky;
  inset: 0 0 auto 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 320px;
  padding: var(--size-s);
  background: var(--color-background-primary);
  border-color: var(--color-border-primary);
  border-style: solid;
  border-width: 0 0 1px;
  transition-duration: 250ms;
  transition-property: background, border-color;
}

.transparent {
  background: transparent;
  border-color: transparent;
  transition-delay: 250ms;
}

.fixed {
  position: fixed;
}

.title {
  display: flex;
  column-gap: 0.75rem;
  align-items: center;
  font-size: var(--font-size-l);
  font-weight: 700;
  line-height: var(--line-height-l);
  color: var(--color-content-primary);
  white-space: nowrap;
}

.title:hover {
  background: none;
}

.logo {
  height: calc(var(--size-m) - var(--size-xxs));
  color: var(--color-content-brand);
}

.item {
  display: grid;
  grid-template-columns: 20px auto;
  grid-gap: var(--size-xs);
  place-items: center;
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--color-content-primary);
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: var(--size-xxs);
  outline: none;
  transition-duration: 250ms;
  transition-property: background, box-shadow, color;
}

.item:hover {
  color: var(--color-content-brand);
}

.item:focus-visible {
  background: var(--color-background-overlay);
  box-shadow: 0 0 0 2px var(--color-border-brand);
}

.icon {
  width: 20px;
  height: 20px;
}

.locale-list {
  position: absolute;
  top: 100%;
  right: var(--size-m);
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 0 0 var(--size-xs) var(--size-xs);
  transform-origin: top center;
}

.locale-list-enter {
  animation: grow-down 250ms ease-in-out forwards;
}

.locale-list-leave {
  animation: grow-up 250ms ease-in-out forwards;
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
    padding: var(--size-s) var(--size-m);
  }

  .logo {
    height: var(--size-m);
  }
}
</style>
