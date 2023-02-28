<script lang="ts" setup>
import { onMounted } from 'vue'

import WorldMapSvg from '~/assets/world-map.svg'

interface Props {
  countries: string[]
}

let props = defineProps<Props>()

onMounted(() => {
  props.countries.forEach(country => {
    let element = document.getElementById(country)
    if (element) {
      element.style.fill = 'var(--color-background-brand)'
    }
  })
})
</script>

<template>
  <WorldMapSvg :class="$style.map" />
</template>

<style module>
.map {
  width: 100%;
  height: 100%;
}
</style>

<style>
.land {
  fill: var(--color-background-inverted);
  fill-opacity: 100%;
  stroke: var(--color-background-primary);
  stroke-opacity: 100%;
  stroke-width: 0.5;
}
</style>
