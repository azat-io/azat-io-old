import type { PluginFunction } from '@vuepress/core'
import type MarkdownIt from 'markdown-it'

import { path, hash } from '@vuepress/utils'

export let mermaidPlugin = (): PluginFunction => () => ({
  name: 'vuepress-mermaid',
  clientConfigFile: path.resolve(__dirname, '../client/index.ts'),
  extendsMarkdown: (md: MarkdownIt) => {
    md.use((markdownIt): void => {
      let originFence = markdownIt.renderer.rules.fence?.bind(
        markdownIt.renderer.rules,
      )
      markdownIt.renderer.rules.fence = (...args) => {
        let [tokens, index] = args
        let { info: languageType, content } = tokens[index]
        if (content && languageType.trim() === 'mermaid') {
          return `
            <mermaid
              id="mermaid-${hash(index)}"
              code="${content.trim()}"
            ></mermaid>
          `
        }
        if (originFence) {
          return `${originFence(...args)}`
        }
        return ''
      }
    })
  },
})
