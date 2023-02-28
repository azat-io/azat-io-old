import type { UserConfig } from 'vitepress'
import type { ConfigEnv } from 'vite'

import lightningcss from 'vite-plugin-lightningcss'
import { defineConfigWithTheme } from 'vitepress'
import svgLoader from 'vite-svg-loader'
import { loadTheme } from 'shiki'
import path from 'path'

import { getDirname } from './theme/utils/get-dirname.js'

let dirname = getDirname(import.meta.url)

let theme = await loadTheme(path.resolve(dirname, 'theme/layout/gruvbox.json'))

export default ({ mode }: ConfigEnv): UserConfig =>
  defineConfigWithTheme({
    cleanUrls: true,
    title: 'Azat S.',

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
          layout: {
            'also-translated': 'Also translated into:',
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
          layout: {
            'also-translated': 'Также переведено на:',
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
    },

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
