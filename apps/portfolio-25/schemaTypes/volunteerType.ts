import { defineType, defineField } from "sanity";

export const volunteerExperience = defineType({
  type: "object",
  name: "volunteerExperience",
  title: "Volunteer Experience",
  fields: [
    defineField({
      type: "string",
      name: "role",
      title: "Role",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "organization",
      title: "Organization",
      validation: (e) => e.required(),
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
      type: "text",
      name: "description",
      title: "Description",
    }),
  ],
});
