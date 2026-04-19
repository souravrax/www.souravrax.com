import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogSchema, CONTENT_PATH } from '@souravrax/blog-content';

const blog = defineCollection({
	// Load Markdown and MDX files from the shared @souravrax/blog-content package.
	loader: glob({ base: CONTENT_PATH, pattern: '**/*.{md,mdx}' }),
	// Use the shared schema
	schema: blogSchema,
});

export const collections = { blog };
