import { z } from "astro:content";

export const postSchema = z
	.object({
		title: z.string(),
		slug: z.string().optional(),
		lang: z.enum(["en", "es"]).default("en"),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		description: z.string(),
		shortDesc: z.string(),
		author: z.object({
			name: z.string(),
			img: z.string().optional(),
		}),
		image: z.string(),
		imageAlt: z.string(),
		categories: z.array(z.string()).min(1),
		keywords: z.array(z.string()).optional(),
		canonical: z.string().url().optional(),
	})
	.strict();

export type Post = z.infer<typeof postSchema>;
