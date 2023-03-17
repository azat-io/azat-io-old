<script lang="ts">
export default {
  name: 'UiParanja',
}
</script>

<template>
  <div :class="$style.paranja" />
</template>

<style module>
.paranja {
  position: absolute;
  inset: 0;
  background: oklch(12% 0 0 / 60%);
}
</style>
