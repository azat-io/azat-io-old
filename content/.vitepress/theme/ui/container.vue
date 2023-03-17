<script lang="ts" setup>
interface Props {
  as?: string
  size?: 'm' | 'l'
}

let props = withDefaults(defineProps<Props>(), {
  as: 'div',
  size: 'm',
})
</script>

<script lang="ts">
export default {
  name: 'UiContainer',
}
</script>

<template>
  <component :is="props.as" :class="[$style.container, $style[`size-${size}`]]">
    <slot />
  </component>
</template>

<style module>
.container {
  inline-size: min(840px, 100vi);
  padding: var(--space-l) var(--space-m);
  margin-inline: auto;
}

.size-m {
  inline-size: min(clamp(38.75rem, 13.75rem + 40vi, 53.75rem), 100vi);
}

.size-l {
  inline-size: min(clamp(57.5rem, 26rem + 45vi, 80rem), 100vi);
}
</style>
