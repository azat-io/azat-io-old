import { defineClientConfig } from '@vuepress/client'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { copyIcon } from './copy-icon.js'

import './index.css'

let languages: {
  [key: string]: string
} = {
  bat: 'Batch',
  bash: 'Bash',
  'c#': 'C#',
  clj: 'Clojure',
  cs: 'C#',
  css: 'CSS',
  erl: 'Erlang',
  'f#': 'F#',
  fs: 'F#',
  graphql: 'GraphQL',
  gql: 'GraphQL',
  haskell: 'Haskell',
  hbs: 'Handlebars',
  hs: 'Haskell',
  html: 'HTML',
  jade: 'Pug',
  javascript: 'JavaScript',
  js: 'JavaScript',
  jsx: 'JavaScript',
  json: 'JSON',
  less: 'Less',
  make: 'Makefile',
  md: 'Markdown',
  markdown: 'Markdown',
  postcss: 'CSS',
  pug: 'Pug',
  purescript: 'PureScript',
  purs: 'PureScript',
  py: 'Python',
  rb: 'Ruby',
  rs: 'Rust',
  ruby: 'Ruby',
  scss: 'SCSS',
  styl: 'Stylus',
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
