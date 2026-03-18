import {
	getBlogPostUrl,
	getLocaleHomeUrl,
	type Locale,
	type LocaleUrlMap,
} from "@ts/i18n";
import type { PostEntry } from "@ts/posts";
import { getPostPairBySlug, normalizeContentId } from "@ts/posts";

type ResolvedPostPage =
	| { type: "not-found" }
	| { type: "redirect"; location: string; status: 301 | 302 }
	| {
			type: "page";
			slug: string;
			entry: PostEntry;
			homeHref: string;
			canonicalURL: string;
			imageURL: string;
			authorImageURL?: string;
			relativeAlternates: LocaleUrlMap;
			absoluteAlternates: LocaleUrlMap;
	  };

const toAbsoluteLocaleMap = (siteURL: URL, alternates: LocaleUrlMap) =>
	Object.fromEntries(
		Object.entries(alternates).map(([locale, path]) => [
			locale,
			new URL(path, siteURL).toString(),
		]),
	) as LocaleUrlMap;

export const resolvePostPage = async ({
	locale,
	id,
	siteURL,
}: {
	locale: Locale;
	id: string | undefined;
	siteURL: URL;
}): Promise<ResolvedPostPage> => {
	if (id === undefined) {
		return { type: "not-found" };
	}

	const slug = normalizeContentId(id);

	if (id !== slug) {
		return {
			type: "redirect",
			location: getBlogPostUrl(locale, slug),
			status: 301,
		};
	}

	const { en, es } = await getPostPairBySlug(slug);
	const entry = locale === "es" ? es : en;

	if (!entry) {
		if (locale === "es" && en) {
			return {
				type: "redirect",
				location: getBlogPostUrl("en", slug),
				status: 302,
			};
		}

		return { type: "not-found" };
	}

	const relativeAlternates: LocaleUrlMap = {
		en: getBlogPostUrl("en", slug),
		...(es ? { es: getBlogPostUrl("es", slug) } : {}),
	};

	return {
		type: "page",
		slug,
		entry,
		homeHref: `${getLocaleHomeUrl(locale)}#latest-posts`,
		canonicalURL:
			entry.data.canonical ??
			new URL(getBlogPostUrl(locale, slug), siteURL).toString(),
		imageURL: new URL(entry.data.image, siteURL).toString(),
		authorImageURL: entry.data.author.img
			? new URL(entry.data.author.img, siteURL).toString()
			: undefined,
		relativeAlternates,
		absoluteAlternates: toAbsoluteLocaleMap(siteURL, relativeAlternates),
	};
};
