.DEFAULT_GOAL := help

#start: @ Start development server
start:
	pnpm exec tsm ./content/.vitepress/data.ts
	pnpm exec vitepress dev content --port 8080 --host --open

#build: @ Build production assets
build: clean
	pnpm exec vitepress build content

clean:
	rm -Rf dist/
	find . -name ".DS_Store" -delete

#install: @ Install all dependencies required by project
install:
	pnpm install --frozen-lockfile
	pnpm exec simple-git-hooks

install_prod:
	pnpm install --frozen-lockfile --prod

install_theme:
	pnpm exec tsm scripts/get-theme.ts

#update: @ Update project dependencies
update:
	pnpm update --interactive --latest

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
	pnpm exec stylelint "content/.vitepress/**/*.{vue,css}"

lint_es:
	pnpm exec eslint "content/.vitepress/**/*.{vue,ts}"

lint: lint_css lint_es

test_size: build
	pnpm exec size-limit

#test: @ Run all tests
test: test_types lint test_size

t: test

#help: @ Show help for Makefile targets
help:
	@grep -E '[a-zA-Z\.\-]+:.*?@ .*$$' Makefile| tr -d '#'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
