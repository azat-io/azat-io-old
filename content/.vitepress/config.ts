import type { UserConfig } from 'vitepress'
import type { ConfigEnv } from 'vite'

import mdImageLazyLoading from 'markdown-it-image-lazy-loading'
import lightningcss from 'vite-plugin-lightningcss'
import { defineConfigWithTheme } from 'vitepress'
import mdImageSize from 'markdown-it-imsize'
import svgLoader from 'vite-svg-loader'
import { loadTheme } from 'shiki'
import path from 'path'

import { getDirname } from './theme/utils/get-dirname.js'

let dirname = getDirname(import.meta.url)

let theme = await loadTheme(path.resolve(dirname, 'theme/layout/gruvbox.json'))

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
          header: {
            language: 'Language',
            en: 'English',
            ru: 'Russian',
          },
          hero: {
            subtitle: 'of reinventing the wheel',
            title: 'Manual',
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
            'made-with': 'Made with',
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
          header: {
            language: 'Язык',
            en: 'Английский',
            ru: 'Русский',
          },
          hero: {
            subtitle: 'по изобретению велосипедов',
            title: 'Руководство',
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
            'made-with': 'Сделано с',
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

    shouldPreload: (link: string): boolean => !link.includes('world-map'),

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
      plugins: [
        lightningcss(),
        svgLoader({
          svgo: false,
        }),
      ],
    },

    outDir: `${dirname}/../../dist/`,
  })
