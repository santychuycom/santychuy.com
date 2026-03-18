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
		`- English blog index: ${baseUrl}/#latest-posts`,
		`- Spanish blog index: ${baseUrl}/es/#latest-posts`,
		`- English RSS feed: ${baseUrl}/feed.xml`,
		`- Spanish RSS feed: ${baseUrl}/es/feed.xml`,
		`- Sitemap: ${baseUrl}/sitemap-index.xml`,
		`- Full LLM index: ${baseUrl}/llms-full.txt`,
		"",
		"## Author",
		"- Name: Santiago Carrasco",
		"- Handle: Santychuy",
		"- Location: Hermosillo, Mexico",
		"",
		"## Content Notes",
		"- Primary languages: English and Spanish",
		"- Content type: Long-form blog posts in Markdown",
		"- Reuse guideline: cite the canonical post URL when quoting",
	].join("\n");

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
