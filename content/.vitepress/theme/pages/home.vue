<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'

import Container from '~/components/container.vue'
import { usePosts } from '~/hooks/use-posts.js'
import Hero from '~/components/hero.vue'

let posts = usePosts()

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
      <div v-for="{ title, path, formattedDate } in posts" :key="title">
        <a :href="path" :class="$style.link">
          <h3 :class="$style.title" v-text="title" />
        </a>
        <span :class="$style.date" v-text="formattedDate" />
      </div>
    </div>
  </Container>
</template>

<style module>
.link {
  display: inline-block;
  padding-inline: 0;
  margin-bottom: var(--size-xxs);
  background: none;
}

.link:hover:not(.link:focus-visible) {
  background: inherit;
}

.posts {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--size-l);
}

.title {
  margin-block: 0;
  font-size: var(--font-size-m);
  font-weight: normal;
  line-height: var(--line-height-m);
}

.date {
  display: block;
  font-size: var(--font-size-xxs);
  line-height: var(--line-height-xxs);
  color: var(--color-content-primary);
}
</style>
