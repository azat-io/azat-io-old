import type { UserConfig } from 'vitepress'
import type { ConfigEnv } from 'vite'

import { imgLazyload } from '@mdit/plugin-img-lazyload'
import lightningcss from 'vite-plugin-lightningcss'
import { resolve as resolvePath } from 'node:path'
import { defineConfigWithTheme } from 'vitepress'
import { imgSize } from '@mdit/plugin-img-size'
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
          header: {
            language: 'Язык',
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
        md.use(imgLazyload)
        md.use(imgSize)
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

    transformHtml: (_, id, { pageData }) => {
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
