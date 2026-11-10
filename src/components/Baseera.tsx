import { useCallback, useEffect, useRef, useState } from 'react'
import { createTimeline, stagger, utils, type Timeline } from 'animejs'
import { baseera, links, type Bi } from '../content'
import { reduceMotion, useSite } from '../site'
import { Ext, Pending, Study, studyLabels, Title } from './ui'

type Mode = 'pass' | 'fail'

const say: Record<string, Bi> = {
  go: { en: 'Reading the model output…', ar: 'يقرأ مخرجات النموذج…' },
  pass: { en: 'Both ids match, so code substitutes the exact stored text.', ar: 'تطابق المعرّفان، فيضع الكود النص المخزَّن بحروفه.' },
  retry: { en: 'Attempt one failed. One more try.', ar: 'فشلت المحاولة الأولى. محاولة أخيرة.' },
  fail: { en: 'Verification failed twice, so Baseera abstains.', ar: 'فشل التحقق مرتين، فيمتنع «بصيرة» عن الإجابة.' },
}
const attempts: Record<string, Bi> = {
  one: { en: 'attempt 1 of 2', ar: 'المحاولة 1 من 2' },
  two: { en: 'attempt 2 of 2', ar: 'المحاولة 2 من 2' },
}
const copy = {
  label: { en: 'Verification outcome', ar: 'نتيجة التحقق' },
  passes: { en: 'Check passes', ar: 'نجح التحقق' },
  fails: { en: 'Fails twice', ar: 'فشل مرتين' },
  model: { en: 'Model output', ar: 'مخرجات النموذج' },
  untrusted: { en: 'untrusted', ar: 'غير موثوقة' },
  verse: { en: 'verse + citation id', ar: 'آية + معرّف استشهاد' },
  hadith: { en: 'hadith + citation id', ar: 'حديث + معرّف استشهاد' },
  code: { en: 'Plain code', ar: 'كود برمجي' },
  checkVerse: { en: 'Verse id is in what was retrieved', ar: 'معرّف الآية ضمن ما جرى استرجاعه' },
  checkHadith: { en: 'Hadith id is in what was retrieved', ar: 'معرّف الحديث ضمن ما جرى استرجاعه' },
  answer: { en: 'Answer', ar: 'الإجابة' },
  exact: { en: 'exact stored text', ar: 'النص المخزَّن بحروفه' },
  abstains: { en: 'Abstains.', ar: 'يمتنع عن الإجابة.' },
  abstainsWhy: { en: 'Verification failed twice, so nothing is shown.', ar: 'فشل التحقق مرتين، فلا يُعرض شيء.' },
  note: { en: 'An illustration of the pipeline. No real verse is shown here.', ar: 'رسم توضيحي لمسار العمل، ولا يتضمن نصًا حقيقيًا.' },
}

function Mark() {
  return (
    <svg className="mk" viewBox="0 0 20 20" aria-hidden="true">
      <path className="ok" pathLength={1} d="M4 10.5l4 4 8-9" />
      <path className="no" pathLength={1} d="M5 5l10 10M15 5 5 15" />
    </svg>
  )
}

function Wire() {
  return (
    <div className="link" aria-hidden="true">
      <svg viewBox="0 0 2 26">
        <path className="wire" pathLength={1} d="M1 0v26" />
      </svg>
    </div>
  )
}

function Demo() {
  const { t } = useSite()
  const root = useRef<HTMLDivElement>(null)
  const timeline = useRef<Timeline | null>(null)
  const started = useRef(false)
  const [mode, setMode] = useState<Mode>('pass')
  const [status, setStatus] = useState<keyof typeof say>('pass')
  const [attempt, setAttempt] = useState<keyof typeof attempts | ''>('')

  const parts = useCallback(() => {
    const el = root.current as HTMLDivElement
    const all = (s: string) => [...el.querySelectorAll(s)]
    return {
      ok: all('.mk .ok'), no: all('.mk .no'), wires: all('.wire'), bars: all('.model .b'), chips: all('.model .chip'),
      good: el.querySelector('.res.good') as Element, bad: el.querySelector('.res.bad') as Element,
    }
  }, [])

  const reset = useCallback(() => {
    const p = parts()
    utils.set([...p.ok, ...p.no, ...p.wires], { strokeDasharray: 1, strokeDashoffset: 1 })
    utils.set([p.good, p.bad], { opacity: 0, scale: 0.97 })
    utils.set(p.bars, { scaleX: 1 })
    utils.set(p.chips, { opacity: 1, scale: 1 })
    setAttempt('')
  }, [parts])

  const settle = useCallback((m: Mode) => {
    reset()
    const p = parts()
    utils.set(p.wires, { strokeDashoffset: 0 })
    utils.set(m === 'pass' ? p.ok : p.no, { strokeDashoffset: 0 })
    utils.set(m === 'pass' ? p.good : p.bad, { opacity: 1, scale: 1 })
    setStatus(m)
    setAttempt(m === 'fail' ? 'two' : '')
  }, [parts, reset])

  const play = useCallback((m: Mode) => {
    timeline.current?.cancel()
    if (reduceMotion()) return settle(m)
    reset()
    setStatus('go')
    const p = parts()
    utils.set(p.bars, { scaleX: 0 })
    utils.set(p.chips, { opacity: 0, scale: 0.85 })
    const tl = createTimeline({ defaults: { ease: 'out(3)' } })
    tl.add(p.bars, { scaleX: 1, duration: 420, delay: stagger(55) }, 0)
      .add(p.chips, { opacity: 1, scale: 1, duration: 320, delay: stagger(180) }, 240)
      .add(p.wires[0], { strokeDashoffset: 0, duration: 320, ease: 'inOut(2)' }, 860)
    if (m === 'pass') {
      tl.add(p.ok, { strokeDashoffset: 0, duration: 380, delay: stagger(260) }, 1180)
        .add(p.wires[1], { strokeDashoffset: 0, duration: 320, ease: 'inOut(2)' }, 1900)
        .add(p.good, { opacity: 1, scale: 1, duration: 520, onBegin: () => setStatus('pass') }, 2180)
    } else {
      tl.call(() => setAttempt('one'), 1160)
        .add(p.no, { strokeDashoffset: 0, duration: 320, delay: stagger(180) }, 1180)
        .call(() => setStatus('retry'), 1760)
        .add(p.no, { strokeDashoffset: 1, duration: 220 }, 2360)
        .call(() => setAttempt('two'), 2580)
        .add(p.no, { strokeDashoffset: 0, duration: 320, delay: stagger(180) }, 2600)
        .add(p.wires[1], { strokeDashoffset: 0, duration: 320, ease: 'inOut(2)' }, 3180)
        .add(p.bad, { opacity: 1, scale: 1, duration: 520, onBegin: () => setStatus('fail') }, 3460)
    }
    timeline.current = tl
  }, [parts, reset, settle])

  const modeRef = useRef(mode)
  modeRef.current = mode

  useEffect(() => {
    settle('pass')
    if (reduceMotion()) return
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        if (!started.current) {
          started.current = true
          play(modeRef.current)
        }
      },
      { threshold: 0.3 },
    )
    if (root.current) io.observe(root.current)
    return () => {
      io.disconnect()
      timeline.current?.cancel()
    }
  }, [play, settle])

  const choose = (m: Mode) => {
    started.current = true
    setMode(m)
    play(m)
  }

  return (
    <div className="demo" ref={root} data-mode={mode}>
      <div className="seg" role="group" aria-label={t(copy.label)}>
        <span className="thumb" aria-hidden="true" />
        <button type="button" aria-pressed={mode === 'pass'} onClick={() => choose('pass')}>{t(copy.passes)}</button>
        <button type="button" aria-pressed={mode === 'fail'} onClick={() => choose('fail')}>{t(copy.fails)}</button>
      </div>
      <div className="stage" aria-hidden="true">
        <div className="panel model">
          <h3>{t(copy.model)}<small>{t(copy.untrusted)}</small></h3>
          <div className="bars">
            <i className="b w58" /><i className="b w30" />
            <span className="chip">{t(copy.verse)}</span>
            <i className="b w22" /><i className="b w64" />
            <span className="chip">{t(copy.hadith)}</span>
            <i className="b w12" />
          </div>
        </div>
        <Wire />
        <div className="panel code">
          <h3>{t(copy.code)}<small>{attempt ? t(attempts[attempt]) : ''}</small></h3>
          <ul className="rows">
            <li>{t(copy.checkVerse)}<Mark /></li>
            <li>{t(copy.checkHadith)}<Mark /></li>
          </ul>
        </div>
        <Wire />
        <div className="outs">
          <div className="panel res good">
            <h3>{t(copy.answer)}<small>{t(copy.exact)}</small></h3>
            <div className="bars"><i className="b w92" /><i className="b w70" /></div>
          </div>
          <div className="panel res bad">
            <p>{t(copy.abstains)}<span>{t(copy.abstainsWhy)}</span></p>
          </div>
        </div>
      </div>
      <p className="say" role="status">{t(say[status])}</p>
      <p className="note">{t(copy.note)}</p>
    </div>
  )
}

const arch = {
  question: { en: 'Question or viral message', ar: 'سؤال أو رسالة متداولة' },
  retrieve: { en: 'Hybrid retrieval', ar: 'استرجاع هجين' },
  retrieveSub: { en: 'BM25 + bge-m3, fused by rank', ar: 'BM25 + bge-m3، بدمج الترتيب' },
  model: { en: 'Local model', ar: 'نموذج محلي' },
  modelSub: { en: 'Placeholders and citation ids only', ar: 'مواضع فارغة ومعرّفات استشهاد فقط' },
  check: { en: 'Validation in code', ar: 'تحقق في الكود' },
  checkSub: { en: 'Against what was retrieved', ar: 'مقابل ما جرى استرجاعه' },
  good: { en: 'Exact stored text', ar: 'النص المخزَّن بحروفه' },
  bad: { en: 'Abstain after two failures', ar: 'امتناع بعد فشلين' },
  caption: { en: 'How a request moves through Baseera.', ar: 'مسار الطلب داخل «بصيرة».' },
}

function Architecture() {
  const { t } = useSite()
  const steps = [
    { title: arch.question },
    { title: arch.retrieve, sub: arch.retrieveSub },
    { title: arch.model, sub: arch.modelSub, risk: true },
    { title: arch.check, sub: arch.checkSub },
  ]
  return (
    <figure className="arch">
      <ol>
        {steps.map((s) => (
          <li key={s.title.en} className={s.risk ? 'risk' : undefined}>
            <b>{t(s.title)}</b>
            {s.sub && <span>{t(s.sub)}</span>}
          </li>
        ))}
        <li className="fork">
          <b>{t(arch.good)}</b>
          <b className="stop">{t(arch.bad)}</b>
        </li>
      </ol>
      <figcaption>{t(arch.caption)}</figcaption>
    </figure>
  )
}

export function Baseera() {
  const { lang, t } = useSite()
  const s = baseera.study
  return (
    <section className="s wrap" id="work">
      <Title text={baseera.title} mute={baseera.titleMute} />
      <div className="case">
        <div className="copy">
          <p><strong>{lang === 'ar' ? 'بصيرة.' : 'Baseera, بصيرة.'}</strong> {t(baseera.intro)}</p>
          <p><Pending text={baseera.rolePending} /></p>
          <p>{t(baseera.how)}</p>
          <dl className="spec">
            {baseera.spec.map((row) => (
              <div key={row.title.en}>
                <dt>{t(row.title)}</dt>
                <dd>{row.meta && t(row.meta)}</dd>
              </div>
            ))}
          </dl>
          <Ext className="lnk" href={links.baseera}><span dir="ltr">github.com/Awsdaman/Baseera</span></Ext>
        </div>
        <Demo />
      </div>
      <Study label={studyLabels.open}>
        <div className="grid4">
          <div><h3>{t(studyLabels.problem)}</h3><p>{t(s.problem)}</p></div>
          <div><h3>{t(studyLabels.hard)}</h3><p>{t(s.hard)}</p></div>
          <div><h3>{t(studyLabels.did)}</h3><p>{t(s.did)}</p><Pending text={baseera.rolePending} /></div>
        </div>
        <h3 className="proof-h">{t(studyLabels.proof)}</h3>
        <Architecture />
        <ul className="rules">
          {baseera.rules.map((r) => (
            <li key={r.title.en}><b>{t(r.title)}</b>{r.meta && t(r.meta)}</li>
          ))}
        </ul>
        <Pending text={s.examplePending} />
      </Study>
    </section>
  )
}
