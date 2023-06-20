<script lang="ts" setup>
import type { Component } from 'vue'

import { computed } from 'vue'

import IconNavArrowDown from '~/icons/nav-arrow-down.vue'

interface Props {
  icon?: Component
  iconPosition?: 'start' | 'end'
  emptyLabel?: string
  options: {
    label: string
    value: string
  }[]
  modelValue: string | null
}

let props = withDefaults(defineProps<Props>(), {
  icon: IconNavArrowDown,
  iconPosition: 'end',
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
  <div class="wrapper">
    <select v-model="model" :class="['select', `select-${iconPosition}`]">
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
    <props.icon :class="['icon', `icon-${iconPosition}`]" />
  </div>
</template>

<style>
:root {
  --select-icon-size: 16px;
}
</style>

<style scoped>
.wrapper {
  position: relative;
}

.select {
  padding: var(--space-xs) var(--space-s);
  font: var(--font-s);
  color: var(--color-content-primary);
  inline-size: 100%;
  appearance: none;
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

.select-start {
  padding-inline-start: calc(var(--select-icon-size) + var(--space-m));
}

.icon {
  position: absolute;
  inset-block-start: 50%;
  inline-size: var(--select-icon-size);
  block-size: var(--select-icon-size);
  transform: translateY(-50%);
}

.icon-end {
  inset-inline-end: var(--space-s);
}

.icon-start {
  inset-inline-start: var(--space-s);
}
</style>
