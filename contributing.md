# Contribution guide

Thank you for investing your time in contributing to my project!

## VuePress plugins

This repository contains few plugins for VuePress v2:

- [vuepress-plugin-copy-code-button](https://github.com/azat-io/azat-io/tree/main/plugins/copy-code-button): Plugin for adding copy code button and label with the name of the language
- [vuepress-plugin-edit-page-link](https://github.com/azat-io/azat-io/tree/main/plugins/edit-page-link): Plugin for getting edit page in repository link
- [vuepress-plugin-mermaid-wrapper](https://github.com/azat-io/azat-io/tree/main/plugins/mermaid-wrapper): Plugin for using Mermaid.js
- [vuepress-plugin-open-graph](https://github.com/azat-io/azat-io/tree/main/plugins/open-graph): Plugin for generating open graph meta tags
- [vuepress-plugin-posts](https://github.com/azat-io/azat-io/tree/main/plugins/posts): Plugin for blogging
- [vuepress-plugin-remove-html-extension](https://github.com/azat-io/azat-io/tree/main/plugins/remove-html-extension): Plugin for generating clean urls
- [vuepress-plugin-umami-analytics](https://github.com/azat-io/azat-io/tree/main/plugins/umami-analytics): Plugin for using Umami analytics

If you spot a problem with one of my plugins, search if an issue already exists. If a related issue doesn't exist, you can open a [new issue](https://github.com/azat-io/azat-io/issues/new).

Also you can help me to solve [existing issue](https://github.com/azat-io/azat-io/issues) or your personal issue that occurred while using my VuePress plugins.

## Article translations

I will be very happy if you help me to translate articles of my [blog](https://azat.io) into any language.

All articles are stored in the `content/` folder. This directory contains folders with articles named according to the [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code according to the languages of the articles.

Please create a language code folder if it doesn't exist and add the markdown file there. The file name must match the file name of the original article.

For example, you want to translate into Chinese an article that is located at `content/en/foo.md`. Please create your translation at `content/zh/foo.md`.

## Development

If you want to run the project locally, please follow these steps:

1. Install Node.js v18 and pnpm (I recommend to use [asdf](https://asdf-vm.com))

2. Clone repo:

```
git clone git@github.com:azat-io/azat-io.git
```

3. Install dependencies:

```
make install
```

4. Start server

```
make start
```

Happy hacking! 🦥
