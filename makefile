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
