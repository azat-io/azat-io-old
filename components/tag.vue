<script lang="ts" setup>
interface Props {
  type?: 'active' | 'disabled'
  onClick?: () => void
  to?: string
}

let props = withDefaults(defineProps<Props>(), {
  type: 'active',
})

let componentType: string
if (props.onClick) {
  componentType = 'button'
} else if (props.to) {
  componentType = 'RouterLink'
} else {
  componentType = 'div'
}
</script>

<template>
  <component
    :is="componentType"
    :class="[$style.tag, $style[type]]"
    v-bind="props"
  >
    <slot />
  </component>
</template>

<style module>
.tag {
  padding: 0 var(--size-xs);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  white-space: nowrap;
  border-radius: var(--size-s);
  transition: all 300ms;
}

.active {
  color: var(--color-primary);
  background: var(--color-brand);
}

.active:hover {
  background: var(--color-brand-hover);
}

.active:focus-visible {
  background: var(--color-brand-hover);
  box-shadow: 0 0 0 2px var(--color-brand);
}

.disabled {
  color: var(--color-primary);
  background: var(--color-text);
}

.disabled:hover {
  background: var(--color-text-secondary);
}

.disabled:focus-visible {
  background: var(--color-text-secondary);
  box-shadow: 0 0 0 2px var(--color-text-secondary);
}
</style>
