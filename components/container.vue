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
  width: clamp(320px, 100vw, 1280px);
  padding: var(--size-l) var(--size-s);
  margin-inline: auto;
}

@media (min-width: 480px) {
  .container {
    padding: var(--size-xl) var(--size-m);
  }
}

@media (min-width: 800px) {
  .size-m {
    width: calc(100vw - 240px);
  }

  .size-l {
    width: calc(100vw - 120px);
  }
}

@media (min-width: 1200px) {
  .size-m {
    width: calc(100vw - 560px);
  }

  .size-l {
    width: calc(100vw - 320px);
  }
}
</style>
