import { defineType, defineField } from "sanity";

export const project = defineType({
  type: "object",
  name: "project",
  title: "Project",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Project Name",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "text",
      name: "description",
      title: "Description",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "url",
      title: "Project URL",
    }),
    defineField({
      type: "string",
      name: "github",
      title: "GitHub Repository",
    }),
    defineField({
      type: "array",
      name: "technologies",
      title: "Technologies Used",
      of: [{ type: "string" }],
    }),
    defineField({
      type: "date",
      name: "startDate",
      title: "Start Date",
    }),
    defineField({
      type: "date",
      name: "endDate",
      title: "End Date",
    }),
    defineField({
      type: "image",
      name: "image",
      title: "Project Image",
    }),
  ],
});
