# vuepress-plugin-mermaid-js

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

![Version](https://img.shields.io/npm/v/vuepress-plugin-mermaid-js.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-mermaid-js.svg)

VuePress plugin provides a global component wrapping [Mermaid](https://mermaid-js.github.io/mermaid/). Mermaid is a JavaScript library which lets you create diagrams and visualizations using text and code.

## Installation

```sh
npm install --save vuepress-plugin-mermaid-js
```

## Usage

Add plugin to your VuePress config:

```js
import { mermaidJsPlugin } from 'vuepress-plugin-mermaid-js'

export default {
  plugins: [
    mermaidJsPlugin({
      /* options */
    }),
  ],
}
```

That's all. You can use Mermaid in you Markdown files:

## Options

### themeVariables

- Type: `object`

- Required: `false`

- Details:

  Style customization of Mermaid theme. See [Mermaid theme variables](https://mermaid-js.github.io/mermaid/#/theming?id=customizing-themes-with-themevariables).

## Contribution

See [Contribution guide](https://github.com/azat-io/azat-io/blob/main/contributing.md).
