export interface Anime {
  name: string
  originName: string
  image: {
    avif: string
    webp: string
  }
  genres: (
    | 'action'
    | 'adventure'
    | 'comedy'
    | 'drama'
    | 'ecchi'
    | 'fantasy'
    | 'horror'
    | 'mecha'
    | 'mystery'
    | 'psychological'
    | 'romance'
    | 'sci-fi'
    | 'slice-of-life'
    | 'supernatural'
    | 'thriller'
  )[]
  year: number
  duration: number
  episodes: number
  score: number
}
