import { defineType, defineField } from "sanity";

export const language = defineType({
  type: "object",
  name: "language",
  title: "Language",
  fields: [
    defineField({
      type: "string",
      name: "language",
      title: "Language",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "proficiency",
      title: "Proficiency",
      options: {
        list: [
          { title: "Native", value: "native" },
          { title: "Fluent", value: "fluent" },
          { title: "Proficient", value: "proficient" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Basic", value: "basic" },
        ],
      },
      validation: (e) => e.required(),
    }),
  ],
});
