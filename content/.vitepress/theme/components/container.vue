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

<template>
  <component :is="props.as" :class="[$style.container, $style[`size-${size}`]]">
    <slot />
  </component>
</template>

<style module>
.container {
  width: min(840px, 100vw);
  padding: var(--space-l) var(--space-m);
  margin-inline: auto;
}

.size-m {
  width: min(clamp(38.75rem, 13.75rem + 40vw, 53.75rem), 100vw);
}

.size-l {
  width: min(clamp(57.5rem, 26rem + 45vw, 80rem), 100vw);
}
</style>
