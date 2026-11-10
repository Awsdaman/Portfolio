import { readFileSync } from 'node:fs'
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

export default defineConfig({
  plugins: [
    react(),
    { name: 'site-origin', transformIndexHtml: (html) => html.replaceAll('__SITE_ORIGIN__', origin) },
  ],
  preview: { port: 4174, headers },
})
