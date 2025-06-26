import { defineType, defineField, defineArrayMember } from "sanity";

export const blog = defineType({
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
