// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Repo is named konevoai.github.io, so this deploys as the org's root
  // Pages site — no `base` path needed (that's only for project pages
  // like konevoai.github.io/some-repo).
  site: 'https://konevoai.github.io',
  vite: {
    plugins: [tailwindcss()]
  }
});