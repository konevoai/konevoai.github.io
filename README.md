<div align="center">

# Konevo

**AI-powered robots for the physical world.**

_kone (machine) + evo (evolution) — machine evolution._

**[konevoai.github.io](https://konevoai.github.io)**

</div>

---

AI has mastered the digital world — writing, designing, predicting. But the
world that feeds, moves and powers us — factories, ships, plants, pipelines —
still runs on human hands and hours. Konevo brings modern AI off the screen
and onto the ground: robots that inspect, monitor, clean, and operate in the
hazardous, confined, and hard-to-reach places people can't.

First stop: maritime, energy, and process industry across the Helsinki
region.

**[Book 20 minutes →](https://konevoai.github.io/#contact)**

### Team

- **Tommi Lundell** — Co-Founder, Hardware — [LinkedIn](https://www.linkedin.com/in/tommi-lundell-28b6597)
- **Ikram Ul Haq** — Co-Founder, AI — [LinkedIn](https://www.linkedin.com/in/ulhaqi12) · [Portfolio](https://ulhaqi12.github.io/)

---

## About this repository

This is the source for Konevo's marketing site: a static, single-page site
built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com).
No backend, no database — it builds to plain HTML/CSS/JS and deploys via
GitHub Pages (see `.github/workflows/deploy.yml`).

The rest of this README is for whoever is maintaining the site.

### Project structure

```text
website/
├── public/
│   ├── favicon.png         # browser-tab icon
│   └── og-image.png        # social share image (1200×630)
├── src/
│   ├── site.config.ts      # ⭐ ALL editable content lives here
│   ├── assets/              # source photos/logos — imported via astro:assets
│   ├── layouts/
│   │   └── BaseLayout.astro   # <head>, SEO + Open Graph meta, fonts
│   ├── components/
│   │   ├── Nav.astro          # sticky nav, mobile menu, logo
│   │   ├── Hero.astro
│   │   ├── Vision.astro
│   │   ├── WhatWeDo.astro     # capability cards ("what our robots do")
│   │   ├── Benefits.astro     # slim "why it matters" strip
│   │   ├── WhereWeStart.astro
│   │   ├── Team.astro         # founder cards
│   │   ├── CtaBand.astro      # closing CTA + contact anchor
│   │   ├── Credibility.astro  # "based in Helsinki" strip
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

### Editing content

Open **`src/site.config.ts`**. Every piece of copy on the site — company
name, tagline, nav links, hero text, section copy, founder bios, contact
method — is a value in that one file. Change it there and it updates
everywhere the value is used; you never need to touch a component to edit
copy.

Two placeholders are still unset:

| Placeholder | Where | What to do |
| --- | --- | --- |
| `[CALENDLY_URL]` | `site.config.ts` → `contact.calendlyUrl` | Set your real Calendly link, then set `contact.method: "calendly"` to make every CTA button use it instead of email |
| `[LINKEDIN_COMPANY_URL]` | `site.config.ts` → `contact.linkedin` | Company LinkedIn page, used in the footer |

Everything else — founder names, roles, bios, photos, contact email (with
CC), site URL, OG image, logo — is already filled in with real values.

### Switching the "Book 20 minutes" link

Every CTA button on the site (`Nav`, `Hero`, `CtaBand`, footer email link)
resolves through one helper, `getCtaHref()` (and `getMailtoHref()` for the
footer's visible email link), driven by `site.config.ts` → `contact.method`:

- `"mailto"` (default) → opens the visitor's email client with
  `contact.email`, CC'd to `contact.ccEmail`, and a prefilled subject
  (`contact.emailSubject`).
- `"calendly"` → links straight to `contact.calendlyUrl`.

Change `method` once and every button on the site updates.

### Adding images

Founder headshots and the hero photo follow the same pattern — source files
live in `src/assets/` (not `public/`) and are rendered with Astro's built-in
`<Image>` component instead of a plain `<img>`:

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
as-is, which is fine for tiny static files like the favicon but not photos.

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

This repo deploys automatically: every push to `main` triggers
`.github/workflows/deploy.yml`, which builds the Astro site and publishes it
to GitHub Pages at [konevoai.github.io](https://konevoai.github.io). Watch
progress in the **Actions** tab.

That requires the repo's **Settings → Pages → Build and deployment → Source**
to be set to **"GitHub Actions"** (not "Deploy from a branch" — that setting
runs GitHub's default Jekyll build instead, which fails on `.astro` files).

The build output is a plain static `dist/` folder, so if you ever want to
deploy elsewhere too (Netlify, Vercel, etc.), point their build command at
`npm run build` and publish directory at `dist`.

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
