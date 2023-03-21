<script lang="ts" setup>
interface Props {
  size: '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl'
  color: 'brand' | 'primary' | 'secondary' | 'tertiary'
  noWrap?: boolean
  bold?: boolean
  as?: string
}

let props = withDefaults(defineProps<Props>(), {
  noWrap: false,
  bold: false,
  as: 'p',
})
</script>

<script lang="ts">
export default {
  name: 'UiTypography',
}
</script>

<template>
  <component
    :is="props.as"
    :class="[
      'typography',
      `size-${props.size}`,
      `color-${props.color}`,
      props.bold ? 'weight-bold' : 'weight-normal',
      props.noWrap && 'no-wrap',
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.typography {
  margin-block: 0;
}

.size-2xs {
  font: var(--font-2xs);
}

.size-xs {
  font: var(--font-xs);
}

.size-s {
  font: var(--font-s);
}

.size-m {
  font: var(--font-m);
}

.size-l {
  font: var(--font-l);
}

.size-xl {
  font: var(--font-xl);
}

.size-2xl {
  margin-block-end: var(--space-l);
  font: var(--font-2xl);
}

.color-brand {
  color: var(--color-content-brand);
}

.color-primary {
  color: var(--color-content-primary);
}

.color-secondary {
  color: var(--color-content-secondary);
}

.color-tertiary {
  color: var(--color-content-tertiary);
}

.weight-bold {
  font-weight: 600;
}

.weight-normal {
  font-weight: 400;
}

.no-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
