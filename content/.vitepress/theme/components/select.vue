<script lang="ts" setup>
import type { DefineComponent } from 'vue'

import { computed } from 'vue'

import NavArrowDownIcon from '~/icons/nav-arrow-down.svg'

interface Props {
  icon?: DefineComponent
  iconPosition?: 'left' | 'right'
  emptyLabel?: string
  options: {
    label: string
    value: string
  }[]
  modelValue: string | null
}

let props = withDefaults(defineProps<Props>(), {
  icon: NavArrowDownIcon,
  iconPosition: 'right',
})

let emit = defineEmits(['update:modelValue'])

let model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
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
  width: 100%;
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
  top: 50%;
  width: var(--select-icon-size);
  height: var(--select-icon-size);
  transform: translateY(-50%);
}

.icon-right {
  right: var(--space-s);
}

.icon-left {
  left: var(--space-s);
}
</style>
