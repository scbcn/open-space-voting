import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { en } from '../i18n/locales/en'
import { es } from '../i18n/locales/es'

type Language = 'en' | 'es'

type LanguageStore = {
  language: Language
  translations: typeof en | typeof es
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'es',
      translations: es,
      setLanguage: (lang) => set({ 
        language: lang, 
        translations: lang === 'en' ? en : es 
      }),
    }),
    {
      name: 'language-storage',
    }
  )
) 