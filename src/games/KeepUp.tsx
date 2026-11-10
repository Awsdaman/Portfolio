import { useCallback, useEffect, useRef, useState } from 'react'
import { useSite } from '../site'

type Phase = 'idle' | 'play' | 'over'

const copy = {
  label: { en: 'Keep-up mini game. Press Space or tap to hit the ball.', ar: 'لعبة مصغرة. اضغط المسافة أو المس الشاشة لضرب الكرة.' },
  title: { en: 'Keep it up', ar: 'لا تُسقطها' },
  how: { en: 'Tap or press Space when the ball is low', ar: 'المس الشاشة أو اضغط المسافة حين تنزل الكرة' },
  play: { en: 'Play', ar: 'العب' },
  again: { en: 'Play again', ar: 'العب مرة أخرى' },
  score: { en: 'Score', ar: 'النتيجة' },
  best: { en: 'Best', ar: 'الأفضل' },
  over: { en: 'Dropped it', ar: 'سقطت الكرة' },
}

function readBest() {
  try {
    return Number(localStorage.getItem('keepup-best')) || 0
  } catch {
    return 0
  }
}

/** A small one-button game so the page itself can be played. */
export function KeepUp() {
  const { t } = useSite()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(readBest)
  const world = useRef({ x: 0, y: 0, vx: 0, vy: 0, spin: 0, gravity: 1500, hits: 0, w: 0, h: 0, trail: [] as { x: number; y: number }[] })
  const phaseRef = useRef<Phase>('idle')
  phaseRef.current = phase

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const b = world.current
    ctx.clearRect(0, 0, b.w, b.h)
    ctx.strokeStyle = 'rgba(255,255,255,.28)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, b.h - 2)
    ctx.lineTo(b.w, b.h - 2)
    ctx.stroke()
    b.trail.forEach((p, i) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 3 + i * 1.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(242,194,24,${(i + 1) / 40})`
      ctx.fill()
    })
    ctx.save()
    ctx.translate(b.x, b.y)
    ctx.rotate(b.spin)
    ctx.beginPath()
    ctx.arc(0, 0, 22, 0, Math.PI * 2)
    ctx.fillStyle = '#f2c218'
    ctx.fill()
    ctx.strokeStyle = '#141310'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(-22, 0)
    ctx.lineTo(22, 0)
    ctx.moveTo(0, -22)
    ctx.quadraticCurveTo(10, 0, 0, 22)
    ctx.stroke()
    ctx.restore()
  }, [])

  const place = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ratio = Math.min(devicePixelRatio || 1, 2)
    canvas.width = rect.width * ratio
    canvas.height = rect.height * ratio
    canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0)
    const b = world.current
    b.w = rect.width
    b.h = rect.height
    if (phaseRef.current !== 'play') {
      b.x = rect.width / 2
      b.y = rect.height * 0.28
    }
    draw()
  }, [draw])

  useEffect(() => {
    place()
    addEventListener('resize', place)
    return () => removeEventListener('resize', place)
  }, [place])

  useEffect(() => {
    if (phase !== 'play') return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const b = world.current
      const dt = Math.min((now - last) / 1000, 0.033)
      last = now
      b.vy += b.gravity * dt
      b.x += b.vx * dt
      b.y += b.vy * dt
      b.spin += b.vx * dt * 0.02
      if (b.x < 22 || b.x > b.w - 22) {
        b.vx *= -0.85
        b.x = Math.min(b.w - 22, Math.max(22, b.x))
      }
      if (b.y < 22) {
        b.y = 22
        b.vy = Math.abs(b.vy) * 0.4
      }
      b.trail.push({ x: b.x, y: b.y })
      if (b.trail.length > 12) b.trail.shift()
      draw()
      if (b.y > b.h - 24) {
        setPhase('over')
        setBest((prev) => {
          if (b.hits <= prev) return prev
          try {
            localStorage.setItem('keepup-best', String(b.hits))
          } catch {
            // Best score simply lasts for this visit.
          }
          return b.hits
        })
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, draw])

  const start = () => {
    const b = world.current
    Object.assign(b, { x: b.w / 2, y: b.h * 0.35, vx: 60, vy: -120, gravity: 1500, hits: 0, trail: [] })
    setScore(0)
    setPhase('play')
    canvasRef.current?.focus({ preventScroll: true })
  }

  const hit = (fromX?: number) => {
    const b = world.current
    if (phaseRef.current !== 'play' || b.y < b.h * 0.32) return
    const offset = fromX === undefined ? (b.x < b.w / 2 ? -14 : 14) : b.x - fromX
    b.vy = -Math.min(900, 700 + b.hits * 6)
    b.vx = Math.max(-360, Math.min(360, b.vx * 0.5 + offset * 3.2))
    b.gravity = Math.min(2300, b.gravity * 1.02)
    b.hits += 1
    setScore(b.hits)
  }

  return (
    <div className="keepup">
      <div className="ku-head">
        <h2>{t(copy.title)}</h2>
        <p>
          {t(copy.score)} <b>{score}</b> · {t(copy.best)} <b>{best}</b>
        </p>
      </div>
      <div className="ku-stage">
        <canvas
          ref={canvasRef}
          tabIndex={phase === 'play' ? 0 : -1}
          aria-label={t(copy.label)}
          onPointerDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            hit(e.clientX - rect.left)
          }}
          onKeyDown={(e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
              e.preventDefault()
              hit()
            }
          }}
        />
        {phase !== 'play' && (
          <div className="ku-over">
            <p role="status">{phase === 'over' ? t(copy.over) : t(copy.how)}</p>
            <button className="btn p" type="button" onClick={start}>
              {phase === 'over' ? t(copy.again) : t(copy.play)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
