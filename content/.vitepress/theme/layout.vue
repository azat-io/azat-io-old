<script lang="ts" setup>
import { useRoute, useData } from 'vitepress'
import { inject } from 'vue'

import TavelMap from '~/pages/travel-map.vue'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Timeline from '~/pages/timeline.vue'
import Anime from '~/pages/anime.vue'
import Root from '~/pages/root.vue'
import Home from '~/pages/home.vue'
import Doc from '~/pages/doc.vue'

let route = useRoute()
let { frontmatter } = useData()

let NotFound = inject('NotFound')
</script>

<template>
  <Header :transparent="frontmatter.layout === 'home'" />
  <NotFound v-if="route.component === NotFound" />
  <Root v-else-if="frontmatter.layout === 'root'" />
  <Home v-else-if="frontmatter.layout === 'home'" />
  <Anime v-else-if="frontmatter.layout === 'anime'" />
  <Timeline v-else-if="frontmatter.layout === 'timeline'" />
  <TavelMap v-else-if="frontmatter.layout === 'travel-map'" />
  <Doc v-else />
  <Footer />
</template>
