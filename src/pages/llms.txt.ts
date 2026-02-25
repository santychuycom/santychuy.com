export const prerender = true;

const fallbackSite = "https://santychuy.com";

const getBaseUrl = (site?: URL) => {
	const value = site?.toString() ?? fallbackSite;
	return value.endsWith("/") ? value.slice(0, -1) : value;
};

export function GET({ site }: { site?: URL }) {
	const baseUrl = getBaseUrl(site);

	const content = [
		"# santychuy.com",
		"",
		"Personal website and blog by Santiago Carrasco (Santychuy).",
		"Main focus: software development, AI agents, engineering notes, and career reflections.",
		"",
		"## Discovery",
		`- Canonical site: ${baseUrl}`,
		`- Blog index: ${baseUrl}/#latest-posts`,
		`- RSS feed: ${baseUrl}/feed.xml`,
		`- Sitemap: ${baseUrl}/sitemap-index.xml`,
		`- Full LLM index: ${baseUrl}/llms-full.txt`,
		"",
		"## Author",
		"- Name: Santiago Carrasco",
		"- Handle: Santychuy",
		"- Location: Hermosillo, Mexico",
		"",
		"## Content Notes",
		"- Primary language: English",
		"- Content type: Long-form blog posts in Markdown",
		"- Reuse guideline: cite the canonical post URL when quoting",
	].join("\n");

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
