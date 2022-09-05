<script lang="ts" setup>
import { onMounted } from 'vue'

let WorldMapSvg = (await import('~/assets/world-map.svg')).default

interface Props {
  countries: string[]
}

let props = defineProps<Props>()

onMounted(() => {
  props.countries.forEach(country => {
    let element = document.getElementById(country)
    if (element) {
      element.style.fill = 'var(--color-brand)'
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
  fill: var(--color-text);
  fill-opacity: 100%;
  stroke: var(--color-primary);
  stroke-opacity: 100%;
  stroke-width: 0.5;
}

.visited-land {
  fill: var(--color-brand);
}
</style>
