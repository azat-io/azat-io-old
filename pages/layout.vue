<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { usePageFrontmatter, usePageLang } from '@vuepress/client'
import { computed } from 'vue'

import { usePost } from '~/plugins/posts/client/index.js'
import Container from '~/components/container.vue'
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
  'edit-this-page': string
  'minutes-to-read': {
    [key: string]: string
  }
  'next-post': string
  'previous-post': string
}>()

let coffeeCups = computed(() =>
  Math.ceil((post.value.current.readingTime ?? 0) / 5),
)
</script>

<template>
  <Header />
  <picture v-if="pageFrontmatter.hero" :class="$style.hero">
    <source type="image/avif" :srcSet="pageFrontmatter.hero.avif" />
    <img
      :class="$style['hero-image']"
      :src="pageFrontmatter.hero.webp"
      :alt="pageFrontmatter.title"
      draggable="false"
    />
  </picture>
  <Container>
    <h1 :class="$style.title" v-text="pageFrontmatter.title" />
    <div :class="$style.info">
      <span :class="$style['info-text']" v-text="post.current.formattedDate" />
      <span :class="$style['info-text']">
        <CoffeeIcon
          v-for="n in coffeeCups"
          :key="n"
          :class="{ [$style['last-cup']]: n === coffeeCups }"
        />
        {{
          post.current.readingTime &&
          `${post.current.readingTime} ${
            t['minutes-to-read'][
              new Intl.PluralRules(lang).select(post.current.readingTime)
            ]
          }`
        }}
      </span>
    </div>
    <div
      v-if="post.current.availableLanguages.length"
      :class="$style['available-languages']"
    >
      <h4
        :class="$style['available-languages-title']"
        v-text="t['also-translated']"
      />
      <div :class="$style['available-languages-list']">
        <RouterLink
          v-for="{ path, language } in post.current.availableLanguages"
          :key="language"
          :class="$style.tag"
          :to="path"
        >
          {{ language }}
        </RouterLink>
      </div>
    </div>
    <article :class="$style.article">
      <Content />
    </article>
    <a
      :href="`https://github.com/azat-io/azat-io/edit/main/content${post.current.path}.md`"
      :class="$style['edit-link']"
      target="_blank"
      rel="noreferrer"
      v-text="t['edit-this-page']"
    />
    <div
      v-if="post.previous || post.next"
      :class="{
        [$style['post-list']]: true,
        [$style['post-list-only-next']]: !post.previous,
      }"
    >
      <div v-if="post.previous" :class="$style['post-previous']">
        <h5 :class="$style['post-title']" v-text="t['previous-post']" />
        <RouterLink :class="$style['post-link']" :to="post.previous.path">
          {{ post.previous.title }}
        </RouterLink>
      </div>
      <div v-if="post.next" :class="$style['post-next']">
        <h5 :class="$style['post-title']" v-text="t['next-post']" />
        <RouterLink :class="$style['post-link']" :to="post.next.path">
          {{ post.next.title }}
        </RouterLink>
      </div>
    </div>
  </Container>
  <Footer />
</template>

<style module>
.hero {
  display: block;
  height: clamp(20rem, 17rem + 10vw, 25rem);
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
  margin: var(--size-s) 0 var(--size-m);
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
  margin-top: var(--size-m);
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

.article {
  margin-top: var(--size-xl);
}

.edit-link {
  display: inline-block;
  margin-top: var(--size-m);
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
}

.post-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-s);
  margin-top: var(--size-m);
}

.post-title {
  margin: 0 0 var(--size-xxs);
  font-size: var(--font-size-s);
  font-weight: normal;
  line-height: var(--line-height-s);
}

.post-link {
  padding: 0;
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
}

@media (min-width: 480px) {
  .available-languages {
    grid-template-columns: auto 1fr;
    grid-gap: var(--size-s);
    padding: var(--size-s) var(--size-m);
  }
}

@media (min-width: 640px) {
  .post-list {
    grid-template-columns: 1fr 1fr;
  }

  .post-list-only-next {
    direction: rtl;
  }

  .post-next {
    text-align: right;
  }
}
</style>
