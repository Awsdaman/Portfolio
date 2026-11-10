import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { animate, stagger, utils } from 'animejs'
import { mailParts, type Bi } from '../content'
import { reduceMotion, useSite } from '../site'

export function Ext({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

/** Marks a fact still to be supplied. Visible in `npm run dev`, absent from production. */
export function Pending({ text }: { text: Bi }) {
  const { t } = useSite()
  if (!import.meta.env.DEV) return null
  return <span className="todo">{t(text)}</span>
}

export function useMail() {
  const [address, setAddress] = useState('')
  useEffect(() => setAddress(mailParts.join('@')), [])
  return address
}

export function MailLink({ className, showAddress, children }: { className?: string; showAddress?: boolean; children?: ReactNode }) {
  const address = useMail()
  return (
    <a className={className} href={address ? `mailto:${address}` : '#contact'} dir={showAddress ? 'ltr' : undefined}>
      {showAddress ? address : children}
    </a>
  )
}

/** Splits on words only: Arabic letters inside a word must stay joined. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span className="w" key={`${word}-${i}`}>
          {word}{' '}
        </span>
      ))}
    </>
  )
}

export function Title({ text, mute, className = 't' }: { text: Bi; mute?: Bi; className?: string }) {
  const { lang, t } = useSite()
  const ref = useRef<HTMLHeadingElement>(null)
  const shown = useRef(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduceMotion() || shown.current) return
    const words = [...el.querySelectorAll('.w')]
    utils.set(words, { opacity: 0, y: 8 })
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        shown.current = true
        animate(words, { opacity: 1, y: 0, duration: 400, ease: 'out(4)', delay: stagger(40) })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [lang])

  return (
    <h2 className={className} ref={ref} key={lang}>
      <Words text={t(text)} />
      {mute && (
        <em>
          <Words text={t(mute)} />
        </em>
      )}
    </h2>
  )
}

export function Study({ label, children }: { label: Bi; children: ReactNode }) {
  const { t } = useSite()
  return (
    <details className="study">
      <summary>{t(label)}</summary>
      <div className="study-body">{children}</div>
    </details>
  )
}

export const studyLabels = {
  open: { en: 'Read the case study', ar: 'اقرأ دراسة الحالة' },
  problem: { en: 'The problem', ar: 'المشكلة' },
  hard: { en: 'The hard part', ar: 'الجزء الصعب' },
  did: { en: 'What we did', ar: 'ما فعلناه' },
  proof: { en: 'Proof', ar: 'الدليل' },
}
