import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const { PLAUSIBLE_SITE_ID, PLAUSIBLE_TOKEN } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ''
);

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://santychuy.com',
  vite: {
    define: {
      PLAUSIBLE_SITE_ID: PLAUSIBLE_SITE_ID,
      PLAUSIBLE_TOKEN: PLAUSIBLE_TOKEN,
    },
  },
});
