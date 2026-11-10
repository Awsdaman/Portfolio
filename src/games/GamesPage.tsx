import { links, projects, type Bi } from '../content'
import { useSite } from '../site'
import { Ext, MailLink, Pending, Title } from '../components/ui'
import { KeepUp } from './KeepUp'

const standalone = import.meta.env.VITE_SITE === 'games'

const notes: Record<string, Bi> = {
  Dub: { en: 'The loop: pick a clip, perform it, and hear yourself replay instantly over the original music.', ar: 'حلقة اللعب: اختر مقطعًا، أدِّه، واسمع نفسك فورًا فوق الموسيقى الأصلية.' },
  Saudi96: { en: 'The scoring: in guess-the-song, each extra clue costs you. 300, then 150, then 50.', ar: 'نظام النقاط: في «خمّن الأغنية» كل تلميح إضافي له ثمن. 300، ثم 150، ثم 50.' },
  'RLCS Predictor': { en: 'The rule: lock your prediction before the match. 3 points for an exact score, 1 for the winner.', ar: 'القاعدة: ثبّت توقعك قبل المباراة. 3 نقاط للنتيجة الصحيحة، ونقطة للفائز.' },
}

const bring: { title: Bi; body: Bi }[] = [
  { title: { en: 'Rules and scoring', ar: 'القواعد والنقاط' }, body: { en: 'I have designed how a game rewards a player, in three different games.', ar: 'صممت طريقة مكافأة اللاعب في ثلاث ألعاب مختلفة.' } },
  { title: { en: 'Playing together', ar: 'اللعب الجماعي' }, body: { en: 'Rooms, multi-device seats and a realtime leaderboard.', ar: 'غرف، ومقاعد على عدة أجهزة، ولوحة صدارة لحظية.' } },
  { title: { en: 'Testing', ar: 'الاختبار' }, body: { en: 'About 30 automated test scripts on Dub, covering recovery and slow networks.', ar: 'نحو 30 سكربت اختبار آليًا في دوبلاج، تغطي الاستعادة والشبكات البطيئة.' } },
  { title: { en: 'Finishing', ar: 'الإنجاز' }, body: { en: 'Real people have played what I built.', ar: 'ما بنيته لعبه أناس حقيقيون.' } },
]

const copy = {
  name: { en: 'Aous Damanhoori', ar: 'أوس دمنهوري' },
  h1: { en: 'I make games people play together.', ar: 'أصنع ألعابًا يلعبها الناس معًا.' },
  lede: { en: 'A party game, a team quiz, and a prediction game my friends played live. All three on the web. Unity is the next level.', ar: 'لعبة جماعية، ومسابقة بين فرق، ولعبة توقعات لعبها أصدقائي مباشرة. الثلاث على الويب، وUnity هو المستوى التالي.' },
  watch: { en: 'Watch the reel', ar: 'شاهد الفيديو' },
  email: { en: 'Email me', ar: 'راسلني' },
  whyPending: { en: 'Your favourite games and why you love them, to add', ar: 'ألعابك المفضلة وسبب حبك لها، تُضاف لاحقًا' },
  reelTitle: { en: 'See them running.', ar: 'شاهدها وهي تعمل.' },
  reelNote: { en: 'Real play from Dub and Saudi96, without sound.', ar: 'لعب حقيقي من دوبلاج وهل تعرف السعودية، بدون صوت.' },
  reelLabel: { en: 'Gameplay reel of Dub and Saudi96', ar: 'فيديو لعب من دوبلاج وهل تعرف السعودية' },
  levels: { en: 'Levels cleared.', ar: 'مستويات مكتملة.' },
  level: { en: 'Level', ar: 'المستوى' },
  cleared: { en: 'cleared', ar: 'مكتمل' },
  locked: { en: 'locked', ar: 'مقفل' },
  play: { en: 'Play it live', ar: 'جرّبها مباشرة' },
  unity: { en: 'I have not used Unity yet.', ar: 'لم أستخدم Unity بعد.' },
  unityBody: { en: 'Everything above runs in a browser. I want to learn a real game engine, and this bootcamp is how I unlock it.', ar: 'كل ما سبق يعمل في المتصفح. أريد تعلّم محرك ألعاب حقيقي، وهذا المعسكر هو مفتاحه.' },
  bringTitle: { en: 'What I bring to Level 4.', ar: 'ما أحمله إلى المستوى الرابع.' },
  end: { en: 'Let’s play.', ar: 'لنلعب.' },
  endSub: { en: 'Email me or message me on LinkedIn.', ar: 'راسلني أو تواصل معي عبر لينكدإن.' },
  security: { en: 'Cybersecurity portfolio', ar: 'معرض أعمالي في الأمن السيبراني' },
}

export function GamesPage() {
  const { lang, t, toggleLang } = useSite()
  return (
    <>
      <header className="nav">
        <div className="bar">
          <span className="who">{t(copy.name)}</span>
          <div className="ctrl">
            <button className="ib" type="button" onClick={toggleLang} lang={lang === 'ar' ? 'en' : 'ar'} dir={lang === 'ar' ? 'ltr' : 'rtl'}>
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </header>
      <main>
        <section className="g-hero">
          <div className="wrap g-hero-in">
            <div>
              <p className="g-name">{t(copy.name)}</p>
              <h1>{t(copy.h1)}</h1>
              <p className="g-lede">{t(copy.lede)}</p>
              <div className="g-cta">
                <a className="btn g-dark" href="#reel">{t(copy.watch)}</a>
                <MailLink className="btn g-line">{t(copy.email)}</MailLink>
              </div>
              <p><Pending text={copy.whyPending} /></p>
            </div>
            <KeepUp />
          </div>
        </section>

        <section className="s wrap" id="reel">
          <Title text={copy.reelTitle} />
          <video className="reel" controls playsInline preload="none" poster={`${import.meta.env.BASE_URL}games/poster.webp`} aria-label={t(copy.reelLabel)}>
            <source src={`${import.meta.env.BASE_URL}games/reel.mp4`} type="video/mp4" />
          </video>
          <p className="g-note">{t(copy.reelNote)}</p>
        </section>

        <section className="s wrap">
          <Title text={copy.levels} />
          <div className="levels">
            {projects.map((p, i) => (
              <article
                key={p.name.en}
                className={`lv${p.colors ? '' : ' plain'}`}
                ref={(el) => {
                  if (el && p.colors) {
                    el.style.setProperty('--c-bg', p.colors.bg)
                    el.style.setProperty('--c-tx', p.colors.text)
                  }
                }}
              >
                <div className="lv-tx">
                  <p className="lv-tag">{t(copy.level)} {i + 1} · {t(copy.cleared)}</p>
                  <h3>{t(p.name)}</h3>
                  <p>{t(p.body)}</p>
                  <p className="lv-note">{t(notes[p.name.en])}</p>
                  <div className="acts">
                    {p.live && <Ext href={p.live}>{t(copy.play)}</Ext>}
                    <Ext href={p.repo}>GitHub</Ext>
                  </div>
                </div>
                {p.image && <div className="pic"><img src={`${import.meta.env.BASE_URL}${p.image.src}`} width={390} height={690} alt={t(p.image.alt)} loading="lazy" decoding="async" /></div>}
                {p.stats && (
                  <div className="score">
                    {p.stats.map((s) => <div key={s.label.en}><b>{s.value}</b><span>{t(s.label)}</span></div>)}
                  </div>
                )}
              </article>
            ))}
            <article className="lv locked">
              <div className="lv-tx">
                <p className="lv-tag">{t(copy.level)} 4 · {t(copy.locked)}</p>
                <h3 dir="ltr">Unity</h3>
                <p className="lv-big">{t(copy.unity)}</p>
                <p>{t(copy.unityBody)}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="s wrap">
          <Title text={copy.bringTitle} />
          <ul className="bring">
            {bring.map((b) => <li key={b.title.en}><b>{t(b.title)}</b>{t(b.body)}</li>)}
          </ul>
        </section>
      </main>
      <footer className="wrap end">
        <Title className="t end-t" text={copy.end} />
        <p className="m">{t(copy.endSub)}</p>
        <div className="cta flat">
          <MailLink className="btn p" showAddress />
          <Ext className="btn" href={links.linkedin}>LinkedIn</Ext>
        </div>
        <div className="sub">
          <Ext href={links.github}>GitHub</Ext>
          {!standalone && <a href={import.meta.env.BASE_URL}>{t(copy.security)}</a>}
        </div>
      </footer>
    </>
  )
}
