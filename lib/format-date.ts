export let formatDate = (lang: string, date: string): string =>
  new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
