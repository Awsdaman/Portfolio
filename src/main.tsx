import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist/index.css'
import '@fontsource-variable/readex-pro/index.css'
import './styles/tokens.css'
import './styles/app.css'
import App from './App'
import { SiteProvider } from './site'

createRoot(document.getElementById('root') as HTMLElement).render(
  <SiteProvider>
    <App />
  </SiteProvider>,
)
