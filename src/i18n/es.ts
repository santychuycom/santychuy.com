const es = {
	header: {
		homeLabel: "Ir al inicio",
		languageLabel: "Cambiar idioma",
		localeLabel: {
			en: "English",
			es: "Español",
		},
		theme: {
			switchToLight: "Cambiar a modo claro",
			switchToDark: "Cambiar a modo oscuro",
			light: "Claro",
			dark: "Oscuro",
		},
	},
	footer: {
		tagline: "Construyendo en público.",
	},
	home: {
		title: "¿Por qué los seres humanos son máquinas de interpretación?",
		intro:
			"Soy Santiago Carrasco, un SWE con el plan de compartir conocimiento, ideas y las cosas que aprendo en el camino.",
		currentFocusTitle: "Ahora",
		currentFocus: [
			{
				prefix: "Construyendo @ ",
				label: "The & Company",
				href: "https://and.com",
			},
			{
				prefix: "",
				label:
					"Compartiendo contenido sobre software y las ideas que dan forma a cómo trabajo.",
				href: undefined,
			},
		],
		latestPostsTitle: "Últimos posts",
		rssLabel: "Feed RSS",
		emptyState: "Adaptando los posts a español.",
		pageDescription:
			"Santiago Carrasco es un ingeniero de software que comparte notas prácticas sobre desarrollo web, IA y los proyectos que moldean cómo trabaja y piensa.",
	},
	notFound: {
		title: "Página no encontrada",
		description: "La página que buscas no existe o fue movida.",
		cta: "Volver al inicio",
		metaTitle: "Página no encontrada",
		metaDescription: "¿Te perdiste?",
	},
} as const;

export default es;
