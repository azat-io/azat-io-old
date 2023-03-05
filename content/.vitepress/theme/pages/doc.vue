<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

import CoffeeCupIcon from '~/icons/coffee-cup.svg'
import Container from '~/components/container.vue'
import { data as posts } from '~/posts.data.js'
import type { Post } from '~/posts.data.js'
import Tag from '~/components/tag.vue'

let { frontmatter, lang, theme, page } = useData()

let languagePosts = computed<Post[]>(() =>
  posts.filter(({ language }) => language === lang.value).reverse(),
)

let cleanPath = (path: string): string =>
  path.replace(/^\//, '').replace(/\.md$/, '')

let currentPostIndex = computed(() =>
  languagePosts.value.findIndex(
    ({ href }) => cleanPath(href) === cleanPath(page.value.relativePath),
  ),
)

let post = computed(() => ({
  current: languagePosts.value[currentPostIndex.value],
  previous: languagePosts.value[currentPostIndex.value - 1],
  next: languagePosts.value[currentPostIndex.value + 1],
}))

let t = computed<{
  'also-translated': string
  'edit-this-page': string
  'next-post': string
  'previous-post': string
  'minutes-to-read': { [key in Intl.LDMLPluralRule]: string }
}>(() => theme.value.doc)

let editPageLink = computed(
  () =>
    `https://github.com/azat-io/azat-io/blob/main/content${post.value.current.href}.md`,
)

let coffeeCups = computed(() =>
  Math.ceil((post.value.current.readingTime ?? 0) / 5),
)
</script>

<template>
  <div :class="$style.hero">
    <Container :class="$style.container">
      <picture v-if="frontmatter.hero">
        <source type="image/avif" :srcSet="frontmatter.hero.avif" />
        <img
          :class="$style.image"
          :src="frontmatter.hero.webp"
          :alt="frontmatter.title"
          width="1512"
          height="720"
          draggable="false"
        />
      </picture>
    </Container>
  </div>
  <Container>
    <h1 :class="$style.title" v-text="frontmatter.title" />
    <div :class="$style.info">
      <span :class="$style['info-text']" v-text="post.current?.date.string" />
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
          v-for="{ href, language, languageName } in post.current
            .availableLanguages"
          :key="language"
          :href="href"
        >
          {{ languageName }}
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
        <a :class="$style['post-link']" :href="post.previous.href">
          {{ post.previous.title }}
        </a>
      </div>
      <div v-if="post.next" :class="$style['post-next']">
        <p :class="$style['post-title']" v-text="t['next-post']" />
        <a :class="$style['post-link']" :href="post.next.href">
          {{ post.next.title }}
        </a>
      </div>
    </div>
  </Container>
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
  object-fit: cover;
  object-position: center bottom;
  user-select: none;
}

.title {
  margin-block-end: var(--space-xs);
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-l);
  margin-block: var(--space-s) var(--space-m);
}

.info-text {
  display: flex;
  align-items: end;
  font: var(--font-xs);
  line-height: 1;
  white-space: nowrap;
}

.cup {
  width: 16px;
  height: 16px;
  margin-inline-end: 2px;
}

.last-cup {
  margin-inline-end: var(--space-xs);
}

.available-languages {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-s);
  padding: var(--space-m);
  margin-block-start: var(--space-m);
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
}

.available-languages-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs) var(--space-s);
  align-items: center;
}

.available-languages-title {
  margin-block: 0;
  font: var(--font-xs);
  font-weight: normal;
}

.article {
  margin-block-start: var(--space-l);
}

.edit-link {
  display: inline-block;
  margin-block-start: var(--space-m);
  font: var(--font-s);
}

.post-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-s);
  margin-block-start: var(--space-m);
}

.post-title {
  margin-block-end: var(--space-2xs);
  font: var(--font-s);
}

.post-link {
  padding-inline: 0;
  font: var(--font-s);
}

@media (width >= 480px) {
  .available-languages {
    grid-template-columns: auto 1fr;
  }
}

@media (width >= 640px) {
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
