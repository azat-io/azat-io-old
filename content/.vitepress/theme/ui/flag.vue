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

let src: string = flags[props.code] ?? flagUnknown
</script>

<script lang="ts">
export default {
  name: 'UiCountry',
}
</script>

<template>
  <img :src="src" :class="$style.flag" :alt="`Flag ${props.code}`" />
</template>

<style module>
.flag {
  inline-size: 48px;
}
</style>
