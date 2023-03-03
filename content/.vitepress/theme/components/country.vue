<script lang="ts" setup>
import flagUnknown from '~/assets/flag-unknown.svg?url'
import flagAE from '~/assets/flag-ae.svg?url'
import flagAM from '~/assets/flag-am.svg?url'
import flagAZ from '~/assets/flag-az.svg?url'
import flagBY from '~/assets/flag-by.svg?url'
import flagFR from '~/assets/flag-fr.svg?url'
import flagGE from '~/assets/flag-ge.svg?url'
import flagIL from '~/assets/flag-il.svg?url'
import flagIN from '~/assets/flag-in.svg?url'
import flagKE from '~/assets/flag-ke.svg?url'
import flagPS from '~/assets/flag-ps.svg?url'
import flagRU from '~/assets/flag-ru.svg?url'
import flagTR from '~/assets/flag-tr.svg?url'
import flagUA from '~/assets/flag-ua.svg?url'
import flagUG from '~/assets/flag-ug.svg?url'
import flagUS from '~/assets/flag-us.svg?url'

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

<template>
  <div :class="$style.country">
    <img :src="src" :class="$style.icon" :alt="props.originName" />
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
  place-items: center left;
}

.icon {
  width: 48px;
  margin-block-start: var(--size-xxs);
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
