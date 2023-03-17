<script lang="ts" setup>
import flagUnknown from '~/assets/flag-unknown.svg'
import flagAE from '~/assets/flag-ae.svg'
import flagAM from '~/assets/flag-am.svg'
import flagAZ from '~/assets/flag-az.svg'
import flagBY from '~/assets/flag-by.svg'
import flagFR from '~/assets/flag-fr.svg'
import flagGE from '~/assets/flag-ge.svg'
import flagIL from '~/assets/flag-il.svg'
import flagIN from '~/assets/flag-in.svg'
import flagKE from '~/assets/flag-ke.svg'
import flagPS from '~/assets/flag-ps.svg'
import flagRU from '~/assets/flag-ru.svg'
import flagTR from '~/assets/flag-tr.svg'
import flagUA from '~/assets/flag-ua.svg'
import flagUG from '~/assets/flag-ug.svg'
import flagUS from '~/assets/flag-us.svg'

interface Props {
  name: string
  originName: string
  code: string
}

let props = defineProps<Props>()

let flags: {
  [key: string]: string
} = {
  ae: flagAE,
  am: flagAM,
  az: flagAZ,
  by: flagBY,
  fr: flagFR,
  ge: flagGE,
  il: flagIL,
  in: flagIN,
  ke: flagKE,
  ps: flagPS,
  ru: flagRU,
  tr: flagTR,
  ua: flagUA,
  ug: flagUG,
  us: flagUS,
}

let src: string | undefined = flags[props.code] ?? flagUnknown
</script>

<script lang="ts">
export default {
  name: 'UiCountry',
}
</script>

<template>
  <div :class="$style.country">
    <img :src="src" :class="$style.icon" :alt="props.originName" />
    <div :class="$style.info">
      <span :class="$style.name" v-text="props.name" />
      <span :class="$style['origin-name']" v-text="props.originName" />
    </div>
  </div>
</template>

<style module>
.country {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-m);
  place-items: center left;
}

.icon {
  inline-size: 48px;
  margin-block-start: 4px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font: var(--font-s);
  color: var(--color-content-brand);
}

.origin-name {
  display: block;
  font: var(--font-2xs);
  color: var(--color-content-primary);
}
</style>
