import { resolve } from "node:path";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
});
