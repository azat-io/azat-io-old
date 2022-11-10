import fs from 'fs'

let scopes = [
  'copy-code-button',
  'edit-page-link',
  'mermaid-wrapper',
  'open-graph',
  'posts',
  'remove-html-extension',
  'umami-analytics',
]

let commitTypes = [
  {
    section: 'Builds',
    type: 'build',
  },
  {
    section: 'Chores',
    type: 'chore',
  },
  {
    section: 'Continuous Integrations',
    type: 'ci',
  },
  {
    section: 'Documentation',
    type: 'docs',
  },
  {
    section: 'Features',
    type: 'feat',
  },
  {
    section: 'Bug Fixes',
    type: 'fix',
  },
  {
    section: 'Performance Improvements',
    type: 'perf',
  },
  {
    section: 'Code Refactoring',
    type: 'refactor',
  },
  {
    section: 'Reverts',
    type: 'revert',
  },
  {
    section: 'Styles',
    type: 'style',
  },
  {
    section: 'Tests',
    type: 'test',
  },
]

interface Type {
  section: string
  scope: string
  type: string
  hidden: false
}

let types: Type[] = commitTypes.reduce(
  (accumulator: Type[], { section, type }) => [
    ...accumulator,
    ...scopes.map<Type>(scope => ({
      section,
      scope,
      type,
      hidden: false,
    })),
  ],
  [],
)

fs.writeFileSync('.versionrc', `{"types":${JSON.stringify(types)}}`)
