import rss from "@astrojs/rss";
import type { Locale } from "@ts/i18n";
import { getPostsByLocale, getPostUrl } from "@ts/posts";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const fallbackSite = "https://santychuy.com";
const md = new MarkdownIt({ html: true });

const feedConfig = {
	en: {
		title: "Santychuy's Blog",
		description:
			"Sharing my thoughts and experiences on web development and other tech-related topics.",
		language: "en-us",
	},
	es: {
		title: "Blog de Santychuy",
		description:
			"Comparto mis ideas y experiencias sobre desarrollo web y otros temas relacionados con tecnología.",
		language: "es-mx",
	},
} as const;

export const createLocalizedFeed = async (
	locale: Locale,
	context: { site?: URL },
) => {
	const posts = await getPostsByLocale(locale);
	const config = feedConfig[locale];

	return rss({
		title: config.title,
		description: config.description,
		site: context.site ?? fallbackSite,
		items: posts.map(({ data, id, body }) => ({
			title: data.title,
			description: data.shortDesc,
			pubDate: data.pubDate,
			link: getPostUrl({ data, id }),
			author: data.author.name,
			categories: data.categories,
			content: sanitizeHtml(md.render(body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "mark"]),
			}),
		})),
		customData: `<language>${config.language}</language>`,
	});
};
