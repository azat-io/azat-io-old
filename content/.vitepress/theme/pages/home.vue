<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, computed } from 'vue'
import { useData } from 'vitepress'

import Container from '~/components/container.vue'
import { data as posts } from '~/posts.data.js'
import Hero from '~/components/hero.vue'

let { lang } = useData()

let languagePosts = computed(() =>
  posts.filter(({ language }) => language === lang.value),
)

onBeforeMount(() => {
  document.documentElement.classList.add('no-scroll')
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('no-scroll')
})
</script>

<template>
  <Hero />
  <Container>
    <div :class="$style.posts">
      <div v-for="{ title, href, date } in languagePosts" :key="title">
        <a :href="href" :class="$style.link">
          <h3 :class="$style.title" v-text="title" />
        </a>
        <span :class="$style.date" v-text="date.string" />
      </div>
    </div>
  </Container>
</template>

<style module>
.link {
  display: inline-block;
  padding-inline: 0;
  margin-bottom: var(--space-2xs);
  background: none;
}

.link:hover:not(.link:focus-visible) {
  background: inherit;
}

.posts {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-l);
}

.title {
  margin-block: 0;
  font: var(--font-m);
}

.date {
  display: block;
  font: var(--font-xs);
  color: var(--color-content-primary);
}
</style>
