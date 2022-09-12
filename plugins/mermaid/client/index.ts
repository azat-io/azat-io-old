import type { VNode } from 'vue'
import type { Mermaid } from 'mermaid'

import { defineComponent, onMounted, nextTick, ref, h } from 'vue'
import { defineClientConfig } from '@vuepress/client'

let MermaidComponent = defineComponent({
  name: 'Mermaid',
  props: {
    id: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      default: '',
    },
    config: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let el = ref<HTMLDivElement>()
    let svgCode = ref('')

    onMounted(async () => {
      let { initialize, render } = (await import('mermaid'))
        .default as unknown as Mermaid
      let code = decodeURIComponent(props.code)

      initialize({
        themeVariables: {
          darkMode: true,
          fontFamily: 'Stem, sans-serif',
          fontSize: '15px',

          noteBkgColor: 'var(--color-brand)',
          noteTextColor: 'var(--color-primary)',
          noteBorderColor: 'var(--color-brand-hover)',

          lineColor: 'var(--color-text)',
          textColor: 'var(--color-text)',

          nodeBorder: 'var(--color-brand-hover)',
          nodeTextColor: 'var(--color-primary)',

          mainBkg: 'var(--color-brand)',

          clusterBkg: 'var(--color-tertiary)',
          clusterBorder: 'var(--color-secondary)',

          actorBorder: 'var(--color-brand-hover)',
          labelBoxBorderColor: 'var(--color-text)',
          loopTextColor: 'var(--color-text)',
        },
        startOnLoad: false,
      })

      let container = document.createElement('div')

      let renderCallback = (codeValue: string): void => {
        svgCode.value = codeValue
        document.body.removeChild(container)
      }

      svgCode.value = ''
      document.body.appendChild(container)

      nextTick(() => {
        render(props.id, code, renderCallback, container)
      })
    })

    return (): VNode =>
      h('div', {
        ref: el,
        class: ['mermaid'],
        innerHTML: svgCode.value,
      })
  },
})

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('mermaid', MermaidComponent)
  },
})
