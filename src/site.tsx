import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Bi } from './content'

export type Lang = 'en' | 'ar'
export type Theme = 'dark' | 'light'

type Site = {
  lang: Lang
  theme: Theme
  t: (text: Bi) => string
  toggleLang: () => void
  toggleTheme: () => void
}

const SiteContext = createContext<Site | null>(null)

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Private windows can refuse storage. The switch still works for this visit.
  }
}

const defaultTitles: Record<Lang, string> = {
  en: 'Aous Damanhoori, Cybersecurity Analyst',
  ar: 'أوس دمنهوري، محلل أمن سيبراني',
}

export function SiteProvider({ children, titles = defaultTitles }: { children: ReactNode; titles?: Record<Lang, string> }) {
  const root = document.documentElement
  const [lang, setLang] = useState<Lang>(root.dataset.lang === 'ar' ? 'ar' : 'en')
  const [theme, setTheme] = useState<Theme>(root.dataset.theme === 'light' ? 'light' : 'dark')

  useEffect(() => {
    root.dataset.lang = lang
    root.lang = lang === 'ar' ? 'ar-SA' : 'en'
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = titles[lang]
  }, [lang, root, titles])

  useEffect(() => {
    root.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0b' : '#f6f6f3')
  }, [theme, root])

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next = current === 'ar' ? 'en' : 'ar'
      save('lang', next)
      return next
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      save('theme', next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ lang, theme, t: (text: Bi) => text[lang], toggleLang, toggleTheme }), [lang, theme, toggleLang, toggleTheme])
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const site = useContext(SiteContext)
  if (!site) throw new Error('useSite must be used inside SiteProvider')
  return site
}

export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const canHover = () => matchMedia('(hover: hover)').matches
