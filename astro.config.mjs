import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import rome from "astro-rome";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    react(),
    rome(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
