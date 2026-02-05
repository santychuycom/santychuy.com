import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: cloudflare(),
	site: "https://santychuy.com",
	vite: {
		plugins: [tailwindcss()],
	},
	prefetch: {
		defaultStrategy: "tap",
	},
	integrations: [react()],
});
