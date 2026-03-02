import { resolve } from "node:path";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkReadingTime from "remark-reading-time";

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare(),
	site: "https://santychuy.com",
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@components": resolve("./src/components"),
				"@layouts": resolve("./src/layouts"),
				"@content": resolve("./src/content"),
				"@schemas": resolve("./src/schemas"),
				"@ts": resolve("./src/ts"),
				"@assets": resolve("./src/assets"),
				"@styles": resolve("./src/styles"),
			},
		},
	},
	prefetch: {
		defaultStrategy: "tap",
	},
	markdown: {
		remarkPlugins: [
			[remarkReadingTime, { attribute: "minutesRead" }],
			remarkAlert,
		],
		remarkRehype: {
			footnoteLabel: "References",
			footnoteBackLabel: "Back to content",
		},
	},
	integrations: [react(), sitemap(), mdx()],
});
