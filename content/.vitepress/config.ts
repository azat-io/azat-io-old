import type { UserConfig } from 'vitepress'
import type { ConfigEnv } from 'vite'

import mdImageLazyLoading from 'markdown-it-image-lazy-loading'
import lightningcss from 'vite-plugin-lightningcss'
import { resolve as resolvePath } from 'node:path'
import { defineConfigWithTheme } from 'vitepress'
import mdImageSize from 'markdown-it-imsize'
import { createWriteStream } from 'node:fs'
import { SitemapStream } from 'sitemap'
import { loadTheme } from 'shiki'
import path from 'path'

import { getDirname } from './theme/lib/get-dirname.js'

let dirname = getDirname(import.meta.url)
let outDir = path.join(dirname, '/../../dist/')

let theme = await loadTheme(path.resolve(dirname, 'theme/layout/gruvbox.json'))

let hostname = 'https://azat.io/'

let links: string[] = []

let algoliaConfig = {
  appId: 'NI7EDOO3LQ',
  apiKey: '3c0c343fff76e51e80e6ba3b32dbed25',
  indexName: 'azat',
}

export default ({ mode }: ConfigEnv): UserConfig =>
  defineConfigWithTheme({
    appearance: false,
    cleanUrls: true,
    title: 'Azat S.',

    head: [
      [
        'meta',
        {
          name: 'theme-color',
          content: '#1b1b1b',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          sizes: 'any',
          href: '/favicon.ico',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/icon.svg',
        },
      ],
      [
        'link',
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
      ],
      [
        'link',
        {
          rel: 'preload',
          href: '/fonts/stem-regular.woff2',
          type: 'font/woff2',
          as: 'font',
          crossorigin: '',
        },
      ],
      [
        'link',
        {
          rel: 'preload',
          href: '/fonts/stem-bold.woff2',
          type: 'font/woff2',
          as: 'font',
          crossorigin: '',
        },
      ],
      [
        'script',
        {
          async: '',
          src: 'https://analytics.azat.io/umami.js',
          'data-website-id': 'effe2886-cd9d-46cd-9c95-e9dbad667822',
        },
      ],
    ],

    locales: {
      root: {
        label: 'English',
        lang: 'en',
        title: 'Azat S.',
        description: '',
        link: '/en/',
        themeConfig: {
          algolia: {
            ...algoliaConfig,
            placeholder: 'Search posts',
            translations: {
              modal: {
                searchBox: {
                  resetButtonTitle: 'Clear the query',
                  resetButtonAriaLabel: 'Clear the query',
                  cancelButtonText: 'Cancel',
                  cancelButtonAriaLabel: 'Cancel',
                },
                startScreen: {
                  recentSearchesTitle: 'Recent searches',
                  noRecentSearchesText: 'No recent searches',
                  saveRecentSearchButtonTitle: 'Save to search history',
                  removeRecentSearchButtonTitle: 'Remove from search history',
                  favoriteSearchesTitle: 'Favorite searches',
                  removeFavoriteSearchButtonTitle: 'Remove from favorites',
                },
                errorScreen: {
                  titleText: 'Unable to get results',
                  helpText: 'You may need to check your internet connection',
                },
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close',
                  searchByText: 'Search by',
                },
                noResultsScreen: {
                  noResultsText: 'No results for',
                  suggestedQueryText: 'Try searching for:',
                  reportMissingResultsText:
                    'Do you think this query should have results?',
                  reportMissingResultsLinkText: 'Send feedback',
                },
              },
            },
          },
          header: {
            language: 'Language',
            search: 'Search',
            en: 'English',
            ru: 'Russian',
          },
          banner: {
            title: 'Manual',
            subtitle: 'for reinventing the wheel',
          },
          doc: {
            'also-translated': 'Also translated into:',
            'edit-this-page': 'Edit this page',
            'next-post': 'Next post',
            'previous-post': 'Previous post',
            'minutes-to-read': {
              one: 'minute to read',
              other: 'minutes to read',
            },
          },
          footer: {
            'pgp-info': 'Public PGP key to verify my signature',
          },
        },
      },
      ru: {
        label: 'Русский',
        lang: 'ru',
        title: 'Азат Ш.',
        description: '',
        link: '/ru/',
        themeConfig: {
          algolia: {
            ...algoliaConfig,
            placeholder: 'Поиск',
            translations: {
              modal: {
                searchBox: {
                  resetButtonTitle: 'Очистить',
                  resetButtonAriaLabel: 'Очистить',
                  cancelButtonText: 'Отмена',
                  cancelButtonAriaLabel: 'Отмена',
                },
                startScreen: {
                  recentSearchesTitle: 'История поиска',
                  noRecentSearchesText: 'Нет истории поиска',
                  saveRecentSearchButtonTitle: 'Сохранить в историю поиска',
                  removeRecentSearchButtonTitle: 'Удалить из истории поиска',
                  favoriteSearchesTitle: 'Избранное',
                  removeFavoriteSearchButtonTitle: 'Удалить из избранного',
                },
                errorScreen: {
                  titleText: 'Не удаётся получить результаты',
                  helpText: 'Проверьте подключение к интернету',
                },
                footer: {
                  selectText: 'выбрать',
                  navigateText: 'перемещаться',
                  closeText: 'закрыть',
                  searchByText: 'Поиск от',
                },
                noResultsScreen: {
                  noResultsText: 'Не найдены результаты для',
                  suggestedQueryText: 'Схожие запросы:',
                  reportMissingResultsText:
                    'Этот запрос должен иметь результаты?',
                  reportMissingResultsLinkText: 'Оставить отзыв',
                },
              },
            },
          },
          header: {
            language: 'Язык',
            search: 'Поиск',
            en: 'Английский',
            ru: 'Русский',
          },
          banner: {
            title: 'Руководство',
            subtitle: 'по изобретению велосипедов',
          },
          doc: {
            'also-translated': 'Также переведено на:',
            'edit-this-page': 'Отредактировать эту страницу',
            'next-post': 'Следующая статья',
            'previous-post': 'Предыдущая статья',
            'minutes-to-read': {
              one: 'минута на прочтение',
              few: 'минуты на прочтение',
              many: 'минут на прочтение',
            },
          },
          footer: {
            'pgp-info': 'Публичный PGP-ключ для проверки моей подписи',
          },
        },
      },
    },

    markdown: {
      theme,
      config: md => {
        md.use(mdImageLazyLoading)
        md.use(mdImageSize)
      },
    },

    shouldPreload: (link: string): boolean =>
      !(
        link.includes('travel-map') ||
        link.includes('timeline') ||
        link.includes('anime')
      ),

    vite: {
      resolve: {
        alias: {
          '~/temp': `${dirname}/temp/`,
          '~': `${dirname}/theme/`,
        },
        extensions: ['.js', '.ts', '.vue', '.css'],
      },
      css: {
        modules: {
          generateScopedName:
            mode === 'development'
              ? '[local]--[hash:base64:4]'
              : '[hash:base64:4]',
        },
      },
      plugins: [lightningcss()],
    },

    transformHtml: (
      _: unknown,
      id: string,
      { pageData }: { pageData: { relativePath: string } },
    ) => {
      if (!/[\\/]404\.html$/.test(id)) {
        links.push(pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'))
      }
    },

    buildEnd: async () => {
      let sitemap = new SitemapStream({
        hostname,
      })
      let writeStream = createWriteStream(resolvePath(outDir, 'sitemap.xml'))
      sitemap.pipe(writeStream)
      links.forEach(link => sitemap.write(link))
      sitemap.end()
      await new Promise(resolve => writeStream.on('finish', resolve))
    },

    outDir,
  })
