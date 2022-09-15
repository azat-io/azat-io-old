# vuepress-plugin-open-graph

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

![Version](https://img.shields.io/npm/v/vuepress-plugin-open-graph.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-open-graph.svg)

VuePress plugin for generating open graph meta tags to improve SEO.

## Installation

```sh
npm install --save vuepress-plugin-open-graph
```

## Usage

Add plugin to your VuePress config:

```js
import { openGraphPlugin } from 'vuepress-plugin-open-graph'

export default {
  plugins: [
    openGraphPlugin({
      /* options */
    }),
  ],
}
```

That's all. Just use frontmatter options in your Markdown files:

```md
---
title: Post title
description: Post description
date: Post publish date
image: URL to post preview
---
```

## Options

### host

- Type: `string`

- Required: `true`

- Details:

  The domain name where the current site is deployed, the plugin needs this option to work.

### defaultImage

- Type: `string`

- Required: `false`

- Details:

  Link to default open graph image. This image will be used unless otherwise specified.

### twitterCard

- Type: `'summary' | 'summary_large_image'`

- Required: `false`

- Details:

  Twitter card type for a beautiful visual display of the tweet with post link. [Read more](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards).

### twitterSite

- Type: `string`

- Required: `false`

- Details:

  Twitter username of your website.

## Contribution

See [Contribution guide](https://github.com/azat-io/azat-io/blob/main/contributing.md).
