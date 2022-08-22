import { defineClientConfig } from '@vuepress/client'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import copyIcon from '~/assets/copy.svg?raw'

import './index.css'

let languages = {
  bash: 'Bash',
  css: 'CSS',
  graphql: 'GraphQL',
  html: 'HTML',
  js: 'JavaScript',
  json: 'JSON',
  md: 'Markdown',
  markdown: 'Markdown',
  postcss: 'CSS',
  ts: 'TypeScript',
  vue: 'Vue',
  yaml: 'YAML',
  yml: 'YAML',
}

type Language = keyof typeof languages

export default defineClientConfig({
  setup: () => {
    let route = useRoute()
    let isMobile = __VUEPRESS_SSR__
      ? true
      : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )

    let genenrateButton = (): void => {
      let selector = 'div[class*="language-"]'
      setTimeout(() => {
        let codeElements = document.querySelectorAll<HTMLElement>(selector)
        codeElements.forEach(codeElement => {
          let textToCopy = codeElement.innerText

          let copyElement = document.createElement('button')
          copyElement.classList.add('code-copy-button')
          copyElement.innerHTML = copyIcon
          codeElement.appendChild(copyElement)

          let languageElement = document.createElement('span')
          let languageExtension = codeElement.classList[0].split(
            '-',
          )[1] as Language
          let language = languages[languageExtension]
          languageElement.classList.add('code-language')
          languageElement.innerText = language
          codeElement.appendChild(languageElement)

          copyElement.addEventListener('click', () => {
            navigator.clipboard.writeText(textToCopy)
          })
        })
      }, 500)
    }

    onMounted(() => {
      if (!isMobile) {
        genenrateButton()
      }
    })

    watch(
      () => route.path,
      () => {
        if (!isMobile) {
          genenrateButton()
        }
      },
    )
  },
})
