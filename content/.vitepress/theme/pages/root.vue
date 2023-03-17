<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { onMounted } from 'vue'

import { checkUserLang } from '~/lib/check-user-lang.js'

let { go } = useRouter()

onMounted(() => {
  if (checkUserLang(['ru', 'uk', 'be'])) {
    go('/ru/')
  } else {
    go('/en/')
  }
})
</script>

<script lang="ts">
export default {
  name: 'PageRoot',
}
</script>
