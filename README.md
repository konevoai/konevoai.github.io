# Konevo — Marketing Site

A static, single-page marketing site built with [Astro](https://astro.build) +
[Tailwind CSS v4](https://tailwindcss.com). No backend, no database — it
builds to plain HTML/CSS/JS and can be hosted anywhere that serves static
files.

> Konevo — from the Finnish _kone_ ("machine") + _evo_ (from "evolution"):
> machine evolution. See **Editing content** below to change the name
> everywhere in one place if it ever changes again.

## Project structure

```text
website/
├── public/
│   ├── favicon.svg        # brand mark favicon
│   └── og-image.svg       # PLACEHOLDER social share image — replace before launch
├── src/
│   ├── site.config.ts     # ⭐ ALL editable content lives here
│   ├── layouts/
│   │   └── BaseLayout.astro   # <head>, SEO + Open Graph meta, fonts
│   ├── components/
│   │   ├── Nav.astro          # sticky nav, mobile menu
│   │   ├── Hero.astro
│   │   ├── Vision.astro
│   │   ├── WhatWeDo.astro     # 4 feature cards
│   │   ├── WhereWeStart.astro
│   │   ├── Team.astro         # founder cards
│   │   ├── CtaBand.astro      # closing CTA + contact anchor
│   │   ├── Footer.astro
│   │   └── ScrollReveal.astro # IntersectionObserver fade/slide-in
│   ├── icons/
│   │   └── Icon.astro         # inline SVG icon set (no icon-library dependency)
│   ├── pages/
│   │   └── index.astro        # assembles all sections
│   └── styles/
│       └── global.css         # Tailwind import + design tokens (@theme)
└── package.json
```

## Editing content

Open **`src/site.config.ts`**. Every piece of copy on the site — company
name, tagline, nav links, hero text, section copy, founder bios, contact
method — is a value in that one file. Change it there and it updates
everywhere the value is used; you never need to touch a component to edit
copy.

Search the file (and the codebase) for square brackets to find every
placeholder that needs a real value before launch:

| Placeholder | Where | What to do |
| --- | --- | --- |
| `[CALENDLY_URL]` | `site.config.ts` → `contact.calendlyUrl` | Set your real Calendly link, then set `contact.method: "calendly"` to make every CTA button use it instead of email |
| `[LINKEDIN_COMPANY_URL]` | `site.config.ts` → `contact.linkedin` | Company LinkedIn page, used in the footer |
| `[YOUR_DOMAIN]` style URL | `site.config.ts` → `siteUrl` (currently `https://your-domain-here.com`) | Your real production domain — used for canonical + Open Graph URLs. **Must remain a valid URL** or the build fails |
| `og-image.svg` | `public/og-image.svg` + `site.config.ts` → `ogImage` | Replace with a real 1200×630 `.jpg`/`.png` — most platforms render social preview images poorly (or not at all) as SVG |

Founder names, roles, bios, photos, and the contact email (with CC) are
already filled in with real values — no placeholders left there.

### Switching the "Book 20 minutes" link

Every CTA button on the site (`Nav`, `Hero`, `CtaBand`, footer email link)
resolves through one helper, `getCtaHref()`, driven by
`site.config.ts` → `contact.method`:

- `"mailto"` (default) → opens the visitor's email client with
  `contact.email` and a prefilled subject (`contact.emailSubject`).
- `"calendly"` → links straight to `contact.calendlyUrl`.

Change `method` once and every button on the site updates.

### Adding images

Team headshots and any other future photos are intentionally left out for
now (no placeholder boxes) rather than shipping empty dashed frames. The
hero photo (`src/assets/hero-robot.jpg`) shows the pattern to follow when
you're ready to add one:

1. Drop the source file in `src/assets/` (not `public/`).
2. Import it and render it with Astro's built-in `<Image>` component instead
   of a plain `<img>`:

   ```astro
   ---
   import { Image } from "astro:assets";
   import myPhoto from "../assets/my-photo.jpg";
   ---

   <Image src={myPhoto} alt="Descriptive alt text" width={800} />
   ```

`astro:assets` automatically compresses the image, converts it to WebP, and
generates the right size for each screen at build time — the hero photo's
5.6 MB source ships as a ~110 KB WebP. A plain `<img src="/photo.jpg">`
pointed at `public/` skips all of that and ships the original file size
as-is, which is fine for tiny icons/favicons but not for photos.

## Local development

Requires [Node.js](https://nodejs.org) 22.12+ and npm.

```sh
npm install
npm run dev
```

Visit **http://localhost:4321**. The dev server hot-reloads on save.

Other useful commands:

| Command | Action |
| --- | --- |
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check + build the static site to `./dist/` |
| `npm run preview` | Serve the production build locally, to sanity-check before deploying |
| `npx astro check` | Type-check only |

## Deploying

The build output is a fully static `dist/` folder — any static host works.

### Netlify

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build settings (Netlify usually auto-detects these from `astro`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. Point your custom domain at the Netlify site once ready.

Or via CLI, from inside `website/`:

```sh
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project**, import the repo, framework preset
   "Astro" is auto-detected.
3. Build command: `npm run build`, output directory: `dist` (Vercel fills
   these in automatically for Astro).
4. Deploy.

Or via CLI, from inside `website/`:

```sh
npm install -g vercel
vercel --prod
```

### GitHub Pages

1. In `astro.config.mjs`, add your site URL and (if deploying to a project
   page, not a custom domain) a `base` path:

   ```js
   export default defineConfig({
     site: "https://<your-username>.github.io",
     base: "/<repo-name>", // omit if using a custom domain or a user/org page
     vite: { plugins: [tailwindcss()] },
   });
   ```

2. Add a GitHub Actions workflow at `.github/workflows/deploy.yml` using
   [`withastro/action`](https://github.com/withastro/action) (see the
   [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/)
   for the current recommended snippet), or build locally and push `dist/`
   to a `gh-pages` branch with a tool like `gh-pages`.
3. In the repo's **Settings → Pages**, set the source to the deploying
   branch/workflow.

## Design system reference

- **Background** `#10202E` · **Panels** `#1B2E3E` · **Accent (amber)**
  `#F5A623` · **Body text** `#C7D3DE` · **Headings** `#FFFFFF`
- All tokens are defined once in `src/styles/global.css` under `@theme`
  (Tailwind v4's CSS-based config) and consumed as Tailwind utility classes
  (`bg-background`, `text-accent`, `bg-panel`, etc.) throughout components.
- Headings use a bold sans-serif with tight leading; no accent-colored
  underline/stripe treatment under headings by design.
- Icons are hand-written inline SVGs in `src/icons/Icon.astro` (lucide-style
  line icons) — no icon library dependency.
- Scroll-reveal is a single small `IntersectionObserver` script
  (`ScrollReveal.astro`) toggling a `.reveal` → `.reveal.is-visible` CSS
  transition; it's disabled automatically for users with
  `prefers-reduced-motion: reduce`.
