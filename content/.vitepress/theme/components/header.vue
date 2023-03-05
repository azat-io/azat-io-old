<script lang="ts" setup>
import type { Directive } from 'vue'

import { watchEffect, shallowRef, computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

import LanguageIcon from '~/icons/language.svg'
import Country from '~/components/country.vue'
import Logo from '~/assets/logo.svg'

interface Props {
  transparent?: boolean
}

let props = withDefaults(defineProps<Props>(), {
  transparent: false,
})

let languageButton = shallowRef<HTMLElement>()
let header = shallowRef<HTMLElement>()

let { site, theme } = useData()

let name = computed(() => site.value.title)
let lang = computed(() => site.value.localeIndex)
let href = computed(() => site.value.locales[lang.value!].link)

let t = computed<{ language: string; en: string; ru: string }>(
  () => theme.value.header,
)

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
let scrolled = ref(false)

let toggleLocalePopup = () => {
  localePopupOpen.value = !localePopupOpen.value
}

let closeLocalePopup = (event: MouseEvent) => {
  if (!(event.type === 'touchstart' && event.target === languageButton.value)) {
    localePopupOpen.value = false
  }
}

let onScroll = () => {
  scrolled.value = true
  onTop.value =
    window?.scrollY < (header.value?.getBoundingClientRect().height ?? 0)
}

watchEffect(() => {
  scrolled.value = false
  locales.value = [
    {
      code: 'us',
      name: t.value.en,
      originName: 'English',
      path: site.value.locales.root.link!,
    },
    {
      code: 'ru',
      name: t.value.ru,
      originName: 'Русский',
      path: site.value.locales.ru.link!,
    },
  ]
})

let vClickAway = ref<Directive>(() => () => {})

onMounted(async () => {
  vClickAway.value = (await import('vue3-click-away')).directive

  watchEffect(() => {
    if (props.transparent) {
      document.addEventListener('scroll', onScroll)
    }
  })
})
</script>

<template>
  <header
    ref="header"
    :class="[
      [$style.header],
      {
        [$style.transparent]: props.transparent && onTop && !localePopupOpen,
        [$style['on-top']]: props.transparent && onTop && scrolled,
        [$style.fixed]: props.transparent,
      },
    ]"
  >
    <a :class="$style.title" :href="href === '/' ? '/en' : href">
      <Logo :class="$style.logo" />
      {{ name }}
    </a>
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
        <a
          v-for="{ path, ...locale } in locales"
          :key="path"
          :class="$style['locale-item']"
          :href="path"
          @click="closeLocalePopup"
        >
          <Suspense>
            <Country :class="$style.country" v-bind="locale" />
          </Suspense>
        </a>
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
  padding: var(--space-m);
  background: var(--color-background-primary);
  box-shadow: 0 1px 1px var(--color-border-primary);
  transition-duration: 250ms;
  transition-property: background, box-shadow;
}

.transparent {
  background: transparent;
  box-shadow: none;
  transition-duration: 0ms;
}

.on-top {
  transition-delay: 250ms;
  transition-duration: 250ms;
}

.fixed {
  position: fixed;
}

.title {
  display: flex;
  column-gap: 0.75rem;
  align-items: center;
  font: var(--font-m);
  font-weight: 700;
  color: var(--color-content-primary);
  white-space: nowrap;
}

.title:hover {
  background: none;
}

.logo {
  height: 24px;
  color: var(--color-content-brand);
}

.item {
  display: grid;
  grid-template-columns: 20px auto;
  gap: var(--space-xs);
  place-items: center;
  font: var(--font-s);
  color: var(--color-content-primary);
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: 4px;
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
  right: var(--space-s);
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 0 0 8px 8px;
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
  padding: var(--space-xs) var(--space-m);
}

.locale-item:first-child .country {
  margin-block-start: var(--space-s);
}

.locale-item:last-child .country {
  margin-block-end: var(--space-s);
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
</style>
