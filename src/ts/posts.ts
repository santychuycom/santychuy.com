import { type CollectionEntry, getCollection } from "astro:content";
import { getBlogPostUrl, type Locale } from "@ts/i18n";

export type PostEntry = CollectionEntry<"posts">;

export const normalizeContentId = (value: string) =>
	value.replace(/\.(md|mdx|markdown)$/i, "");

export const getPostSlugFromId = (id: string) => {
	const normalizedId = normalizeContentId(id);
	const segments = normalizedId.split("/");
	return segments.at(-1) ?? normalizedId;
};

export const getPostSlug = (entry: Pick<PostEntry, "id" | "data">) =>
	entry.data.slug ?? getPostSlugFromId(entry.id);

export const sortPostsByDate = (posts: PostEntry[]) =>
	[...posts].sort(
		(a, b) =>
			Number(new Date(b.data.pubDate)) - Number(new Date(a.data.pubDate)),
	);

const WORDS_PER_MINUTE = 200;

export const estimateReadingMinutes = (body: string | undefined) => {
	const words = (body ?? "")
		.replace(/^\s*(import|export)\s.+$/gmu, " ")
		.replace(/<[^>]+>/gu, " ")
		.replace(/!?\[([^\]]*)\]\([^)]*\)/gu, "$1")
		.split(/\s+/u)
		.filter((word) => /[\p{L}\p{N}]/u.test(word)).length;

	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export type PostWithReadingTime = PostEntry & { readingMinutes: number };

export const getAllPosts = () => getCollection("posts");

export const getPostsByLocale = async (
	locale: Locale,
): Promise<PostWithReadingTime[]> =>
	sortPostsByDate(
		(await getAllPosts()).filter((post) => post.data.lang === locale),
	).map((post) => ({
		...post,
		readingMinutes: estimateReadingMinutes(post.body),
	}));

export const getPostBySlug = async (locale: Locale, slug: string) =>
	(await getAllPosts()).find(
		(post) => post.data.lang === locale && getPostSlug(post) === slug,
	);

export const getPostPairBySlug = async (slug: string) => {
	const posts = await getAllPosts();

	let en: PostEntry | undefined;
	let es: PostEntry | undefined;

	for (const post of posts) {
		if (getPostSlug(post) !== slug) {
			continue;
		}

		if (post.data.lang === "es") {
			es = post;
			continue;
		}

		en = post;
	}

	return { en, es };
};

export const getPostUrl = (entry: Pick<PostEntry, "id" | "data">) =>
	getBlogPostUrl(entry.data.lang, getPostSlug(entry));
