<template>
  <div :class="$style.wrapper">你好!</div>
</template>

<script lang="ts">
export default {
  name: 'UiTranslateBlock',
}
</script>

<style module>
.wrapper {
  padding: var(--space-m);
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
}
</style>
