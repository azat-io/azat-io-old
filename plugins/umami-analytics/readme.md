# vuepress-plugin-umami-analytics

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

![Version](https://img.shields.io/npm/v/vuepress-plugin-umami-analytics.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-umami-analytics.svg)

VuePress plugin for generating Umami analytics script.

## Installation

```sh
npm install --save vuepress-plugin-umami-analytics
```

## Usage

Add plugin to your VuePress config:

```js
import { umamiAnalyticsPlugin } from 'vuepress-plugin-umami-analytics'

export default {
  plugins: [
    umamiAnalyticsPlugin({
      id: 'b198bd05-a70f-4a22-a46e-43908060c5a7',
      src: 'https://umami.example.com/umami.js',
    }),
  ],
}
```

## Contribution

See [Contributing Guide](https://github.com/azat-io/azat-io/blob/main/contributing.md).

## License

MIT
