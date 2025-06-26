import { defineType, defineField, defineArrayMember } from "sanity";

export const skill = defineType({
  type: "object",
  name: "skill",
  title: "Skill",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Skill Name",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "number",
      name: "proficiency",
      title: "Proficiency (1-10)",
      validation: (e) => e.required().min(1).max(10),
    }),
  ],
});

export const skillCategory = defineType({
  type: "object",
  name: "skillCategory",
  title: "Skill Category",
  fields: [
    defineField({
      type: "string",
      name: "category",
      title: "Category",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "array",
      name: "skills",
      title: "Skills",
      of: [defineArrayMember({ type: "skill" })],
    }),
  ],
});
