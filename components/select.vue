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
.wrapper {
  position: relative;
}

.select {
  appearance: none;
  width: 100%;
  padding: var(--size-xs) var(--size-s);
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--color-content-primary);
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--size-s);
  outline: none;
}

.select::-ms-expand {
  display: none;
}

.select:active {
  box-shadow: 0 0 0 1px var(--color-border-brand);
}

.select-left {
  padding-left: calc(var(--size-s) * 2 + var(--size-xs));
}

.icon {
  position: absolute;
  top: 50%;
  width: var(--size-s);
  height: var(--size-s);
  transform: translateY(-50%);
}

.icon-right {
  right: var(--size-s);
}

.icon-left {
  left: var(--size-s);
}
</style>
