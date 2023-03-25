<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'

import { useRouter, useData, useRoute } from 'vitepress'
import { onMounted, watch } from 'vue'
import docsearch from '@docsearch/js'
import '@docsearch/css'

let props = defineProps<{
  algolia: DefaultTheme.AlgoliaSearchOptions
}>()

let router = useRouter()
let route = useRoute()
let { localeIndex, lang } = useData()

type DocSearchProps = Parameters<typeof docsearch>[0]

let getRelativePath = (absoluteUrl: string) => {
  let { pathname, hash } = new URL(absoluteUrl)
  return pathname.replace(/\.html$/, '') + hash
}

let initialize = (userOptions: DefaultTheme.AlgoliaSearchOptions) => {
  let options = Object.assign<{}, {}, DocSearchProps>({}, userOptions, {
    container: '#docsearch',
    navigator: {
      navigate({ itemUrl }) {
        let { pathname: hitPathname } = new URL(
          window.location.origin + itemUrl,
        )
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl)
        } else {
          router.go(itemUrl)
        }
      },
    },

    transformItems: items => {
      return items.map(item => {
        return Object.assign({}, item, {
          url: getRelativePath(item.url),
        })
      })
    },

    // @ts-expect-error
    hitComponent({ hit, children }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children },
      }
    },
  })

  docsearch(options)
}

let update = () => {
  let options = {
    ...props.algolia,
    ...props.algolia.locales?.[localeIndex.value],
  }
  let rawFacetFilters = options.searchParameters?.facetFilters ?? []
  let facetFilters = [
    ...(Array.isArray(rawFacetFilters)
      ? rawFacetFilters
      : [rawFacetFilters]
    ).filter(f => !f.startsWith('lang:')),
    `lang:${lang.value}`,
  ]
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters,
    },
  })
}

onMounted(update)
watch(localeIndex, update)
</script>

<script lang="ts">
export default {
  name: 'UiAlgolia',
}
</script>

<template>
  <div id="docsearch" />
</template>

<style>
.DocSearch {
  --docsearch-primary-color: var(--color-content-brand);
  --docsearch-highlight-color: var(--color-content-brand);
  --docsearch-text-color: var(--color-content-primary);
  --docsearch-muted-color: var(--color-content-tertiary);
  --docsearch-container-background: var(--color-background-overlay);
  --docsearch-hit-active-color: var(--color-content-inverted);
  --docsearch-hit-background: var(--color-background-secondary);
  --docsearch-hit-color: var(--color-content-tertiary);
  --docsearch-hit-shadow: none;
  --docsearch-modal-shadow: none;
  --docsearch-searchbox-shadow: none;
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-key-gradient: transparent;
  --docsearch-key-shadow: none;
  --docsearch-modal-background: var(--color-background-primary);
  --docsearch-footer-shadow: none;
  --docsearch-footer-background: var(--color-background-secondary);

  animation: fade-in 150ms linear forwards;
}

.DocSearch-Modal {
  animation: scale-up 300ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.cls-1,
.cls-2 {
  fill: var(--color-content-brand) !important;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes scale-up {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(800px) translateZ(0);
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0) translateZ(0);
  }
}
</style>
