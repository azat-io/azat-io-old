<script lang="ts" setup>
import { useData } from 'vitepress'

import UiContainer from '~/ui/container.vue'
import UiWorldMap from '~/ui/world-map.vue'
import UiCountry from '~/ui/country.vue'

interface CountryType {
  name: string
  originName: string
  code: string
}

let { frontmatter } = useData()

let countries: CountryType[] = frontmatter.value.data
</script>

<script lang="ts">
export default {
  name: 'PageTravelMap',
}
</script>

<template>
  <ui-container size="l">
    <h1 :class="$style.title">Travel map</h1>
    <ui-world-map :visited="countries.map(({ code }) => code)" />
    <div :class="$style.list">
      <Suspense v-for="(country, index) in countries" :key="index">
        <ui-country v-bind="country" />
      </Suspense>
    </div>
  </ui-container>
</template>

<style module>
.title {
  margin-block-start: 0;
}

.list {
  display: grid;
  gap: var(--space-s);
  margin-block-start: var(--space-xl);
}

@media (width >= 540px) {
  .list {
    grid-template-rows: repeat(7, 1fr);
    grid-auto-flow: column;
  }
}

@media (width >= 960px) {
  .list {
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
  }
}
</style>
