import { defineType, defineField, defineArrayMember } from "sanity";
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
