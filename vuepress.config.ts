import { removeHtmlExtensionPlugin } from 'vuepress-plugin-remove-html-extension'
import { copyCodeButtonPlugin } from 'vuepress-plugin-copy-code-button'
import { mermaidWrapperPlugin } from 'vuepress-plugin-mermaid-wrapper'
import { umamiAnalyticsPlugin } from 'vuepress-plugin-umami-analytics'
import { editPageLinkPlugin } from 'vuepress-plugin-edit-page-link'
import postcssOklabFunction from '@csstools/postcss-oklab-function'
import mdImageLazyLoading from 'markdown-it-image-lazy-loading'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { openGraphPlugin } from 'vuepress-plugin-open-graph'
import { sitemapPlugin } from 'vuepress-plugin-sitemap2'
import { viteBundler } from '@vuepress/bundler-vite'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { postsPlugin } from 'vuepress-plugin-posts'
import { getDirname, path } from '@vuepress/utils'
import { defineUserConfig } from '@vuepress/cli'
import postcss100vhFix from 'postcss-100vh-fix'
import mdImageSize from 'markdown-it-imsize'
import autoprefixer from 'autoprefixer'
import svgLoader from 'vite-svg-loader'
import { loadTheme } from 'shiki'

import en from './locales/en.json'
import ru from './locales/ru.json'

let __dirname = getDirname(import.meta.url)

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
      file.includes('travel-map') ||
      file.includes('world-map') ||
      file.includes('timeline') ||
      file.includes('mermaid') ||
      file.includes('flag-')
    ),
  plugins: [
    shikiPlugin({
      theme,
    }),
    removeHtmlExtensionPlugin(),
    copyCodeButtonPlugin(),
    editPageLinkPlugin(),
    sitemapPlugin({
      hostname: 'https://azat.io',
    }),
    mermaidWrapperPlugin({
      themeVariables: {
        darkMode: true,
        fontFamily: 'Stem, sans-serif',
        fontSize: '15px',

        noteBkgColor: 'var(--color-background-brand)',
        noteTextColor: 'var(--color-content-inverted)',
        noteBorderColor: 'var(--color-background-brand-hover)',

        lineColor: 'var(--color-background-inverted)',
        textColor: 'var(--color-content-primary)',

        nodeBorder: 'var(--color-background-brand-hover)',
        nodeTextColor: 'var(--color-content-inverted)',

        mainBkg: 'var(--color-background-brand)',

        clusterBkg: 'var(--color-background-secondary)',
        clusterBorder: 'var(--color-border-primary)',

        actorBorder: 'var(--color-background-brand-hover)',
        labelBoxBorderColor: 'var(--color-background-inverted)',
        loopTextColor: 'var(--color-content-primary)',
      },
    }),
    umamiAnalyticsPlugin({
      id: 'effe2886-cd9d-46cd-9c95-e9dbad667822',
      src: 'https://analytics.azat.io/umami.js',
    }),
    postsPlugin(),
    openGraphPlugin({
      host: 'https://azat.io',
      defaultImage: '/assets/hero-preview.png',
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
      server: {
        watch: {
          ignored: [
            '!**/node_modules/vuepress-plugin-copy-code-button/**',
            '!**/node_modules/vuepress-plugin-edit-page-link/**',
            '!**/node_modules/vuepress-plugin-mermaid-wrapper/**',
            '!**/node_modules/vuepress-plugin-open-graph/**',
            '!**/node_modules/vuepress-plugin-posts/**',
            '!**/node_modules/vuepress-plugin-remove-html-extension/**',
            '!**/node_modules/vuepress-plugin-umami-analytics/**',
          ],
        },
      },
      optimizeDeps: {
        exclude: [
          'vuepress-plugin-copy-code-button',
          'vuepress-plugin-edit-page-link',
          'vuepress-plugin-mermaid-wrapper',
          'vuepress-plugin-open-graph',
          'vuepress-plugin-posts',
          'vuepress-plugin-remove-html-extension',
          'vuepress-plugin-umami-analytics',
        ],
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
