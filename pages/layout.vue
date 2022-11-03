<script lang="ts" setup>
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useEditPageLink } from 'vuepress-plugin-edit-page-link/client'
import { usePageFrontmatter, usePageLang } from '@vuepress/client'
import { usePost } from 'vuepress-plugin-posts/client'
import { computed } from 'vue'

import CoffeeCupIcon from '~/icons/coffee-cup.svg'
import Container from '~/components/container.vue'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Tag from '~/components/tag.vue'

let pageFrontmatter = usePageFrontmatter<{
  title: string
  date: string
  hero?: {
    avif: string
    webp: string
  }
}>()
let editPageLink = useEditPageLink()
let lang = usePageLang()
let post = usePost()
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
  Math.ceil((post.value.current?.readingTime ?? 0) / 5),
)
</script>

<template>
  <Header />
  <div :class="$style.hero">
    <Container :class="$style.container">
      <picture v-if="pageFrontmatter.hero">
        <source type="image/avif" :srcSet="pageFrontmatter.hero.avif" />
        <img
          :class="$style.image"
          :src="pageFrontmatter.hero.webp"
          :alt="pageFrontmatter.title"
          width="1512"
          height="720"
          draggable="false"
        />
      </picture>
    </Container>
  </div>
  <Container>
    <h1 :class="$style.title" v-text="pageFrontmatter.title" />
    <div :class="$style.info">
      <span :class="$style['info-text']" v-text="post.current?.formattedDate" />
      <span :class="$style['info-text']">
        <CoffeeCupIcon
          v-for="n in coffeeCups"
          :key="n"
          :class="{
            [$style.cup]: true,
            [$style['last-cup']]: n === coffeeCups,
          }"
        />
        {{
          post.current?.readingTime &&
          `${post.current.readingTime} ${
            t['minutes-to-read'][
              new Intl.PluralRules(lang).select(post.current.readingTime)
            ]
          }`
        }}
      </span>
    </div>
    <div
      v-if="post.current?.availableLanguages.length"
      :class="$style['available-languages']"
    >
      <p
        :class="$style['available-languages-title']"
        v-text="t['also-translated']"
      />
      <div :class="$style['available-languages-list']">
        <Tag
          v-for="{ path, language } in post.current.availableLanguages"
          :key="language"
          :to="path"
        >
          {{ language }}
        </Tag>
      </div>
    </div>
    <article :class="$style.article">
      <Content />
    </article>
    <a
      :href="editPageLink"
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
        <p :class="$style['post-title']" v-text="t['previous-post']" />
        <RouterLink :class="$style['post-link']" :to="post.previous.path">
          {{ post.previous.title }}
        </RouterLink>
      </div>
      <div v-if="post.next" :class="$style['post-next']">
        <p :class="$style['post-title']" v-text="t['next-post']" />
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
  background: oklch(75.7% 0.016 77.04);
}

.container {
  display: flex;
  min-height: clamp(11.5625rem, 0.3226rem + 47.957vw, 25.5rem);
  padding: 0;
}

.image {
  width: 100%;
  height: 100%;
  user-select: none;
}

.title {
  margin-block-end: var(--size-xs);
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-xs) var(--size-l);
  margin-block: var(--size-s) var(--size-m);
}

.info-text {
  display: flex;
  align-items: flex-start;
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  white-space: nowrap;
}

.cup {
  width: var(--size-s);
  height: var(--size-s);
  margin-inline-end: calc(var(--size-xxs) / 2);
}

.last-cup {
  margin-inline-end: var(--size-xs);
}

.available-languages {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-xs);
  padding: var(--size-s);
  margin-block-start: var(--size-m);
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--size-s);
}

.available-languages-list {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--size-s) - var(--size-xxs)) var(--size-s);
  align-items: center;
}

.available-languages-title {
  margin-block: 0;
  font-size: var(--font-size-xs);
  font-weight: normal;
  line-height: var(--line-height-xs);
}

.article {
  margin-block-start: var(--size-xl);
}

.edit-link {
  display: inline-block;
  margin-block-start: var(--size-m);
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
}

.post-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--size-s);
  margin-block-start: var(--size-m);
}

.post-title {
  margin-block-end: var(--size-xxs);
  font-size: var(--font-size-s);
  font-weight: normal;
  line-height: var(--line-height-s);
}

.post-link {
  padding-inline: 0;
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
