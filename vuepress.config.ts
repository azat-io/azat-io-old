import postcssOklabFunction from '@csstools/postcss-oklab-function'
import mdImageLazyLoading from 'markdown-it-image-lazy-loading'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { viteBundler } from '@vuepress/bundler-vite'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { defineUserConfig } from '@vuepress/cli'
import postcss100vhFix from 'postcss-100vh-fix'
import mdImageSize from 'markdown-it-imsize'
import autoprefixer from 'autoprefixer'
import svgLoader from 'vite-svg-loader'
import { path } from '@vuepress/utils'
import { loadTheme } from 'shiki'

import { cleanUrlsPlugin } from './plugins/clean-urls'
import { copyCodePlugin } from './plugins/copy-code'
import { postsPlugin } from './plugins/posts'
import { seoPlugin } from './plugins/seo'
import en from './locales/en.json'
import ru from './locales/ru.json'

export default (async () => {
  let theme = await loadTheme(path.resolve(__dirname, 'theme/gruvbox.json'))
  return defineUserConfig({
    lang: 'en-US',
    title: 'Azat S.',
    description: 'Personal blog by Azat S.',
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
          rel: 'prefetch',
          href: '/fonts/stem-regular.woff2',
          type: 'font/woff2',
          as: 'font',
        },
      ],
      [
        'link',
        {
          rel: 'prefetch',
          href: '/fonts/stem-bold.woff2',
          type: 'font/woff2',
          as: 'font',
        },
      ],
    ],
    locales: {
      '/en': {
        lang: 'en-US',
        title: 'Azat S.',
      },
      '/ru': {
        lang: 'ru-RU',
        title: 'Азат Ш.',
      },
    },
    theme: {
      name: 'azat-io-theme',
      layouts: {
        Layout: path.resolve(__dirname, 'pages/layout.vue'),
        404: path.resolve(__dirname, 'pages/not-found.vue'),
      },
    },
    public: path.resolve(__dirname, 'public'),
    open: true,
    alias: {
      '~': __dirname,
    },
    clientConfigFile: path.resolve(__dirname, 'client'),
    plugins: [
      shikiPlugin({
        theme,
      }),
      cleanUrlsPlugin(),
      copyCodePlugin(),
      postsPlugin(),
      seoPlugin(),
      themeDataPlugin({
        themeData: {
          locales: {
            '/en': en,
            '/ru': ru,
          },
        },
      }),
    ],
    extendsMarkdown: md => {
      md.use(mdImageLazyLoading)
      md.use(mdImageSize)
    },
    bundler: viteBundler({
      viteOptions: {
        css: {
          postcss: {
            plugins: [postcssOklabFunction, postcss100vhFix, autoprefixer],
          },
        },
        plugins: [
          svgLoader({
            svgo: false,
          }),
        ],
      },
    }),
  })
})()
