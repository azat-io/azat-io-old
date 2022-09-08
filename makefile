.DEFAULT_GOAL := help

clean:
	rm -Rf dist/
	find . -name ".DS_Store" -delete

#install: @ Install all dependencies required by project
install:
	pnpm install
	pnpm exec simple-git-hooks

install_prod:
	pnpm install --frozen-lockfile --prod --ignore-scripts

install_theme:
	pnpm exec tsm scripts/get-theme.ts

#update: @ Update project dependencies
update:
	pnpm update --interactive --latest

#start: @ Start development server
start:
	pnpm exec vuepress dev content

#build: @ Build production assets
build: clean
	pnpm exec vuepress build content --dest dist

test_types:
	pnpm exec vue-tsc --noEmit --pretty

lint_css:
	pnpm exec stylelint "**/*.{vue,pcss,css}"

lint_es:
	pnpm exec eslint "**/*.{vue,ts}"

test_size: build
	pnpm exec size-limit

#test: @ Run all tests
test: test_types lint test_size

lint: lint_css lint_es

#help: @ Show help for Makefile targets
help:
	@grep -E '[a-zA-Z\.\-]+:.*?@ .*$$' Makefile| tr -d '#'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
