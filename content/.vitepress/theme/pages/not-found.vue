<script lang="ts" setup>
import UiTypography from '~/ui/typography.vue'
</script>

<script lang="ts">
export default {
  name: 'PageNotFound',
}
</script>

<template>
  <main :class="$style.main">
    <div>
      <ui-typography color="brand" size="2xl" bold>404</ui-typography>
      <ui-typography color="primary" size="m">
        Page not found. Back to <a href="/">home</a>.
      </ui-typography>
    </div>
  </main>
</template>

<style module>
.main {
  display: grid;
  place-items: center;
  block-size: 100vb;
  text-align: center;
}
</style>
