<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

import IconCoffeeCup from '~/icons/coffee-cup.vue'
import { data as posts } from '~/posts.data.js'
import UiTypography from '~/ui/typography.vue'
import UiContainer from '~/ui/container.vue'
import type { Post } from '~/posts.data.js'
import UiHero from '~/ui/hero.vue'
import UiTag from '~/ui/tag.vue'

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

<script lang="ts">
export default {
  name: 'PageDoc',
}
</script>

<template>
  <ui-hero
    v-if="frontmatter.hero"
    :hero="frontmatter.hero"
    :title="frontmatter.title"
  />
  <ui-container>
    <ui-typography class="title" color="brand" size="2xl" as="h1" bold>
      {{ frontmatter.title }}
    </ui-typography>
    <div class="info">
      <ui-typography class="info-text" color="primary" size="xs">
        {{ post.current?.date.string }}
      </ui-typography>
      <ui-typography class="info-text" color="primary" size="xs">
        <icon-coffee-cup
          v-for="n in coffeeCups"
          :key="n"
          :class="[
            'cup',
            {
              ['last-cup']: n === coffeeCups,
            },
          ]"
        />
        {{
          post.current?.readingTime &&
          `${post.current.readingTime} ${
            t['minutes-to-read'][
              new Intl.PluralRules(lang).select(post.current.readingTime)
            ]
          }`
        }}
      </ui-typography>
    </div>
    <div
      v-if="post.current?.availableLanguages.length"
      class="available-languages"
    >
      <ui-typography color="primary" size="xs">
        {{ t['also-translated'] }}
      </ui-typography>
      <div class="available-languages-list">
        <ui-tag
          v-for="{ href, language, languageName } in post.current
            .availableLanguages"
          :key="language"
          :href="href"
        >
          {{ languageName }}
        </ui-tag>
      </div>
    </div>
    <article class="article">
      <Content />
    </article>
    <ui-typography color="primary" size="s">
      <a
        :href="editPageLink"
        class="post-link"
        target="_blank"
        rel="noreferrer"
        v-text="t['edit-this-page']"
      />
    </ui-typography>
    <div v-if="post.previous || post.next" class="post-list">
      <div v-if="post.previous">
        <ui-typography color="primary" size="s">
          {{ t['previous-post'] }}
        </ui-typography>
        <ui-typography color="primary" size="s">
          <a class="post-link" :href="post.previous.href">
            {{ post.previous.title }}
          </a>
        </ui-typography>
      </div>
      <div v-else />
      <div v-if="post.next" class="post-next">
        <ui-typography color="primary" size="s">
          {{ t['next-post'] }}
        </ui-typography>
        <ui-typography color="primary" size="s">
          <a class="post-link" :href="post.next.href">
            {{ post.next.title }}
          </a>
        </ui-typography>
      </div>
    </div>
  </ui-container>
</template>

<style scoped>
.title {
  margin-block: var(--space-l) var(--space-xs);
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
  line-height: 1;
  white-space: nowrap;
}

.cup {
  inline-size: 16px;
  block-size: 16px;
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

.article {
  margin-block: var(--space-l);
}

.post-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-s);
  margin-block-start: var(--space-m);
}

.post-link {
  padding-inline: 0;
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

  .post-next {
    text-align: end;
  }
}
</style>
