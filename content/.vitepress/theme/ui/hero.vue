<script lang="ts" setup>
import UiContainer from '~/ui/container.vue'

interface Props {
  title: string
  hero: {
    mobile: {
      avif: string
      webp: string
    }
    desktop: {
      avif: string
      webp: string
    }
  }
}

let props = defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'UiHero',
}
</script>

<template>
  <div class="hero">
    <ui-container class="hero-container">
      <picture v-if="props.hero">
        <source
          type="image/avif"
          media="(max-width: 600px)"
          :srcSet="props.hero.mobile.avif"
        />
        <source type="image/avif" :srcSet="props.hero.desktop.avif" />
        <source
          type="image/webp"
          media="(max-width: 600px)"
          :srcSet="props.hero.mobile.webp"
        />
        <img
          class="image"
          :srcSet="props.hero.desktop.webp"
          sizes="(max-width: 600px), 800px"
          :alt="props.title"
          width="820"
          height="410"
          draggable="false"
        />
      </picture>
    </ui-container>
  </div>
</template>

<style scoped>
.hero {
  background: oklch(74.68% 0.014 78.24);
}

.hero-container {
  display: flex;
  min-block-size: clamp(12.5rem, 8.125rem + 17.5vw, 25.625rem);
  padding-block: 0;
}

.image {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: center bottom;
  user-select: none;
}

@media (width <= 800px) {
  .hero-container {
    width: 100vi;
    padding: 0;
  }
}
</style>
