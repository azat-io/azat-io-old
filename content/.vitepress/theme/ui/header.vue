<script lang="ts" setup>
import type { Directive } from 'vue'

import { watchEffect, shallowRef, computed, onMounted, watch, ref } from 'vue'
import { useData } from 'vitepress'

import IconLanguage from '~/icons/language.vue'
import UiTypography from '~/ui/typography.vue'
import UiFlag from '~/ui/flag.vue'
import UiLogo from '~/ui/logo.vue'

interface Props {
  transparent?: boolean
}

let props = withDefaults(defineProps<Props>(), {
  transparent: false,
})

let languageButton = shallowRef<HTMLElement>()
let header = shallowRef<HTMLElement>()

let { site, theme } = useData()

let title = computed(() => site.value.title)
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

let updating = ref(false)

onMounted(async () => {
  vClickAway.value = (await import('vue3-click-away')).directive

  watch(
    () => props.transparent,
    () => {
      if (props.transparent) {
        document.addEventListener('scroll', onScroll)
      }
      updating.value = true
      setTimeout(() => {
        updating.value = false
      }, 1000)
    },
  )
})
</script>

<script lang="ts">
export default {
  name: 'UiHeader',
}
</script>

<template>
  <header
    ref="header"
    :class="[
      [$style.header],
      {
        [$style.transparent]: props.transparent && onTop && !localePopupOpen,
        [$style.fixed]: props.transparent,
        [$style.updating]: updating,
      },
    ]"
  >
    <a :class="$style.title" :href="href === '/' ? '/en' : href">
      <ui-logo :class="$style.logo" />
      <ui-typography color="primary" size="m" bold>
        {{ title }}
      </ui-typography>
    </a>
    <button
      ref="languageButton"
      :class="$style.item"
      @click="toggleLocalePopup"
    >
      <icon-language :class="$style.icon" />
      {{ t.language }}
    </button>
    <Transition
      v-click-away="closeLocalePopup"
      :enter-active-class="$style['locale-list-enter']"
      :leave-active-class="$style['locale-list-leave']"
    >
      <ul v-if="localePopupOpen" :class="$style['locale-list']">
        <li
          v-for="{ path, code, name, originName } in locales"
          :key="code"
          :class="$style['locale-list-item']"
        >
          <a
            :class="$style['locale-item']"
            :href="path"
            @click="closeLocalePopup"
          >
            <ui-flag :code="code" />
            <div>
              <ui-typography size="s" color="brand">{{ name }}</ui-typography>
              <ui-typography size="2xs" color="primary">
                {{ originName }}
              </ui-typography>
            </div>
          </a>
        </li>
      </ul>
    </Transition>
  </header>
</template>

<style module>
.header {
  position: sticky;
  inset: 0 0 auto;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-inline-size: 320px;
  padding: var(--space-m);
  background: var(--color-background-primary);
  box-shadow: 0 1px 1px var(--color-border-primary);
  transition-property: background, box-shadow;
}

.transparent {
  background: transparent;
  box-shadow: none;
  transition-delay: 250ms;
  transition-duration: 250ms;
}

.fixed {
  position: fixed;
}

.updating {
  transition-delay: 0ms;
  transition-duration: 0ms;
}

.title {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  white-space: nowrap;
}

.title:hover {
  background: none;
}

.logo {
  block-size: 24px;
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
  inline-size: 20px;
  block-size: 20px;
}

.locale-list {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-end: var(--space-s);
  display: grid;
  grid-template-columns: 1fr;
  padding-block: var(--space-s);
  padding-inline-start: 0;
  margin-block: 0;
  list-style-type: none;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 0 0 8px 8px;
  transform-origin: top center;
}

.locale-list-item {
  margin-block: 0;
}

.locale-list-enter {
  animation: grow-down 250ms ease-in-out forwards;
}

.locale-list-leave {
  animation: grow-up 250ms ease-in-out forwards;
}

.locale-item {
  display: flex;
  gap: var(--space-m);
  place-items: center;
  padding: var(--space-xs) var(--space-l);
}

.locale-item:hover {
  background: inherit;
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
