# vuepress-plugin-open-graph

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

![Version](https://img.shields.io/npm/v/vuepress-plugin-open-graph.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-open-graph.svg)

VuePress plugin for generating open graph meta tags.

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
      host: 'https://azat.io',
      twitterCard: 'summary',
      twitterSite: '@azat_io',
    }),
  ],
}
```

## Contribution

See [Contribution guide](https://github.com/azat-io/azat-io/blob/main/contributing.md).
