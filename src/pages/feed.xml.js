import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const md = new MarkdownIt();

const normalizePostId = (id) =>
	id.replace(/\.(md|mdx|markdown)$/i, "").replaceAll(".", "");

export async function GET(context) {
	const posts = await getCollection("posts");
	const sortedPosts = posts.sort(
		(a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate),
	);

	return rss({
		title: "Santychuy's Blog",
		description:
			"Sharing my thoughts and experiences on web development and other tech-related topics.",
		site: context.site,
		items: sortedPosts.map(({ data, id, body }) => ({
			title: data.title,
			description: data.shortDesc,
			pubDate: data.pubDate,
			link: `/blog/${normalizePostId(id)}`,
			author: data.author.name,
			categories: data.categories,
			content: sanitizeHtml(md.render(body)),
		})),
		customData: `<language>en-us</language>`,
	});
}
