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
  padding: var(--size-l) var(--size-s);
  margin-inline: auto;
}

.size-m {
  width: min(840px, 100vw);
}

.size-l {
  width: min(1020px, 100vw);
}

@media (width >= 480px) {
  .container {
    padding: var(--size-xl) var(--size-m);
  }
}
</style>
