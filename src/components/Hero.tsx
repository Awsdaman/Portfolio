import { useEffect, useRef } from 'react'
import { animate, stagger, utils } from 'animejs'
import { hero, links } from '../content'
import { canHover, reduceMotion, useSite } from '../site'
import { Ext, MailLink } from './ui'

type Dot = { x: number; y: number; bad: boolean }

/** The scan field: every dot is checked once, and the ones that fail are removed for good. */
function useScanField(canvasRef: React.RefObject<HTMLCanvasElement | null>, lang: string, theme: string) {
  const redraw = useRef<() => void>(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const root = document.documentElement
    const pointer = { x: -999, y: -999 }
    let dots: Dot[] = []
    let width = 0
    let height = 0
    let progress = reduceMotion() ? 1 : 0
    let frame = 0

    const paint = () => {
      frame = 0
      ctx.clearRect(0, 0, width, height)
      const style = getComputedStyle(root)
      const rgb = style.getPropertyValue('--dot').trim()
      const accent = style.getPropertyValue('--ac').trim()
      const rtl = root.dir === 'rtl'
      const band = width * 0.22
      const front = -band + (width + band * 2) * progress
      for (const d of dots) {
        const along = front - (rtl ? width - d.x : d.x)
        const ex = (d.x - width / 2) / (width * 0.42)
        const ey = (d.y - height * 0.46) / (height * 0.42)
        const clear = Math.min(1, Math.max(0.1, Math.hypot(ex, ey) - 0.35))
        let alpha = 0.13 * clear
        let refused = false
        if (along < 0) alpha = progress > 0 ? 0.05 * clear : 0
        else if (along < band) {
          const t = 1 - along / band
          alpha = Math.max(alpha, 0.75 * t * (0.35 + 0.65 * clear))
          if (d.bad) {
            refused = true
            alpha = Math.max(0.5, alpha)
          }
        } else if (d.bad) alpha = 0
        const near = Math.hypot(d.x - pointer.x, d.y - pointer.y)
        if (near < 130 && !(d.bad && along >= band)) alpha = Math.max(alpha, 0.55 * (1 - near / 130))
        if (alpha <= 0.004) continue
        ctx.beginPath()
        ctx.arc(d.x, d.y, refused ? 1.9 : 1.2, 0, Math.PI * 2)
        ctx.fillStyle = refused ? accent : `rgba(${rgb},${alpha})`
        ctx.fill()
      }
    }
    const draw = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    redraw.current = draw

    const size = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      const gap = width < 700 ? 22 : 28
      dots = []
      let i = 0
      for (let y = gap / 2; y < height; y += gap)
        for (let x = gap / 2; x < width; x += gap) dots.push({ x, y, bad: ((++i * 2654435761) >>> 0) % 100 < 7 })
      draw()
    }
    size()
    addEventListener('resize', size)

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      draw()
    }
    const host = canvas.parentElement
    if (canHover() && !reduceMotion()) host?.addEventListener('pointermove', move)

    let sweep: ReturnType<typeof animate> | undefined
    const start = () => {
      root.classList.add('ready')
      if (reduceMotion()) return
      const state = { p: 0 }
      sweep = animate(state, { p: 1, duration: 2100, ease: 'inOut(2)', onUpdate: () => { progress = state.p; draw() } })
      const rises = [...document.querySelectorAll('.rise')]
      utils.set(rises, { opacity: 0, y: 12 })
      animate(rises, { opacity: 1, y: 0, duration: 500, ease: 'out(4)', delay: stagger(50, { start: 80 }) })
    }
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 450))]).then(start)

    return () => {
      removeEventListener('resize', size)
      host?.removeEventListener('pointermove', move)
      sweep?.cancel()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [canvasRef])

  useEffect(() => {
    redraw.current()
  }, [lang, theme])
}

export function Hero() {
  const { lang, theme, t } = useSite()
  const canvas = useRef<HTMLCanvasElement>(null)
  useScanField(canvas, lang, theme)

  return (
    <section className="hero" id="top">
      <canvas ref={canvas} id="field" aria-hidden="true" />
      <div className="hero-in">
        <p className="role rise">{t(hero.role)}</p>
        <h1 className="rise">{t(hero.name)}</h1>
        <p className="lede rise">{t(hero.lede)}</p>
        <div className="cta rise">
          <MailLink className="btn p">{lang === 'ar' ? 'راسلني' : 'Email me'}</MailLink>
          <Ext className="btn" href={links.linkedin}>
            {lang === 'ar' ? 'تواصل عبر لينكدإن' : 'Message me on LinkedIn'}
          </Ext>
        </div>
      </div>
      <ul className="facts rise">
        {hero.facts.map((f) => (
          <li key={f.title.en}>
            <b>{t(f.title)}</b>
            {f.meta && t(f.meta)}
          </li>
        ))}
      </ul>
    </section>
  )
}
