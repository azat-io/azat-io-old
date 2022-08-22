export interface Post {
  availableLanguages: {
    language: string
    path: string
  }[]
  formattedDate: string
  date: string
  language: string
  path: string
  readingTime: number
  title: string
}
