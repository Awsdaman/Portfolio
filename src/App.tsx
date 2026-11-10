import { Baseera } from './components/Baseera'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Contact, Credentials, Path, Projects, Threat } from './components/Sections'
import { Statement } from './components/Statement'
import { useSite } from './site'

export default function App() {
  const { lang } = useSite()
  return (
    <>
      <a className="skip" href="#top">{lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Baseera />
        <Threat />
        <Projects />
        <Path />
        <Credentials />
      </main>
      <Contact />
    </>
  )
}
