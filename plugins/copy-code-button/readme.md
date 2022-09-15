# vuepress-plugin-copy-code-button

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

![Version](https://img.shields.io/npm/v/vuepress-plugin-copy-code-button.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-copy-code-button.svg)

VuePress plugin that adds a copy code button and an icon with the name of the code language used in your code block.

## Installation

```sh
npm install --save vuepress-plugin-copy-code-button
```

## Usage

Add plugin to your VuePress config:

```js
import { copyCodeButtonPlugin } from 'vuepress-plugin-copy-code-button'
import { shikiPlugin } from '@vuepress/plugin-shiki'

export default {
  plugins: [shikiPlugin(), copyCodeButtonPlugin()],
}
```

## Theming

Use this root variables and add your styles like this:

```css
:root {
  --copy-code-plugin-font-size: 14px;
  --copy-code-plugin-line-height: 16px;
  --copy-code-plugin-icon-size: 24px;
  --copy-code-plugin-icon-color: #fff;
  --copy-code-plugin-button-hover-color: #333;
  --copy-code-plugin-button-focus-color: #222;
  --copy-code-plugin-shadow-color: #999;
  --copy-code-title-margin: 24px;
  --copy-code-button-margin: 16px;
}
```

## Contribution

See [Contribution guide](https://github.com/azat-io/azat-io/blob/main/contributing.md).
