<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import { usePageFrontmatter, usePageLang } from '@vuepress/client'
import { computed } from 'vue'

import Container from '~/components/container.vue'
import { usePost } from '~/plugins/posts/client'
import { formatDate } from '~/lib/format-date'
import CoffeeIcon from '~/assets/coffee.svg'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'

let lang = usePageLang()
let post = usePost()
let pageFrontmatter = usePageFrontmatter<{
  title: string
  date: string
  hero?: {
    avif: string
    webp: string
  }
}>()
let t = useThemeLocaleData<{
  'also-translated': string
  'minutes-to-read': {
    [key: string]: string
  }
}>()

let coffeeCups = computed(() => Math.ceil((post.value.readingTime ?? 0) / 5))
</script>

<template>
  <main :class="$style.main">
    <Header />
    <picture v-if="pageFrontmatter.hero" :class="$style.hero">
      <source type="image/avif" :srcSet="pageFrontmatter.hero.avif" />
      <img
        :class="$style['hero-image']"
        :src="pageFrontmatter.hero.webp"
        :alt="pageFrontmatter.title"
        draggable="false"
        loading="lazy"
      />
    </picture>
    <Container as="article">
      <h1 :class="$style.title" v-text="pageFrontmatter.title" />
      <div :class="$style.info">
        <span
          :class="$style['info-text']"
          v-text="formatDate(lang, pageFrontmatter.date!)"
        />
        <span :class="$style['info-text']">
          <CoffeeIcon
            v-for="n in coffeeCups"
            :key="n"
            :class="{ [$style['last-cup']]: n === coffeeCups }"
          />
          {{
            post?.readingTime &&
            `${post.readingTime} ${
              t['minutes-to-read'][
                new Intl.PluralRules(lang).select(post.readingTime)
              ]
            }`
          }}
        </span>
      </div>
      <div
        v-if="post.availableLanguages.length"
        :class="$style['available-languages']"
      >
        <h4
          :class="$style['available-languages-title']"
          v-text="t['also-translated']"
        />
        <div :class="$style['available-languages-list']">
          <RouterLink
            v-for="{ path, language } in post.availableLanguages"
            :key="language"
            :class="$style.tag"
            :to="path"
          >
            {{ language }}
          </RouterLink>
        </div>
      </div>
      <Content />
    </Container>
    <Footer />
  </main>
</template>

<style module>
.main {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.hero {
  display: block;
  height: clamp(20rem, 17rem + 10vw, 25rem);
  margin-top: var(--size-header);
  user-select: none;
  background: oklch(76.69% 0.016 90);
}

.hero-image {
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}

.title {
  margin-bottom: var(--size-xs);
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-xs) var(--size-l);
  margin: var(--size-m) 0;
}

.info-text {
  display: flex;
  align-items: center;
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  white-space: nowrap;
}

.last-cup {
  margin-right: var(--size-xs);
}

.available-languages {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-xs);
  padding: var(--size-s);
  background: var(--color-inverse);
  border: 1px solid var(--color-tertiary);
  border-radius: var(--size-s);
}

.available-languages-list {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--size-s) - var(--size-xxs)) var(--size-s);
  align-items: center;
}

.available-languages-title {
  margin: 0;
  font-size: var(--font-size-xs);
  font-weight: normal;
  line-height: var(--line-height-xs);
}

.tag {
  padding: 0 var(--size-xs);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-primary);
  white-space: nowrap;
  background: var(--color-brand);
  border-radius: var(--size-s);
  transition: all 300ms;
}

.tag:hover {
  background: var(--color-brand-hover);
}

.tag:focus-visible {
  background: var(--color-brand-hover);
  box-shadow: 0 0 0 2px var(--color-brand);
}

@media (min-width: 480px) {
  .available-languages {
    grid-template-columns: auto 1fr;
    grid-gap: var(--size-s);
    padding: var(--size-s) var(--size-m);
  }
}
</style>
