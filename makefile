.DEFAULT_GOAL := help

clean:
	rm -Rf dist/
	find . -name ".DS_Store" -delete

#install: @ Install all dependencies required by project
install:
	pnpm install --frozen-lockfile
	pnpm exec simple-git-hooks

i: install

install_prod:
	pnpm install --frozen-lockfile --prod

install_theme:
	pnpm exec tsm scripts/get-theme.ts

#update: @ Update project dependencies
update:
	pnpm update --recursive --interactive --latest

update_vuepress:
	pnpm add --workspace-root @vuepress/bundler-vite@next @vuepress/cli@next @vuepress/client@next @vuepress/core@next @vuepress/plugin-active-header-links@next @vuepress/plugin-shiki@next @vuepress/plugin-theme-data@next @vuepress/utils@next vuepress-vite@next
	pnpm add --workspace-root vuepress-plugin-sitemap2@next
	pnpm add @vuepress/client@next @vuepress/core@next @vuepress/utils@next --filter vuepress-plugin-copy-code-button
	pnpm add @vuepress/client@next @vuepress/core@next @vuepress/utils@next --filter vuepress-plugin-edit-page-link
	pnpm add @vuepress/client@next @vuepress/core@next @vuepress/utils@next --filter vuepress-plugin-mermaid-wrapper
	pnpm add @vuepress/core@next --filter vuepress-plugin-open-graph
	pnpm add @vuepress/client@next @vuepress/core@next --filter vuepress-plugin-posts
	pnpm add @vuepress/core@next --filter vuepress-plugin-remove-html-extension
	pnpm add @vuepress/client@next @vuepress/core@next @vuepress/utils@next --filter vuepress-plugin-umami-analytics

up: update

#start: @ Start development server
start:
	pnpm exec vuepress dev content

#build: @ Build production assets
build: clean
	pnpm exec vuepress build content --dest dist

#build: @ Build local packages
build_packages:
	pnpm --filter="./plugins/**" -r --stream build

#release: @ Publish local packages new version
release: build_packages
	pnpm exec bumpp package.json plugins/*/package.json --execute="pnpm exec standard-version --infile changelog.md --same-file --skip.bump --skip.commit --skip.tag && git add changelog.md" --commit "build: publish v%s" --tag --all
	pnpm -r publish

test_types:
	pnpm exec vue-tsc --noEmit --pretty

lint_css:
	pnpm exec stylelint "**/*.{vue,pcss,css}"

lint_es:
	pnpm exec eslint "**/*.{vue,ts}"

lint: lint_css lint_es

test_size: build
	pnpm exec size-limit

#test: @ Run all tests
test: test_types lint test_size

t: test

#help: @ Show help for Makefile targets
help:
	@grep -E '[a-zA-Z\.\-]+:.*?@ .*$$' Makefile| tr -d '#'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
