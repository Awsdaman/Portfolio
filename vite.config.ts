import { copyFileSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run preview` serves the same security headers as production,
// so a Content-Security-Policy problem shows up before it is deployed.
const vercel = JSON.parse(readFileSync('./vercel.json', 'utf8')) as {
  headers: { headers: { key: string; value: string }[] }[]
}
const headers = Object.fromEntries(
  vercel.headers[0].headers
    .filter((h) => h.key !== 'Strict-Transport-Security')
    .map((h) => [h.key, h.value.replace(' upgrade-insecure-requests;', '')]),
)

// Social networks need an absolute image URL. Vercel provides the domain at build time.
const domain = process.env.SITE_DOMAIN ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
const origin = domain ? `https://${domain}` : ''

// VITE_SITE=games builds the games page alone, served at the site root.
const gamesOnly = process.env.VITE_SITE === 'games'

// GitHub Pages serves from a sub-path and cannot send headers, so it gets the policy as a meta tag.
// Given without a leading slash, because Git Bash on Windows rewrites values that start with one.
const base = process.env.VITE_BASE ? `/${process.env.VITE_BASE}` : '/'
const cspMeta = process.env.VITE_CSP_META
  ? headers['Content-Security-Policy'].replace(" frame-ancestors 'none';", '')
  : ''

export default defineConfig({
  base,
  build: {
    rollupOptions: { input: gamesOnly ? ['games/index.html'] : ['index.html', 'games/index.html'] },
  },
  plugins: [
    react(),
    {
      name: 'site-origin',
      transformIndexHtml: (html) => {
        const page = html.replaceAll('__SITE_ORIGIN__/', `${origin}${base}`)
        if (!cspMeta) return page
        return page.replace('<head>', `<head>
    <meta http-equiv="Content-Security-Policy" content="${cspMeta}" />`)
      },
    },
    {
      name: 'games-at-root',
      apply: 'build',
      closeBundle() {
        if (gamesOnly) copyFileSync('dist/games/index.html', 'dist/index.html')
      },
    },
  ],
  preview: { port: 4174, headers },
})
