<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

import TwitterIcon from '~/icons/twitter.svg'
import GithubIcon from '~/icons/github.svg'
import LockIcon from '~/icons/lock.svg'

let { theme } = useData()

let t = computed<{ 'pgp-info': string }>(() => theme.value.footer)

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
    <a
      :class="[$style.pgp, $style['icon-link']]"
      href="https://keybase.io/azat_io"
      :title="t['pgp-info']"
      target="_blank"
    >
      <LockIcon :class="[$style.icon, $style['lock-icon']]" />
      PGP: D04D B9EC D3B3 B4FC
    </a>
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
  flex-direction: column;
  gap: var(--size-m);
  align-items: center;
  justify-content: center;
  height: var(--footer-height);
  padding: var(--size-m) var(--size-s) var(--size-xl);
  border-block-start: solid var(--color-border-primary);
}

.lock-icon {
  display: none;
}

.pgp {
  display: flex;
  gap: var(--size-xs);
  align-items: flex-end;
  font-size: var(--font-size-xs);
  color: var(--color-content-primary);
}

.social-icons {
  display: flex;
  gap: var(--size-s);
}

.icon-link {
  display: flex;
  padding-inline: 0;
  color: var(--color-content-primary);
}

.icon-link:hover {
  color: var(--color-content-brand);
  background: transparent;
  transition: color 200ms;
}

.icon {
  width: var(--size-l);
  height: var(--size-l);
}

@media (width >= 480px) {
  .lock-icon {
    display: block;
  }

  .footer {
    flex-direction: row;
    justify-content: space-between;
    padding: var(--size-m) var(--size-m) var(--size-xl);
  }
}
</style>
