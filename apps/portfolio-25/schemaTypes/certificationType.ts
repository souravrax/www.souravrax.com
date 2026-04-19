import { defineType, defineField } from "sanity";

export const certification = defineType({
  type: "object",
  name: "certification",
  title: "Certification",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Certification Name",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "issuer",
      title: "Issuing Organization",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "date",
      name: "issueDate",
      title: "Issue Date",
    }),
    defineField({
      type: "date",
      name: "expiryDate",
      title: "Expiry Date",
    }),
    defineField({
      type: "string",
      name: "credentialId",
      title: "Credential ID",
    }),
    defineField({
      type: "string",
      name: "url",
      title: "Credential URL",
    }),
  ],
});
