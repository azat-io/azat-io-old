<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { useData } from 'vitepress'

import PageNotFound from '~/pages/not-found.vue'
import PageRoot from '~/pages/root.vue'
import PageHome from '~/pages/home.vue'
import UiHeader from '~/ui/header.vue'
import UiFooter from '~/ui/footer.vue'
import PageDoc from '~/pages/doc.vue'

let { frontmatter, page } = useData()

let PageTravelMap = defineAsyncComponent(() => import('~/pages/travel-map.vue'))
let PageTimeline = defineAsyncComponent(() => import('~/pages/timeline.vue'))
let PageAnime = defineAsyncComponent(() => import('~/pages/anime.vue'))
</script>

<script lang="ts">
export default {
  name: 'AppLayout',
}
</script>

<template>
  <ui-header :transparent="frontmatter.layout === 'home'" />
  <page-not-found v-if="page.isNotFound" />
  <page-root v-else-if="frontmatter.layout === 'root'" />
  <page-home v-else-if="frontmatter.layout === 'home'" />
  <page-anime v-else-if="frontmatter.layout === 'anime'" />
  <page-timeline v-else-if="frontmatter.layout === 'timeline'" />
  <page-travel-map v-else-if="frontmatter.layout === 'travel-map'" />
  <page-doc v-else />
  <ui-footer />
</template>
