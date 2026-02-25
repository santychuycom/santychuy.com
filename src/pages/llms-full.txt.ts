import { getCollection } from "astro:content";

export const prerender = true;

const fallbackSite = "https://santychuy.com";

const getBaseUrl = (site?: URL) => {
	const value = site?.toString() ?? fallbackSite;
	return value.endsWith("/") ? value.slice(0, -1) : value;
};

const normalizePostId = (id: string) =>
	id.replace(/\.(md|mdx|markdown)$/i, "").replaceAll(".", "");

const toExcerpt = (body: string, limit = 320) => {
	const plain = body
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
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
	const posts = await getCollection("posts");
	const sortedPosts = posts.sort(
		(a, b) =>
			Number(new Date(b.data.pubDate)) - Number(new Date(a.data.pubDate)),
	);

	const lines: string[] = [
		"# santychuy.com - llms full index",
		"",
		"Machine-readable catalog of blog content from santychuy.com.",
		"Prefer canonical URLs when citing or quoting content.",
		"",
		`Generated from ${baseUrl}`,
		`RSS: ${baseUrl}/feed.xml`,
		`Sitemap: ${baseUrl}/sitemap-index.xml`,
		"",
		"## Posts",
		"",
	];

	for (const { id, data, body } of sortedPosts) {
		const slug = normalizePostId(data.slug ?? id);
		const canonical = data.canonical ?? `${baseUrl}/blog/${slug}`;
		const language = data.lang === "es" ? "es-MX" : "en-US";
		const published = data.pubDate.toISOString();
		const updated = (data.updatedDate ?? data.pubDate).toISOString();
		const categories = data.categories.join(", ");
		const keywords = data.keywords?.join(", ") ?? "";
		const excerpt = toExcerpt(body ?? "");

		lines.push(`### ${data.title}`);
		lines.push(`- URL: ${canonical}`);
		lines.push(`- Published: ${published}`);
		lines.push(`- Updated: ${updated}`);
		lines.push(`- Language: ${language}`);
		lines.push(`- Categories: ${categories}`);
		if (keywords.length > 0) lines.push(`- Keywords: ${keywords}`);
		lines.push(`- Summary: ${data.shortDesc}`);
		if (excerpt.length > 0) lines.push(`- Excerpt: ${excerpt}`);
		lines.push("");
	}

	return new Response(lines.join("\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
