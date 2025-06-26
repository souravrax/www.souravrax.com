import { defineType, defineField } from "sanity";

export const award = defineType({
  type: "object",
  name: "award",
  title: "Award",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Award Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "issuer",
      title: "Issuing Organization",
    }),
    defineField({
      type: "date",
      name: "date",
      title: "Date",
    }),
    defineField({
      type: "text",
      name: "description",
      title: "Description",
    }),
  ],
});
