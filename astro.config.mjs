import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://santychuy.com',
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    defaultStrategy: 'tap',
  },
});
