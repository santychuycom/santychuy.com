export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];
export type LocaleUrlMap = Partial<Record<Locale, string>>;

export const defaultLocale: Locale = "en";

export const isLocale = (value: string | undefined): value is Locale =>
	value === "en" || value === "es";

export const getLocaleFromPathname = (pathname: string): Locale =>
	pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";

export const getLocaleHomeUrl = (locale: Locale) =>
	locale === "es" ? "/es/" : "/";

export const getLocalizedPath = (locale: Locale, path = "") => {
	const normalizedPath = path.replace(/^\/+|\/+$/g, "");

	if (!normalizedPath) {
		return getLocaleHomeUrl(locale);
	}

	return locale === "es" ? `/es/${normalizedPath}` : `/${normalizedPath}`;
};

export const getBlogPostUrl = (locale: Locale, slug: string) =>
	getLocalizedPath(locale, `blog/${slug}`);

export const getFeedUrl = (locale: Locale) =>
	locale === "es" ? "/es/feed.xml" : "/feed.xml";

export const getAlternateLocale = (locale: Locale): Locale =>
	locale === "es" ? "en" : "es";
