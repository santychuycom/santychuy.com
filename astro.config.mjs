import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const { PLAUSIBLE_SITE_ID } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

console.log(PLAUSIBLE_SITE_ID);

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://santychuy.com',
});
