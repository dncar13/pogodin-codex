# pogodin.co.il

Portfolio for Pogodin built with Next.js 14 (App Router) + Tailwind CSS 4. The site ships a bilingual RTL/LTR experience, hero palette swap interaction, editable content files, and deployment-ready performance/a11y defaults.

## Stack & Features

- **Next.js 14 + TypeScript** with App Router, static content loading, dynamic project routes, and custom metadata/SEO (OpenGraph, sitemap, robots, schema.org).
- **Tailwind CSS 4** plus handcrafted CSS for the diagonal hero, noise textures, and RTL-friendly layouts.
- **Content system**: JSON + Markdown under `src/content` (site copy, about, and three project case studies). Each text has Hebrew + English variants.
- **Components**: atoms/ui elements (`Button`, `LanguageToggle`, etc.), section modules, SVG avatar + icons, and project detail layout.
- **Accessibility**: semantic landmarks, ARIA hints, keyboard-accessible hero toggle, focus styles, prefers-reduced-motion guards, and contrast-safe palette.
- **Contact API**: `/api/contact` validates honeypot + delay and can be wired to any email/CRM backend.
- **Analytics toggle**: injects GTag or Umami only when IDs are provided via env (`NEXT_PUBLIC_GTAG_ID`, `NEXT_PUBLIC_UMAMI_ID`).
- **CI ready**: GitHub Actions workflow runs lint, unit tests, build, and Playwright e2e scenario.

## Editing content

All text lives under `src/content` so you can update copy without touching components:

```
src/content/site.json           # site-wide strings per locale
src/content/about.md            # frontmatter with he/en paragraphs
src/content/projects/*.md       # case studies with bilingual fields
```

Update the JSON/MD files and restart the dev server to reload copy. When adding a new project, drop another Markdown file (same schema) inside `src/content/projects`.

## Local development

```bash
npm install
npm run dev
```

Environment variables (optional):

- `NEXT_PUBLIC_SITE_URL` – absolute URL for metadata (defaults to `https://pogodin.co.il`).
- `NEXT_PUBLIC_GTAG_ID` / `NEXT_PUBLIC_UMAMI_ID` – analytics.
- `CONTACT_EMAIL` – fallback for the contact section and schema.org entry.

## Testing & quality

```bash
npm run lint        # next lint
npm run test        # Vitest + Testing Library (unit)
npm run test:e2e    # Playwright (starts dev server automatically)
```

CI (`.github/workflows/ci.yml`) runs all commands above plus `npm run build`. Playwright dependencies are installed via `npm run prepare:e2e`.

## Deployment

The app is static-friendly and can be deployed to Vercel/Netlify or any Node host:

```bash
npm run build
npm start
```

Security headers (CSP, Referrer-Policy, etc.) are set in `next.config.ts`, and `robots.ts`/`sitemap.ts` are ready for SEO. Redirects send `www` traffic to the apex domain.

## Accessibility & performance checkpoints

- Hero interaction works via hover, focus, and keyboard (Enter/Space) and announces instructions via locale-specific aria hints.
- Layout honors `prefers-reduced-motion` and keeps JS payloads lean (no heavy UI libraries).
- Color contrast meets WCAG AA for text/background pairs.
- Contact form includes honeypot + timing gate to reduce spam and exposes status via `aria-live`.

Feel free to extend the component library, add more locales, or connect the contact endpoint to your preferred service.
