import type { PluginFunction } from '@vuepress/core'

import { execa } from 'execa'

let { stdout: gitRepositoryStdout } = await execa('git', [
  'remote',
  'get-url',
  'origin',
])

if (/^git@/.test(gitRepositoryStdout)) {
  let host: string =
    gitRepositoryStdout.match(/git@(.*):.*$/)?.[1] ?? 'github.com'
  let fullName: string =
    gitRepositoryStdout.match(/git@.*:(.*).git$/)?.[1] ?? ''
  gitRepositoryStdout = `https://${host}/${fullName}`
}

if (gitRepositoryStdout.endsWith('.git')) {
  gitRepositoryStdout = gitRepositoryStdout.substring(
    0,
    gitRepositoryStdout.length - 4,
  )
}

let repository = gitRepositoryStdout

let { stdout: gitBranchStdout } = await execa('git', [
  'branch',
  '--show-current',
])

let last = (arr: string[]): string => arr[arr.length - 1]
let branch = last(gitBranchStdout.split('/'))

export let editPageLinkPlugin = (): PluginFunction => app => {
  let content = app.dir
    .source()
    .replace(process.cwd(), '')
    .replace(/^\//g, '')
    .replace(/\/$/g, '')

  return {
    name: 'vuepress-plugin-edit-page-link',
    define: {
      __EDIT_PAGE_LINK_REPOSITORY__: repository,
      __EDIT_PAGE_CONTENT__: content,
      __EDIT_PAGE_BRANCH__: branch,
    },
  }
}
