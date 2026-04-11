# joshuaizzard.dev

Personal portfolio site for Joshua Izzard.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. Dark mode only. No database, no auth, no API routes — pure static portfolio.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Structure

```
src/app/
  layout.tsx             # Root layout (system font stack, dark mode)
  page.tsx               # Hero + Projects + About + Footer
  globals.css            # Tokyo Night palette + shadcn bridge vars (Tailwind v4 @theme inline)
  icon.png               # Favicon (Next.js App Router convention)
  apple-icon.png         # Apple touch icon
  opengraph-image.tsx    # Dynamic 1200x630 OG image (ImageResponse API)
src/components/ui/       # shadcn/ui: button, card, badge, separator
src/lib/utils.ts         # cn() helper
```

## Design system

Colors are defined as CSS variables in `globals.css`. The Tokyo Night palette is the source of truth; shadcn variables are bridges that map onto it. To re-theme, edit `--jz-*` values in `:root`.

## Deploy

Vercel free tier. No env vars required.
