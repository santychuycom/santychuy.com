import type { APIRoute } from "astro";

export const prerender = false;

const DEFAULT_UMAMI_PROXY_TARGET = "https://analytics.santychuy.com";
const FORWARDED_HEADERS = [
	"content-type",
	"user-agent",
	"x-forwarded-for",
	"x-real-ip",
	"cf-connecting-ip",
] as const;

const getUmamiProxyTarget = () => {
	const target =
		import.meta.env.UMAMI_PROXY_TARGET?.trim() || DEFAULT_UMAMI_PROXY_TARGET;

	return target.endsWith("/") ? target.slice(0, -1) : target;
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.text();
		const headers = new Headers();

		for (const name of FORWARDED_HEADERS) {
			const value = request.headers.get(name);

			if (value) {
				headers.set(name, value);
			}
		}

		const response = await globalThis.fetch(
			`${getUmamiProxyTarget()}/api/send`,
			{
				body,
				headers,
				method: "POST",
			},
		);
		const responseHeaders = new Headers(response.headers);

		responseHeaders.set("cache-control", "no-store");

		return new Response(response.body, {
			headers: responseHeaders,
			status: response.status,
		});
	} catch {
		return new Response("Umami collect proxy unavailable", { status: 502 });
	}
};
