export interface Post {
  availableLanguages: {
    language: string
    path: string
  }[]
  date: string
  language: string
  path: string
  readingTime: number
  title: string
}
