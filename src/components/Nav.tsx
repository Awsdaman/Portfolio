import { hero } from '../content'
import { useSite } from '../site'

const sections = [
  { href: '#work', label: { en: 'Security work', ar: 'الأمن' } },
  { href: '#built', label: { en: 'Projects', ar: 'المشاريع' } },
  { href: '#path', label: { en: 'Experience', ar: 'الخبرة' } },
  { href: '#creds', label: { en: 'Credentials', ar: 'الشهادات' } },
  { href: '#contact', label: { en: 'Contact', ar: 'تواصل' } },
]

export function Nav() {
  const { lang, theme, t, toggleLang, toggleTheme } = useSite()
  return (
    <header className="nav">
      <div className="bar">
        <a className="who" href="#top">
          {t(hero.name)}
        </a>
        <nav className="links" aria-label={lang === 'ar' ? 'الأقسام' : 'Sections'}>
          {sections.map((s) => (
            <a key={s.href} href={s.href}>
              {t(s.label)}
            </a>
          ))}
        </nav>
        <div className="ctrl">
          <button className="ib" type="button" onClick={toggleLang} lang={lang === 'ar' ? 'en' : 'ar'} dir={lang === 'ar' ? 'ltr' : 'rtl'}>
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <button
            className="ib ic"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? (lang === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light theme') : lang === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark theme'
            }
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
