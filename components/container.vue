<script lang="ts" setup>
interface Props {
  className?: string
  as?: string
}

let props = defineProps<Props>()
</script>

<template>
  <component
    :is="props.as ?? 'div'"
    :class="{
      [$style.container]: true,
      [props.className ?? '']: !!className,
    }"
  >
    <slot />
  </component>
</template>

<style module>
.container {
  width: 100vw;
  min-width: 320px;
  max-width: 1600px;
  padding: var(--size-l) var(--size-s);
  margin: 0 auto;
}

@media (min-width: 480px) {
  .container {
    padding: var(--size-xl) var(--size-m);
  }
}

@media (min-width: 800px) {
  .container {
    width: calc(100vw - 240px);
  }
}

@media (min-width: 1200px) {
  .container {
    width: calc(100vw - 480px);
  }
}
</style>
