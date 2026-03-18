import { getAllPosts, getPostUrl, sortPostsByDate } from "@ts/posts";

export const prerender = true;

const fallbackSite = "https://santychuy.com";

const getBaseUrl = (site?: URL) => {
	const value = site?.toString() ?? fallbackSite;
	return value.endsWith("/") ? value.slice(0, -1) : value;
};

const toExcerpt = (body: string, limit = 320) => {
	const plain = body
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/<[^>]*>/g, " ")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/#+\s+/g, " ")
		.replace(/[*_>~-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	if (plain.length <= limit) return plain;
	return `${plain.slice(0, limit).trimEnd()}...`;
};

export async function GET({ site }: { site?: URL }) {
	const baseUrl = getBaseUrl(site);
	const sortedPosts = sortPostsByDate(await getAllPosts());

	const lines: string[] = [
		"# santychuy.com - llms full index",
		"",
		"Machine-readable catalog of blog content from santychuy.com.",
		"Prefer canonical URLs when citing or quoting content.",
		"",
		`Generated from ${baseUrl}`,
		`English RSS: ${baseUrl}/feed.xml`,
		`Spanish RSS: ${baseUrl}/es/feed.xml`,
		`Sitemap: ${baseUrl}/sitemap-index.xml`,
		"",
		"## Posts",
		"",
	];

	for (const { id, data, body } of sortedPosts) {
		const canonical = data.canonical ?? `${baseUrl}${getPostUrl({ data, id })}`;
		const language = data.lang === "es" ? "es-MX" : "en-US";
		const published = data.pubDate.toISOString();
		const updated = (data.updatedDate ?? data.pubDate).toISOString();
		const categories = data.categories.join(", ");
		const keywords = data.keywords.join(", ");
		const excerpt = toExcerpt(body ?? "");

		lines.push(`### ${data.title}`);
		lines.push(`- URL: ${canonical}`);
		lines.push(`- Published: ${published}`);
		lines.push(`- Updated: ${updated}`);
		lines.push(`- Language: ${language}`);
		lines.push(`- Categories: ${categories}`);
		lines.push(`- Keywords: ${keywords}`);
		lines.push(`- Summary: ${data.shortDesc}`);
		if (data.tldr) lines.push(`- TL;DR: ${data.tldr}`);
		if (excerpt.length > 0) lines.push(`- Excerpt: ${excerpt}`);
		if (data.faq && data.faq.length > 0) {
			lines.push("- FAQ:");
			for (const { q, a } of data.faq) {
				lines.push(`  - Q: ${q}`);
				lines.push(`    A: ${a}`);
			}
		}
		lines.push("");
	}

	return new Response(lines.join("\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
