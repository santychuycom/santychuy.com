const en = {
	header: {
		homeLabel: "Go to homepage",
		aiModelsLabel: "Ranking AI Models",
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
	aiModels: {
		metaTitle: "Ranking AI Models",
		metaDescription:
			"Santiago’s manually ordered AI model opinions, supported by privacy-safe daily usage evidence reconstructed from local agent logs.",
		title: "Ranking AI Models",
		intro:
			"My current, manually ordered view of the models I use. The evidence below shows experience with a model, based on my personal usage and evidence.",
		generated: "Updated",
		ranked: "Ranked models",
		rankedIntro:
			"The order below is set manually, based on usage and personal experience with the model.",
		rank: "Rank",
		reviewLink: "Review and evidence",
		backToRanking: "Back to ranking",
		review: "Review",
		evidenceAtGlance: "Evidence at a glance",
		detailedEvidence: "Detailed evidence",
		evidence: "Evidence",
		unrankedCount: "See: {count} models",
		directoryDisclosure:
			"Ranking is Santiago’s manual, subjective opinion. Usage shows familiarity with a model, not objective quality.",
		bestFor: "Best for:",
		tradeoff: "Tradeoff:",
		activeDays: "Active days",
		events: "Usage events",
		uncachedInput: "Uncached input",
		cacheRead: "Cache reads",
		cacheWrite: "Cache writes",
		output: "Output",
		reasoning: "Reasoning subset",
		total: "Total processed tokens",
		apiEstimate: "API-equivalent estimate",
		firstObserved: "First observed",
		lastObserved: "Last observed",
		costCoverage: "Cost coverage",
		noEvidence: "No matching usage evidence yet.",
		unranked: "Used but not ranked",
		unrankedIntro:
			"Usage observed by Memax, do not belong to a manually ranked card.",
		emptyRanked:
			"No models are ranked yet. Santiago will add rankings and bilingual opinions when ready.",
		emptyUnranked: "No unranked usage yet.",
		history: "Daily history",
		showAllHistory: "Show all history",
		collapseHistory: "Show less history",
		historyIntro:
			"All published daily aggregates, collapsed by default to keep this page editorial.",
		historyCaption: "Daily aggregate model usage reconstructed by Memex",
		date: "Date",
		model: "Model",
		sources: "Sources",
		mostUsedSource: "Most used source",
		methodology: "Methodology",
		opinionNote:
			"Every opinion on this page is written and ordered manually by Santiago. It is subjective, expected to change, and never calculated from tokens, cost, activity, or request volume.",
		evidenceNote:
			"Usage is self-reported evidence reconstructed from local agent logs by Memex. It shows familiarity with a model, not objective model quality. Only counters grouped by local calendar day and model are published.",
		tokensNote:
			"Total processed tokens include uncached input, cache reads, cache writes, and output. Cache reads can dominate the total, so the token breakdown is shown separately.",
		costNote:
			"Costs are analytical API-equivalent estimates reconstructed from local provider telemetry. They do not represent subscription charges, subscription quotas, invoices, or confirmed money paid.",
		collector: "Collector",
		timezone: "Calendar timezone",
		overallCoverage: "Source-cost coverage",
		unknownProviders: "Unknown-provider events",
		unknownModels: "Unknown-model events",
		conservative: "Conservative events",
		warnings: "Warnings",
		none: "None",
		unavailable: "Unavailable",
		unknownProvider: "Unknown provider",
		unknownModel: "Unknown model",
		dataLink: "Download the public evidence JSON",
		repositoryLink: "View the source repository",
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
