const es = {
	header: {
		homeLabel: "Ir al inicio",
		aiModelsLabel: "Ranking Modelos de IA",
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
	aiModels: {
		metaTitle: "Ranking Modelos de IA",
		metaDescription:
			"Opiniones de Santiago sobre modelos de IA, ordenadas manualmente y acompañadas por evidencia diaria de uso reconstruida de registros locales.",
		title: "Ranking Modelos de IA",
		intro:
			"Mi perspectiva actual de los modelos de IA que uso. Mis favoritos reflejan mi preferencia personal; la evidencia de Memex muestra cuánta experiencia directa respalda cada opinión.",
		generated: "Evidencia actualizada",
		favoritesTab: "Mis favoritos",
		byRoleTab: "Por función",
		favoritesTitle: "Los modelos que elijo primero",
		favoritesIntro:
			"Este orden es manual. La evidencia de uso muestra familiaridad, no calidad del modelo.",
		rolesTitle: "Elige según la tarea",
		rolesIntro:
			"Cada modelo reseñado tiene una función principal. Es una guía práctica, no otro ranking.",
		roles: {
			frontier: {
				label: "Frontera",
				badge: "Frontera",
				description:
					"La mejor capacidad cuando la calidad importa más que la velocidad o el costo.",
			},
			workhorse: {
				label: "Uso diario",
				badge: "Uso diario",
				description:
					"Opciones confiables para la mayor parte del trabajo serio.",
			},
			lightweight: {
				label: "Rápidos y ligeros",
				badge: "Rápido y ligero",
				description: "Opciones ágiles para tareas acotadas e iteración rápida.",
			},
		},
		roleEmpty: "Aún no hay un modelo reseñado en esta función.",
		observedUsage: "Observado por Memex",
		rank: "Puesto",
		reviewLink: "Reseña y evidencia",
		backToRanking: "Volver al ranking",
		review: "Reseña",
		evidenceAtGlance: "Evidencia de un vistazo",
		detailedEvidence: "Evidencia detallada",
		evidence: "Evidencia",
		unrankedCount: "Ver {count} modelos",
		directoryDisclosure:
			"El ranking es una opinión manual y subjetiva de Santiago. El uso muestra familiaridad con un modelo, no calidad objetiva.",
		bestFor: "Mejor para:",
		tradeoff: "Desventaja:",
		activeDays: "Días activos",
		events: "Eventos de uso",
		uncachedInput: "Entrada sin caché",
		cacheRead: "Lecturas de caché",
		cacheWrite: "Escrituras de caché",
		output: "Salida",
		reasoning: "Subconjunto de razonamiento",
		total: "Total de tokens procesados",
		apiEstimate: "Estimación equivalente de API",
		firstObserved: "Primera observación",
		lastObserved: "Última observación",
		costCoverage: "Cobertura de costos",
		noEvidence: "Aún no hay evidencia de uso coincidente.",
		unranked: "Usados, sin reseña",
		unrankedIntro:
			"Modelos observados por Memex que aún no tienen una reseña escrita manualmente.",
		emptyRanked:
			"Aún no hay modelos clasificados. Santiago agregará la clasificación y las opiniones bilingües cuando estén listas.",
		emptyUnranked: "Aún no hay uso sin clasificar.",
		history: "Historial diario",
		showAllHistory: "Mostrar todo el historial",
		collapseHistory: "Mostrar menos historial",
		historyIntro:
			"Todos los agregados diarios publicados, contraídos por defecto para mantener el enfoque editorial.",
		historyCaption: "Uso diario agregado de modelos reconstruido por Memex",
		date: "Fecha",
		model: "Modelo",
		sources: "Fuentes",
		mostUsedSource: "Fuente más usada",
		methodology: "Metodología",
		opinionNote:
			"Cada opinión en esta página está escrita y ordenada manualmente por Santiago. Es subjetiva, puede cambiar y nunca se calcula a partir de tokens, costos, actividad o volumen de solicitudes.",
		evidenceNote:
			"El uso es evidencia autorreportada reconstruida por Memex desde registros locales de agentes. Muestra familiaridad con un modelo, no calidad objetiva. Solo se publican contadores agrupados por día calendario local y modelo.",
		tokensNote:
			"El total de tokens procesados incluye entrada sin caché, lecturas de caché, escrituras de caché y salida. Las lecturas de caché pueden dominar el total, por eso el desglose se muestra por separado.",
		costNote:
			"Los costos son estimaciones analíticas equivalentes a API reconstruidas de telemetría local del proveedor. No representan cargos de suscripción, cuotas de suscripción, facturas ni dinero pagado confirmado.",
		collector: "Recolector",
		timezone: "Zona horaria del calendario",
		overallCoverage: "Cobertura de costos de fuente",
		unknownProviders: "Eventos con proveedor desconocido",
		unknownModels: "Eventos con modelo desconocido",
		conservative: "Eventos conservadores",
		warnings: "Advertencias",
		none: "Ninguna",
		unavailable: "No disponible",
		unknownProvider: "Proveedor desconocido",
		unknownModel: "Modelo desconocido",
		dataLink: "Descargar el JSON de evidencia pública",
		repositoryLink: "Ver el repositorio fuente",
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
