# vuepress-plugin-edit-page-link

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

![Version](https://img.shields.io/npm/v/vuepress-plugin-edit-page-link.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-edit-page-link.svg)

VuePress v2 plugin for getting edit page in repository link. In order to use this plugin, your project must be a git repository with a remote "origin" added.

## Installation

```sh
npm install --save vuepress-plugin-edit-page-link
```

## Usage

Add plugin to your VuePress config:

```js
import { editPageLinkPlugin } from 'vuepress-plugin-edit-page-link'

export default {
  plugins: [editPageLinkPlugin()],
}
```

And use it in your Vue components:

```vue
<script setup>
import { useEditPageLink } from 'vuepress-plugin-edit-page-link/client'

const editPageLink = useEditPageLink()
<script>

<template>
  <a
    :href="editPageLink"
    target="_blank"
    rel="noreferrer"
  >
    Edit page on GitHub
  </a>
</template>
```

## Contribution

See [Contribution guide](https://github.com/azat-io/azat-io/blob/main/contributing.md).
