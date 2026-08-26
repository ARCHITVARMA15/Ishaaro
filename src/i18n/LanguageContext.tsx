import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { STRINGS, type Strings } from './strings'

export type Language = 'en' | 'gu'

const STORAGE_KEY = 'ishaaro:language'

interface LanguageContextValue {
  lang: Language
  toggleLang: () => void
  setLang: (lang: Language) => void
  strings: Strings
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'gu' ? 'gu' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage unavailable (private mode, disabled storage) — the
      // toggle still works for the current session, it just won't persist.
    }
  }, [lang])

  const setLang = (next: Language) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === 'en' ? 'gu' : 'en'))

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, toggleLang, setLang, strings: STRINGS[lang] }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
