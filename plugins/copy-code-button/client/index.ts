import { defineClientConfig } from '@vuepress/client'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { copyIcon } from './copy-icon.js'

import './index.css'

let languages: {
  [key: string]: string
} = {
  bash: 'Bash',
  css: 'CSS',
  graphql: 'GraphQL',
  html: 'HTML',
  javascript: 'JavaScript',
  js: 'JavaScript',
  jsx: 'JavaScript',
  json: 'JSON',
  less: 'Less',
  md: 'Markdown',
  markdown: 'Markdown',
  postcss: 'CSS',
  rb: 'Ruby',
  ruby: 'Ruby',
  scss: 'SCSS',
  svelte: 'Svelte',
  ts: 'TypeScript',
  tsx: 'TypeScript',
  typescript: 'TypeScript',
  vue: 'Vue',
  yaml: 'YAML',
  yml: 'YAML',
}

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
          let languageExtension = codeElement.classList[0].split('-')[1]
          let language = languages[languageExtension] || ''
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
