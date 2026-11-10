import { useEffect, useRef } from 'react'
import { animate, onScroll, stagger } from 'animejs'
import { statement } from '../content'
import { reduceMotion, useSite } from '../site'

/** Words brighten as you scroll. Both ends of the range pass AA, so it reads at any point. */
export function Statement() {
  const { lang, theme, t } = useSite()
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduceMotion()) return
    const style = getComputedStyle(document.documentElement)
    const words = [...el.querySelectorAll('span')]
    const anim = animate(words, {
      color: [style.getPropertyValue('--dim').trim(), style.getPropertyValue('--tx').trim()],
      duration: 400,
      ease: 'linear',
      delay: stagger(40),
      autoplay: onScroll({ target: el, enter: '82% top', leave: '42% bottom', sync: 0.7 }),
    })
    return () => {
      anim.revert()
    }
  }, [lang, theme])

  return (
    <div className="wrap state">
      <p ref={ref} key={lang}>
        {t(statement)
          .split(' ')
          .map((word, i) => (
            <span key={`${word}-${i}`}>{word} </span>
          ))}
      </p>
    </div>
  )
}
