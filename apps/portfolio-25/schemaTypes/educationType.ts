import { defineType, defineField } from "sanity";

export const education = defineType({
  type: "object",
  name: "education",
  title: "Education",
  fields: [
    defineField({
      type: "string",
      name: "degree",
      title: "Degree",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "field",
      title: "Field of Study",
    }),
    defineField({
      type: "string",
      name: "institution",
      title: "Institution",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "location",
      title: "Location",
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
      type: "string",
      name: "gpa",
      title: "GPA",
    }),
    defineField({
      type: "array",
      name: "achievements",
      title: "Achievements",
      of: [{ type: "string" }],
    }),
  ],
});
