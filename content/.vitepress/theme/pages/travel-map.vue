<script lang="ts" setup>
import { useData } from 'vitepress'

import UiTypography from '~/ui/typography.vue'
import UiContainer from '~/ui/container.vue'
import UiWorldMap from '~/ui/world-map.vue'
import UiFlag from '~/ui/flag.vue'

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
    <ui-typography color="brand" size="2xl" as="h1" bold>
      Travel map
    </ui-typography>
    <ui-world-map :visited="countries.map(({ code }) => code)" />
    <ul :class="$style.list">
      <li
        v-for="({ code, name, originName }, index) in countries"
        :key="index"
        :class="$style.item"
      >
        <ui-flag :code="code" />
        <div>
          <ui-typography size="s" color="brand">{{ name }}</ui-typography>
          <ui-typography size="2xs" color="primary">
            {{ originName }}
          </ui-typography>
        </div>
      </li>
    </ul>
  </ui-container>
</template>

<style module>
.list {
  display: grid;
  gap: var(--space-m) var(--space-s);
  padding-inline-start: 0;
  margin-block-start: var(--space-xl);
  list-style-type: none;
}

.item {
  display: flex;
  gap: var(--space-m);
  place-items: center;
  margin-block: 0;
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
