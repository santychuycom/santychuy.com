import { createLocalizedFeed } from "@ts/feed";

export async function GET(context) {
	return createLocalizedFeed("es", context);
}
