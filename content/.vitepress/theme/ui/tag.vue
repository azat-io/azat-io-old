<script lang="ts" setup>
interface Props {
  type?: 'active' | 'disabled'
  href?: string | null
  onClick?: (() => void) | null
}

let props = withDefaults(defineProps<Props>(), {
  type: 'active',
  href: null,
  onClick: null,
})

let componentType: string
if (props.onClick) {
  componentType = 'button'
} else if (props.href) {
  componentType = 'a'
} else {
  componentType = 'div'
}
</script>

<script lang="ts">
export default {
  name: 'UiTag',
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
  padding-inline: var(--space-xs);
  font: var(--font-xs);
  white-space: nowrap;
  user-select: none;
  border: none;
  border-radius: 16px;
  outline: none;
}

.active {
  color: var(--color-content-inverted);
  background: var(--color-background-brand);
}

a.active:hover,
button.active:hover {
  background: var(--color-background-brand-hover);
  transition: background 300ms;
}

a.active:focus-visible,
button.active:focus-visible {
  background: var(--color-background-brand-hover);
  transition: background 300ms;
}

.disabled {
  color: var(--color-content-inverted);
  background: var(--color-background-inverted);
}

a.disabled:hover,
button.disabled:hover {
  background: var(--color-background-inverted-hover);
  transition: background 300ms;
}

a.disabled:focus-visible,
button.disabled:focus-visible {
  background: var(--color-background-inverted-hover);
  transition: background 300ms;
}
</style>
