<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { useData } from 'vitepress'

import Container from '~/components/container.vue'
import Country from '~/components/country.vue'

interface CountryType {
  name: string
  originName: string
  code: string
}

const WorldMap = defineAsyncComponent(
  () => import('~/components/world-map.vue'),
)

let { frontmatter } = useData()

let countries: CountryType[] = frontmatter.value.data
</script>

<template>
  <Container size="l">
    <h1 :class="$style.title">Travel map</h1>
    <WorldMap :countries="countries.map(({ code }) => code.toUpperCase())" />
    <div :class="$style.list">
      <Suspense v-for="(country, index) in countries" :key="index">
        <Country v-bind="country" />
      </Suspense>
    </div>
  </Container>
</template>

<style module>
.title {
  margin-block-start: 0;
}

.list {
  display: grid;
  grid-gap: var(--size-s);
  margin-block-start: var(--size-xxl);
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
