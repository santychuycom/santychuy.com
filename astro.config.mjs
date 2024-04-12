import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://santychuy.com',
  prefetch: {
    defaultStrategy: 'tap',
  },
  experimental: {
    security: {
      csrfProtection: {
        origin: true,
      },
    },
  },
});
