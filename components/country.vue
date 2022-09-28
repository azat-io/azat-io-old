<script lang="ts" setup>
import type { DefineComponent } from 'vue'

import FlagRuIcon from '~/assets/flag-ru.svg'
import FlagUsIcon from '~/assets/flag-us.svg'

interface Props {
  name: string
  originName: string
  code: string
}

let props = defineProps<Props>()

let icon: DefineComponent
if (props.code === 'ae') {
  icon = (await import(`~/assets/flag-ae.svg`)).default
} else if (props.code === 'am') {
  icon = (await import(`~/assets/flag-am.svg`)).default
} else if (props.code === 'az') {
  icon = (await import(`~/assets/flag-az.svg`)).default
} else if (props.code === 'by') {
  icon = (await import(`~/assets/flag-by.svg`)).default
} else if (props.code === 'fr') {
  icon = (await import(`~/assets/flag-fr.svg`)).default
} else if (props.code === 'ge') {
  icon = (await import(`~/assets/flag-ge.svg`)).default
} else if (props.code === 'il') {
  icon = (await import(`~/assets/flag-il.svg`)).default
} else if (props.code === 'in') {
  icon = (await import(`~/assets/flag-in.svg`)).default
} else if (props.code === 'ke') {
  icon = (await import(`~/assets/flag-ke.svg`)).default
} else if (props.code === 'ps') {
  icon = (await import(`~/assets/flag-ps.svg`)).default
} else if (props.code === 'ru') {
  icon = FlagRuIcon
} else if (props.code === 'ua') {
  icon = (await import(`~/assets/flag-ua.svg`)).default
} else if (props.code === 'ug') {
  icon = (await import(`~/assets/flag-ug.svg`)).default
} else if (props.code === 'us') {
  icon = FlagUsIcon
} else {
  icon = (await import(`~/assets/flag-unknown.svg`)).default
}
</script>

<template>
  <div :class="$style.country">
    <component :is="icon" :class="$style.icon" />
    <div>
      <span :class="$style.name" v-text="props.name" />
      <span :class="$style['origin-name']" v-text="props.originName" />
    </div>
  </div>
</template>

<style module>
.country {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: var(--size-s);
  align-items: center;
}

.icon {
  width: 48px;
  margin-top: var(--size-xxs);
}

.name {
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--color-content-brand);
}

.origin-name {
  display: block;
  font-size: var(--font-size-xxs);
  line-height: var(--line-height-xxs);
  color: var(--color-content-primary);
}
</style>
