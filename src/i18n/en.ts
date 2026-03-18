const en = {
	header: {
		homeLabel: "Go to homepage",
		languageLabel: "Change language",
		localeLabel: {
			en: "English",
			es: "Español",
		},
		theme: {
			switchToLight: "Switch to light mode",
			switchToDark: "Switch to dark mode",
			light: "Light",
			dark: "Dark",
		},
	},
	footer: {
		tagline: "Building in public.",
	},
	home: {
		title: "Why are human beings machines of interpretation?",
		intro:
			"I'm Santiago Carrasco, a SWE with a plan to share knowledge, thoughts, and the things I learn along the way.",
		currentFocusTitle: "Now",
		currentFocus: [
			{
				prefix: "Building @ ",
				label: "The & Company",
				href: "https://and.com",
			},
			{
				prefix: "",
				label:
					"Sharing content related to software and the ideas shaping how I work.",
				href: undefined,
			},
		],
		latestPostsTitle: "Latest posts",
		rssLabel: "RSS Feed",
		emptyState: "New posts are on the way.",
		pageDescription:
			"Santiago Carrasco is a software engineer sharing practical notes on web development, AI, and the projects shaping how he works and thinks.",
	},
	notFound: {
		title: "Page not found",
		description: "The page you're looking for doesn't exist or has been moved.",
		cta: "Go back home",
		metaTitle: "Page Not Found",
		metaDescription: "Are you lost?",
	},
} as const;

export default en;
