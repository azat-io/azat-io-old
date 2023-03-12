import { getUserLang } from '~/utils/get-user-lang.js'

export let checkUserLang = (language: string | string[]): boolean => {
  let userLang = getUserLang()
  let checkLang = (lang: string): boolean => lang === userLang
  if (typeof language === 'string') {
    return checkLang(language)
  }
  return language.some(lang => checkLang(lang))
}
