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
		tagline: "Construyendo en publico.",
	},
	home: {
		title: "¿Por que los seres humanos son maquinas de interpretacion?",
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
					"Compartiendo contenido sobre software y las ideas que dan forma a como trabajo.",
				href: undefined,
			},
		],
		latestPostsTitle: "Ultimos posts",
		rssLabel: "Feed RSS",
		emptyState: "Adaptando los posts a Español.",
		pageDescription:
			"Santiago Carrasco es un ingeniero de software que comparte notas practicas sobre desarrollo web, IA y los proyectos que moldean como trabaja y piensa.",
	},
	notFound: {
		title: "Pagina no encontrada",
		description: "La pagina que buscas no existe o fue movida.",
		cta: "Volver al inicio",
		metaTitle: "Pagina No Encontrada",
		metaDescription: "¿Te perdiste?",
	},
} as const;

export default es;
