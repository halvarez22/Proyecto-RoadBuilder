import React, { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'es' | 'en'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    const stored = window.localStorage.getItem('rb-lang')
    if (stored === 'es' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = (value: Lang) => {
    setLangState(value)
    window.localStorage.setItem('rb-lang', value)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

