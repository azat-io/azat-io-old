# vuepress-plugin-remove-html-extension

![Version](https://img.shields.io/npm/v/vuepress-plugin-remove-html-extension.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-remove-html-extension.svg)

VuePress plugin for generating clean urls.

## Installation

```sh
npm install --save vuepress-plugin-remove-html-extension
```

## Usage

Add plugin to your VuePress config:

```js
import { removeHtmlExtensionPlugin } from 'vuepress-plugin-remove-html-extension'

export default {
  plugins: [removeHtmlExtensionPlugin()],
}
```
