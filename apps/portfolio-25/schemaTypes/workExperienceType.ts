import { defineType, defineField } from "sanity";

export const workExperience = defineType({
  type: "object",
  name: "workExperience",
  title: "Work Experience",
  fields: [
    defineField({
      type: "string",
      name: "jobTitle",
      title: "Job Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "company",
      title: "Company",
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
      validation: (e) => e.required(),
    }),
    defineField({
      type: "date",
      name: "endDate",
      title: "End Date",
    }),
    defineField({
      type: "boolean",
      name: "current",
      title: "Current Position",
      initialValue: false,
    }),
    defineField({
      type: "array",
      name: "responsibilities",
      title: "Responsibilities & Achievements",
      of: [{ type: "string" }],
    }),
    defineField({
      type: "array",
      name: "technologies",
      title: "Technologies Used",
      of: [{ type: "string" }],
    }),
  ],
});
