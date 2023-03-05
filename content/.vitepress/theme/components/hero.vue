<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

import Container from '~/components/container.vue'

let { theme } = useData()

let t = computed<{
  subtitle: string
  title: string
}>(() => theme.value.hero)
</script>

<template>
  <div :class="$style.hero">
    <img
      :class="[$style.content, $style.image]"
      src="/hero.webp"
      alt="Azat S."
    />
    <video
      :class="[$style.content, $style.video]"
      poster="/hero-poster.webp"
      width="1280"
      height="720"
      tabindex="-1"
      playsinline
      autoplay
      muted
      loop
    >
      <source src="/hero.av1.mp4" type="video/mp4; codecs=av01.0.05M.08,opus" />
      <source src="/hero.hevc.mp4" type="video/mp4; codecs=hvc1" />
      <source
        src="/hero.h264.mp4"
        type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
      />
      <img src="/hero-poster.webp" loading="lazy" alt="Azat S." />
    </video>

    <div :class="$style.paranja" />
    <div :class="$style.greeting">
      <Container>
        <h1 :class="$style['header-title']" v-text="t.title" />
        <h2 :class="$style['header-subtitle']" v-text="t.subtitle" />
      </Container>
    </div>
  </div>
</template>

<style module>
.hero {
  position: relative;
}

.paranja {
  position: absolute;
  inset: 0;
  background: oklch(12% 0 0 / 60%);
}

.greeting {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.header-title {
  margin-block-end: var(--space-xs);
  font: var(--font-3xl);
  color: var(--color-content-primary);
  text-shadow: 1px 2px lch(12% 0 0 / 30%);
}

.header-subtitle {
  padding-block: 0;
  margin-block: 0;
  font: var(--font-l);
  font-weight: normal;
  line-height: 1;
}

.content {
  width: 100%;
  object-fit: cover;
  height: clamp(30rem, 21.875rem + 20.3125vw, 46.25rem);
  overflow: hidden;
  user-select: none;
  filter: sepia(0.3);
}

.content::-webkit-media-controls {
  display: none !important;
}

.video {
  display: none;
}

@media (width >= 720px) {
  .image {
    display: none;
  }

  .video {
    display: block;
  }
}
</style>
