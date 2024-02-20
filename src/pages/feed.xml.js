import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('posts');

  return rss({
    title: 'Santychuy’s Blog',
    description:
      'Sharing my thoughts and experiences on web development and other tech-related topics.',
    site: context.site,
    items: posts.map(({ data, slug, body }) => ({
      title: data.title,
      description: data.shortDesc,
      pubDate: data.pubDate,
      link: `/blog/${slug}`,
      author: data.author.name,
      categories: data.categories,
      content: sanitizeHtml(md.render(body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
