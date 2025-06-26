import { defineType, defineField } from "sanity";

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
