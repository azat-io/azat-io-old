<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

import UiContainer from '~/ui/container.vue'
import UiParanja from '~/ui/paranja.vue'

let { theme } = useData()

let t = computed<{
  subtitle: string
  title: string
}>(() => theme.value.banner)
</script>

<script lang="ts">
export default {
  name: 'UiBanner',
}
</script>

<template>
  <div :class="$style.banner">
    <img
      :class="[$style.content, $style.image]"
      src="/banner.webp"
      alt="Azat S."
    />
    <video
      :class="[$style.content, $style.video]"
      poster="/banner-poster.webp"
      width="1280"
      height="720"
      tabindex="-1"
      playsinline
      autoplay
      muted
      loop
    >
      <source
        src="/banner.av1.mp4"
        type="video/mp4; codecs=av01.0.05M.08,opus"
      />
      <source src="/banner.hevc.mp4" type="video/mp4; codecs=hvc1" />
      <source
        src="/banner.h264.mp4"
        type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
      />
      <img src="/banner-poster.webp" loading="lazy" alt="Azat S." />
    </video>
    <ui-paranja />
    <div :class="$style.greeting">
      <ui-container>
        <h1 :class="$style['header-title']" v-text="t.title" />
        <h2 :class="$style['header-subtitle']" v-text="t.subtitle" />
      </ui-container>
    </div>
  </div>
</template>

<style module>
.banner {
  position: relative;
}

.greeting {
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 50%;
  transform: translateX(-50%);
}

.header-title {
  margin-block-end: var(--space-xs);
  font: var(--font-3xl);
  color: var(--color-content-primary);
  text-shadow: 1px 2px lch(12% 0 0 / 0.3);
}

.header-subtitle {
  padding-block: 0;
  margin-block: 0;
  font: var(--font-l);
  font-weight: normal;
  line-height: 1;
}

.content {
  inline-size: 100%;
  object-fit: cover;
  block-size: clamp(30rem, 21.875rem + 20.3125vi, 46.25rem);
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
