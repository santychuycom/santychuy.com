import { handle } from "@astrojs/cloudflare/handler";
import type {
	ExecutionContext,
	ExportedHandlerFetchHandler,
} from "@cloudflare/workers-types";
import type { SSRManifest } from "astro";
import { App } from "astro/app";

type Env = {
	[key: string]: unknown;
	ASSETS: {
		fetch: (req: Request | string) => Promise<Response>;
	};
};

type FetchRequest = Parameters<ExportedHandlerFetchHandler>[0];

export function createExports(manifest: SSRManifest) {
	const app = new App(manifest, false);

	const fetch = async (
		request: FetchRequest,
		env: Env,
		context: ExecutionContext,
	) => {
		return await handle(manifest, app, request, env, context);
	};

	return { default: { fetch } };
}
