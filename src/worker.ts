import { handle } from "@astrojs/cloudflare/handler";
import type { SSRManifest } from "astro";
import { App } from "astro/app";

type FetchRequest = Parameters<typeof handle>[2];
type FetchEnv = Parameters<typeof handle>[3];
type FetchContext = Parameters<typeof handle>[4];

export function createExports(manifest: SSRManifest) {
	const app = new App(manifest, false);

	const fetch = async (
		request: FetchRequest,
		env: FetchEnv,
		context: FetchContext,
	) => {
		return await handle(manifest, app, request, env, context);
	};

	return { default: { fetch } };
}
