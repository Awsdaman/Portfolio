import { useEffect, useRef, useState } from 'react'
import { animate, createAnimatable, onScroll } from 'animejs'
import { categories, competitions, courses, cvAvailable, headlineCert, links, path, programmes, projects, threat, tools, type Item } from '../content'
import { canHover, reduceMotion, useSite } from '../site'
import { Ext, MailLink, Pending, Study, studyLabels, Title, useMail } from './ui'

function ItemList({ items }: { items: Item[] }) {
  const { t } = useSite()
  return (
    <ul className="ln">
      {items.map((item) => (
        <li key={item.title.en}>
          {t(item.title)}
          {item.meta && <small>{t(item.meta)}</small>}
        </li>
      ))}
    </ul>
  )
}

export function Threat() {
  const { lang, t } = useSite()
  const s = threat.study
  return (
    <section className="s wrap" aria-labelledby="threat-h">
      <div className="threat">
        <div>
          <div className="big">{threat.count}</div>
          <p>{t(threat.countLabel)}</p>
        </div>
        <div className="d">
          <h2 id="threat-h">{t(threat.title)}</h2>
          <p>{t(threat.intro)}</p>
          <ul className="tags" dir="ltr">
            {threat.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <Pending text={threat.pending} />
        </div>
        <div className="threat-study">
          <Study label={studyLabels.open}>
            <div className="grid4">
              <div><h3>{t(studyLabels.problem)}</h3><p>{t(s.problem)}</p></div>
              <div><h3>{t(studyLabels.hard)}</h3><p>{t(s.hard)}</p></div>
              <div><h3>{t(studyLabels.did)}</h3><p>{t(s.did)}</p></div>
              <div><h3>{t(studyLabels.proof)}</h3><p>{t(s.proof)}</p></div>
            </div>
          </Study>
        </div>
      </div>
      <div className="grid two">
        <div className="card">
          <h3>{lang === 'ar' ? 'المسابقات' : 'Competitions'}</h3>
          <ItemList items={competitions} />
        </div>
        <div className="card">
          <h3>{lang === 'ar' ? 'المجالات التي أحلّها' : 'Categories I solve'}</h3>
          <ItemList items={categories} />
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  const { lang, t } = useSite()
  const badge = useRef<HTMLSpanElement>(null)
  const [hoverable] = useState(() => canHover() && !reduceMotion())
  const follow = useRef<ReturnType<typeof createAnimatable> | null>(null)

  useEffect(() => {
    if (hoverable && badge.current) follow.current = createAnimatable(badge.current, { x: 320, y: 320, ease: 'out(3)' })
  }, [hoverable])

  const show = (on: boolean) => {
    if (badge.current) badge.current.style.opacity = on ? '1' : '0'
  }
  const move = (e: React.PointerEvent) => {
    const a = follow.current as unknown as { x: (v: number) => void; y: (v: number) => void } | null
    a?.x(e.clientX + 14)
    a?.y(e.clientY + 14)
  }

  return (
    <section className="s wrap" id="built">
      <Title text={{ en: 'Software I ship.', ar: 'برمجيات أطلقها.' }} mute={{ en: 'On my own time.', ar: 'في وقتي الخاص.' }} />
      <div className="stack">
        {projects.map((p) => {
          const open = hoverable && p.live
          return (
            <article
              key={p.name.en}
              className={`pc${p.colors ? '' : ' plain'}${open ? ' opens' : ''}`}
              ref={(el) => {
                if (el && p.colors) {
                  el.style.setProperty('--c-bg', p.colors.bg)
                  el.style.setProperty('--c-tx', p.colors.text)
                }
              }}
              onPointerEnter={open ? () => show(true) : undefined}
              onPointerLeave={open ? () => show(false) : undefined}
              onPointerMove={open ? move : undefined}
              onClick={open ? (e) => { if (!(e.target as Element).closest('a')) window.open(p.live, '_blank', 'noopener') } : undefined}
            >
              <div className="tx">
                <div>
                  <h3>{t(p.name)}</h3>
                  <p>{t(p.body)}</p>
                </div>
                <div className="acts">
                  {p.live && <Ext href={p.live}>{lang === 'ar' ? 'جرّبها مباشرة' : 'Play it live'}</Ext>}
                  <Ext href={p.repo}>GitHub</Ext>
                </div>
              </div>
              {p.image && (
                <div className="pic">
                  <img src={p.image.src} width={390} height={690} alt={t(p.image.alt)} loading="lazy" decoding="async" />
                </div>
              )}
              {p.stats && (
                <div className="score">
                  {p.stats.map((s) => (
                    <div key={s.label.en}>
                      <b>{s.value}</b>
                      <span>{t(s.label)}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
      {hoverable && (
        <span className="badge" ref={badge} aria-hidden="true">
          {lang === 'ar' ? 'افتح الموقع' : 'Open site'}
        </span>
      )}
    </section>
  )
}

export function Path() {
  const { lang, t } = useSite()
  const list = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!fill.current || !list.current) return
    if (reduceMotion()) return
    const anim = animate(fill.current, {
      scaleY: [0, 1],
      ease: 'linear',
      duration: 1000,
      autoplay: onScroll({ target: list.current, enter: '72% top', leave: '50% bottom', sync: 0.6 }),
    })
    return () => {
      anim.revert()
    }
  }, [lang])

  return (
    <section className="s wrap" id="path">
      <Title text={{ en: 'Where I have worked and studied.', ar: 'أين عملت ودرست.' }} />
      <div className="tl" ref={list}>
        <span className="rail" aria-hidden="true" />
        <span className="fill" ref={fill} aria-hidden="true" />
        <ol>
          {path.map((p) => (
            <li key={p.title.en}>
              <p className="when">
                {p.date && t(p.date)}
                {p.datePending && <Pending text={p.datePending} />}
                {p.place && <>{p.date || import.meta.env.DEV ? ' · ' : ''}{t(p.place)}</>}
              </p>
              <h3>{t(p.title)}</h3>
              <p>{t(p.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Credentials() {
  const { lang, t } = useSite()
  return (
    <section className="s wrap" id="creds">
      <Title text={{ en: 'Credentials, weighted honestly.', ar: 'شهادات بوزنها الحقيقي.' }} />
      <div className="grid hero-grid">
        <div className="card ejpt">
          <h3>{lang === 'ar' ? 'الشهادة' : 'Certification'}</h3>
          <b dir="ltr">{headlineCert.name}</b>
          <p>{t(headlineCert.detail)}</p>
          {headlineCert.verifyUrl ? (
            <Ext className="lnk" href={headlineCert.verifyUrl}><span>{lang === 'ar' ? 'تحقق من الشهادة' : 'Verify this credential'}</span></Ext>
          ) : (
            <Pending text={headlineCert.verifyPending} />
          )}
        </div>
        <div className="card">
          <h3>{t(programmes.title)}</h3>
          <ItemList items={programmes.items} />
        </div>
        <div className="card w2">
          <details className="more">
            <summary>{lang === 'ar' ? 'الدورات والمعسكرات وورش العمل' : 'Courses, bootcamps and workshops'}</summary>
            <ul className="fine">
              {courses.map((c) => <li key={c.en}>{t(c)}</li>)}
            </ul>
          </details>
        </div>
      </div>
      <div className="tools">
        {tools.map((g) => (
          <div key={g.group.en}>
            <h3>{t(g.group)}</h3>
            <p dir="ltr">{g.items}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const { lang, t } = useSite()
  const address = useMail()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${address}`
    }
  }
  return (
    <footer className="wrap end" id="contact">
      <Title className="t end-t" text={{ en: 'Email me.', ar: 'راسلني.' }} />
      <p className="m">{t({ en: 'Or message me on LinkedIn. I am open to opportunities.', ar: 'أو تواصل معي عبر لينكدإن. أنا منفتح على الفرص.' })}</p>
      <div className="cta flat">
        <MailLink className="btn p" showAddress />
        <button className="btn" type="button" onClick={copy}>
          <span aria-live="polite">{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : lang === 'ar' ? 'نسخ البريد' : 'Copy email'}</span>
        </button>
      </div>
      <div className="sub">
        <Ext href={links.linkedin}>LinkedIn</Ext>
        <Ext href={links.github}>GitHub</Ext>
        {cvAvailable && <a href="/Aous-Damanhoori-CV.pdf" download>{lang === 'ar' ? 'السيرة الذاتية' : 'Download CV'}</a>}
        <span>{t({ en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' })}</span>
      </div>
    </footer>
  )
}
