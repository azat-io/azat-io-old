# vuepress-plugin-posts

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

![Version](https://img.shields.io/npm/v/vuepress-plugin-posts.svg)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-posts.svg)

VuePress plugin for blogging.

## Installation

```sh
npm install --save vuepress-plugin-posts
```

## Usage

Add plugin to your VuePress config:

```js
import { postsPlugin } from 'vuepress-plugin-posts'

export default {
  plugins: [postsPlugin()],
}
```

Add frontmatter markup to your blog posts:

```md
---
title: My awesome article
date: 2022-02-16
---
```

Use hooks in your components:

- `usePosts` - To get post list for current language

- `usePost` - Get data for current, previous and next post

Post has the following data:

- `availableLanguages` - Links to this post in other languages
- `formattedDate` - Post date
- `date` - Unformatted date
- `language` - Post language
- `path` - Link to post URL
- `readingTime` - Reading time for post in minutes
- `title` - Post title

## Example

```vue
<script setup>
import { usePosts } from 'vuepress-plugin-posts/client'

let posts = usePosts()
</script>

<template>
  <div v-for="{ title, path, formattedDate } in posts" :key="title">
    <RouterLink :to="path">
      <h3 v-text="title" />
    </RouterLink>
    <span v-text="formattedDate" />
  </div>
</template>
```

## Contribution

See [Contribution guide](https://github.com/azat-io/azat-io/blob/main/contributing.md).
