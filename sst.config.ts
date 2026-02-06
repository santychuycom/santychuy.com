/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
	app(input) {
		return {
			name: "santychuy-website",
			home: "cloudflare",
			removal: input?.stage === "production" ? "retain" : "remove",
			providers: { cloudflare: "6.13.0" },
		};
	},
	async run() {
		const isProduction = $app.stage === "production";
		const site = new sst.cloudflare.Worker("Site", {
			handler: "./worker/index.js",
			assets: {
				directory: "./dist",
			},
			url: true,
			domain: isProduction ? "santychuy.com" : undefined,
			transform: {
				worker(args) {
					args.compatibilityDate = "2026-02-04";
					args.compatibilityFlags = ["nodejs_compat"];
				},
			},
		});
		return {
			url: site.url,
		};
	},
});
