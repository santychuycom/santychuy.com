import { defaultLocale, isLocale, type Locale } from "@ts/i18n";
import en from "./en";
import es from "./es";

const messages = {
	en,
	es,
};

export type Messages = (typeof messages)[Locale];

export const getLocaleMessages = (locale: Locale): Messages => messages[locale];

export const getMessagesForPathname = (pathname: string) => {
	const locale = pathname.split("/")[1];
	return getLocaleMessages(isLocale(locale) ? locale : defaultLocale);
};
