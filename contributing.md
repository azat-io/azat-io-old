# Contribution guide

Thank you for investing your time in contributing to my project!

## VuePress plugins

This repository contains some plugins for VuePress v2.

If you spot a problem with one of my plugins, search if an issue already exists. If a related issue doesn't exist, you can open a [new issue](https://github.com/azat-io/azat-io/issues/new).

Also you can help me to solve [existing issue](https://github.com/azat-io/azat-io/issues) or your personal issue that occurred while using my VuePress plugins.

## Article translations

I will be very happy if you help me to translate my articles into any language.

All articles are stored in the `content/` folder. This directory contains folders with articles named according to the [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code according to the languages of the articles.

Please create a language code folder if it doesn't exist and add the markdown file there. The file name must match the file name of the original article.

For example, you want to translate into Chinese an article that is located at `content/en/foo.md`. Please create your translation at `content/zh/foo.md`.

## Development

If you want to run the project locally, please follow these steps:

1. Install Node.js v18 and pnpm

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
