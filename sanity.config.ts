// sanity.config.ts
import {
  defineConfig,
  defineType,
  defineField,
  defineArrayMember,
} from "sanity";
import { structureTool } from "sanity/structure";

const blog = defineType({
  type: "document",
  name: "blog",
  title: "Blog",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "date",
      name: "date",
      title: "Date",
      validation: (e) => e.required(),
    }),
    defineField({ type: "image", name: "image", title: "Image" }),
    defineField({
      type: "array",
      name: "content",
      title: "Content",
      validation: (e) => e.required(),
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      type: "reference",
      name: "author",
      title: "Author",
      to: [{ type: "author" }],
      validation: (e) => e.required(),
    }),
    defineField({
      type: "callToAction",
      name: "callToAction",
      title: "Call To Action",
    }),
  ],
});

export const callToAction = defineType({
  type: "object",
  name: "callToAction",
  title: "Call To Action",
  fields: [
    defineField({
      type: "string",
      name: "label",
      title: "Label",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "slug",
      name: "url",
      title: "Url",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "boolean",
      name: "openInNewTab",
      title: "Open in new tab",
    }),
  ],
});

export const author = defineType({
  type: "document",
  name: "author",
  title: "Author",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Name",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (e) => e.required(),
    }),
    defineField({ type: "image", name: "portrait", title: "Portrait" }),
    defineField({ type: "text", name: "bio", title: "Bio" }),
    defineField({ type: "slug", name: "website", title: "Website" }),
  ],
});

export default defineConfig({
  name: "project-name",
  title: "Project Name",
  projectId: "drspcwf3",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [blog, author, callToAction],
  },
});
