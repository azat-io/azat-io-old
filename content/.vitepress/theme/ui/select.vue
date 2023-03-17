<script lang="ts" setup>
import type { Component } from 'vue'

import { computed } from 'vue'

import IconNavArrowDown from '~/icons/nav-arrow-down.vue'

interface Props {
  icon?: Component
  iconPosition?: 'left' | 'right'
  emptyLabel?: string
  options: {
    label: string
    value: string
  }[]
  modelValue: string | null
}

let props = withDefaults(defineProps<Props>(), {
  icon: IconNavArrowDown,
  iconPosition: 'right',
  emptyLabel: '',
})

let emit = defineEmits(['update:modelValue'])

let model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<script lang="ts">
export default {
  name: 'UiSelect',
}
</script>

<template>
  <div :class="$style.wrapper">
    <select
      v-model="model"
      :class="[$style.select, $style[`select-${iconPosition}`]]"
    >
      <option
        v-if="props.emptyLabel"
        disabled
        selected
        :value="null"
        v-text="props.emptyLabel"
      />
      <option
        v-for="{ label, value: optionValue } in props.options"
        :key="optionValue"
        :value="optionValue"
        v-text="label"
      />
    </select>
    <props.icon :class="[$style.icon, $style[`icon-${iconPosition}`]]" />
  </div>
</template>

<style module>
:root {
  --select-icon-size: 16px;
}

.wrapper {
  position: relative;
}

.select {
  appearance: none;
  inline-size: 100%;
  padding: var(--space-xs) var(--space-s);
  font: var(--font-s);
  color: var(--color-content-primary);
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  outline: none;
}

.select::-ms-expand {
  display: none;
}

.select:active {
  box-shadow: 0 0 0 1px var(--color-border-brand);
}

.select-left {
  padding-inline-start: calc(var(--select-icon-size) + var(--space-m));
}

.icon {
  position: absolute;
  inset-block-start: 50%;
  inline-size: var(--select-icon-size);
  block-size: var(--select-icon-size);
  transform: translateY(-50%);
}

.icon-right {
  inset-inline-end: var(--space-s);
}

.icon-left {
  inset-inline-start: var(--space-s);
}
</style>
