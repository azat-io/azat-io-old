<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

import CoffeeCupIcon from '~/icons/coffee-cup.svg'
import Container from '~/components/container.vue'
import { usePost } from '~/hooks/use-post.js'
import Tag from '~/components/tag.vue'

let { frontmatter, lang, theme } = useData()
let post = usePost()

let t = computed<{
  'also-translated': string
  'next-post': string
  'previous-post': string
  'minutes-to-read': { [key in Intl.LDMLPluralRule]: string }
}>(() => theme.value.layout)

let coffeeCups = computed(() =>
  Math.ceil((post.value.current?.readingTime ?? 0) / 5),
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
          v-for="{ path, language, languageName } in post.current
            .availableLanguages"
          :key="language"
          :href="path"
        >
          {{ languageName }}
        </Tag>
      </div>
    </div>
    <article :class="$style.article">
      <Content />
    </article>
    <!-- <a
      :href="editPageLink"
      :class="$style['edit-link']"
      target="_blank"
      rel="noreferrer"
      v-text="t['edit-this-page']"
    /> -->
    <div
      v-if="post.previous || post.next"
      :class="{
        [$style['post-list']]: true,
        [$style['post-list-only-next']]: !post.previous,
      }"
    >
      <div v-if="post.previous" :class="$style['post-previous']">
        <p :class="$style['post-title']" v-text="t['previous-post']" />
        <a :class="$style['post-link']" :href="post.previous.path">
          {{ post.previous.title }}
        </a>
      </div>
      <div v-if="post.next" :class="$style['post-next']">
        <p :class="$style['post-title']" v-text="t['next-post']" />
        <a :class="$style['post-link']" :href="post.next.path">
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

@media (width >= 480px) {
  .available-languages {
    grid-template-columns: auto 1fr;
    grid-gap: var(--size-s);
    padding: var(--size-s) var(--size-m);
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
