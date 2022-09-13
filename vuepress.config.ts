import { removeHtmlExtensionPlugin } from 'vuepress-plugin-remove-html-extension'
import { umamiAnalyticsPlugin } from 'vuepress-plugin-umami-analytics'
import postcssOklabFunction from '@csstools/postcss-oklab-function'
import mdImageLazyLoading from 'markdown-it-image-lazy-loading'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { openGraphPlugin } from 'vuepress-plugin-open-graph'
import { mermaidJsPlugin } from 'vuepress-plugin-mermaid-js'
import { viteBundler } from '@vuepress/bundler-vite'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { defineUserConfig } from '@vuepress/cli'
import postcss100vhFix from 'postcss-100vh-fix'
import mdImageSize from 'markdown-it-imsize'
import autoprefixer from 'autoprefixer'
import svgLoader from 'vite-svg-loader'
import { path } from '@vuepress/utils'
import { loadTheme } from 'shiki'

import { copyCodePlugin } from './plugins/copy-code/index.js'
import { sitemapPlugin } from './plugins/sitemap/index.js'
import { postsPlugin } from './plugins/posts/index.js'
import en from './locales/en.json'
import ru from './locales/ru.json'

let theme = await loadTheme(path.resolve(__dirname, 'layout/gruvbox.json'))

export default defineUserConfig({
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
        rel: 'preload',
        href: '/fonts/stem-regular.woff2',
        type: 'font/woff2',
        as: 'font',
        crossorigin: true,
      },
    ],
    [
      'link',
      {
        rel: 'preload',
        href: '/fonts/stem-bold.woff2',
        type: 'font/woff2',
        as: 'font',
        crossorigin: true,
      },
    ],
  ],
  locales: {
    '/': {
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
  },
  open: true,
  public: path.resolve(__dirname, 'public'),
  pagePatterns:
    process.env.NODE_ENV === 'production'
      ? ['**/*.md', '!index.md']
      : ['**/*.md'],
  alias: {
    '~': __dirname,
  },
  clientConfigFile: path.resolve(__dirname, 'client'),
  shouldPrefetch: (file: string) =>
    !(
      file.includes('mermaid') ||
      file.includes('flag-') ||
      file.includes('world-map')
    ),
  plugins: [
    shikiPlugin({
      theme,
    }),
    removeHtmlExtensionPlugin(),
    copyCodePlugin(),
    sitemapPlugin({
      hostname: 'https://azat.io',
    }),
    mermaidJsPlugin(),
    postsPlugin(),
    umamiAnalyticsPlugin({
      id: 'b198bd05-a70f-4a22-a46e-43908060c5a7',
      src: 'https://analytics.azat.io/umami.js',
    }),
    openGraphPlugin({
      host: 'https://azat.io',
      twitterCard: 'summary',
      twitterSite: '@azat_io',
    }),
    themeDataPlugin({
      themeData: {
        locales: {
          '/': en,
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
      build: {
        chunkSizeWarningLimit: 1111,
      },
      css: {
        postcss: {
          plugins: [
            postcssOklabFunction({
              subFeatures: {
                displayP3: false,
              },
            }),
            postcss100vhFix,
            autoprefixer,
          ],
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
