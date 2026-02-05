import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { postSchema } from "./src/schemas/post";

const posts = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
	schema: postSchema,
});

export const collections = { posts };
