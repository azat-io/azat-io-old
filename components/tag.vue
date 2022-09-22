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
  display: inline-block;
  padding: 0 var(--size-xs);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  white-space: nowrap;
  user-select: none;
  border: none;
  border-radius: var(--size-s);
  outline: none;
  transition: all 300ms;
}

.active {
  color: var(--color-primary);
  background: var(--color-brand);
}

a.active:hover,
button.active:hover {
  box-shadow: 0 0 0 2px var(--color-brand);
}

a.active:focus-visible,
button.active:focus-visible {
  background: var(--color-brand-hover);
  box-shadow: 0 0 0 2px var(--color-brand);
}

.disabled {
  color: var(--color-primary);
  background: var(--color-text);
}

a.disabled:hover,
button.disabled:hover {
  box-shadow: 0 0 0 2px var(--color-text-secondary);
}

a.disabled:focus-visible,
button.disabled:focus-visible {
  background: var(--color-text-secondary);
  box-shadow: 0 0 0 2px var(--color-text-secondary);
}
</style>
