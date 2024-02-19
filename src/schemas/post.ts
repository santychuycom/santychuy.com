import { z } from 'astro:content';

export const postSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  shortDesc: z.string(),
  author: z.object({
    name: z.string(),
    img: z.string().optional(),
  }),
  image: z.string(),
  categories: z.array(z.string()),
});

export type Post = z.infer<typeof postSchema>;
