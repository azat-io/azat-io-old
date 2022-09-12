<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

import TwitterIcon from '~/assets/twitter.svg'
import GithubIcon from '~/assets/github.svg'
import Heart from '~/assets/heart.svg'

let t = useThemeLocaleData<{
  'made-with': string
}>()

let socialIcons = [
  {
    name: 'Twitter',
    icon: TwitterIcon,
    url: 'https://twitter.com/azat_io',
  },
  {
    name: 'GitHub',
    icon: GithubIcon,
    url: 'https://github.com/azat-io',
  },
]
</script>

<template>
  <footer :class="$style.footer">
    <span :class="$style.disclaimer" aria-hidden="true">
      {{ t['made-with'] }}
      <Heart :class="$style.heart" />
    </span>
    <div :class="$style['social-icons']">
      <a
        v-for="{ name, icon, url } in socialIcons"
        :key="name"
        :class="$style['icon-link']"
        :href="url"
        target="_blank"
        rel="noreferrer"
        aria-label="Github"
      >
        <component :is="icon" :class="$style.icon" />
      </a>
    </div>
  </footer>
</template>

<style module>
.footer {
  position: sticky;
  top: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--footer-height);
  padding: var(--size-m) var(--size-s) var(--size-xl);
  border-top: 1px solid var(--color-tertiary);
}

.disclaimer {
  display: none;
}

.social-icons {
  display: flex;
  column-gap: var(--size-s);
}

.icon-link {
  display: flex;
  padding: 0;
  color: var(--color-text);
}

.icon-link:hover {
  color: var(--color-brand);
  background: transparent;
  transition: color 200ms;
}

.icon {
  width: var(--size-l);
  height: var(--size-l);
}

@media (min-width: 480px) {
  .footer {
    justify-content: space-between;
    padding: var(--size-m) var(--size-m) var(--size-xl);
  }

  .disclaimer {
    display: flex;
    column-gap: var(--size-xxs);
    align-items: center;
    font-size: 0.85rem;
    line-height: 0.85rem;
  }

  .heart {
    width: 16px;
    color: oklch(65.97% 0.218 30.39);
  }
}
</style>
