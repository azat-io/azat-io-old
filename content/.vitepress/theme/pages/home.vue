<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, computed } from 'vue'
import { useData } from 'vitepress'

import { data as posts } from '~/posts.data.js'
import UiTypography from '~/ui/typography.vue'
import UiContainer from '~/ui/container.vue'
import UiBanner from '~/ui/banner.vue'

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

<script lang="ts">
export default {
  name: 'PageHome',
}
</script>

<template>
  <ui-banner />
  <ui-container>
    <ul class="posts">
      <li
        v-for="{ title, href, date } in languagePosts"
        :key="title"
        class="post"
      >
        <a :href="href" class="link">
          <ui-typography color="brand" size="m" as="h3">
            {{ title }}
          </ui-typography>
        </a>
        <ui-typography color="primary" size="xs">
          {{ date.string }}
        </ui-typography>
      </li>
    </ul>
  </ui-container>
</template>

<style scoped>
.link {
  display: inline-block;
  padding-inline: 0;
  margin-block-end: var(--space-2xs);
  background: none;
}

.link:hover:not(.link:focus-visible) {
  background: inherit;
}

.posts {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-l);
  padding-inline-start: 0;
  margin-block: 0;
  list-style-type: none;
}

.post {
  margin-block: 0;
}
</style>
