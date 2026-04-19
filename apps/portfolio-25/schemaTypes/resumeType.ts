import { defineType, defineField, defineArrayMember } from "sanity";

export const resume = defineType({
  type: "document",
  name: "resume",
  title: "Resume",
  fields: [
    // Personal Information
    defineField({
      type: "string",
      name: "fullName",
      title: "Full Name",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "jobTitle",
      title: "Job Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "string",
      name: "email",
      title: "Email",
      validation: (e) => e.required().email(),
    }),
    defineField({
      type: "string",
      name: "phone",
      title: "Phone Number",
    }),
    defineField({
      type: "string",
      name: "location",
      title: "Location",
    }),
    defineField({
      type: "string",
      name: "website",
      title: "Website/Portfolio",
    }),
    defineField({
      type: "string",
      name: "linkedin",
      title: "LinkedIn Profile",
    }),
    defineField({
      type: "string",
      name: "github",
      title: "GitHub Profile",
    }),
    defineField({
      type: "image",
      name: "profileImage",
      title: "Profile Image",
    }),
    defineField({
      type: "text",
      name: "summary",
      title: "Professional Summary",
      validation: (e) => e.required(),
    }),

    // Work Experience
    defineField({
      type: "array",
      name: "workHistory",
      title: "Work History",
      of: [defineArrayMember({ type: "workExperience" })],
    }),

    // Projects
    defineField({
      type: "array",
      name: "projects",
      title: "Projects",
      of: [defineArrayMember({ type: "project" })],
    }),

    // Education
    defineField({
      type: "array",
      name: "education",
      title: "Education",
      of: [defineArrayMember({ type: "education" })],
    }),

    // Skills
    defineField({
      type: "array",
      name: "skills",
      title: "Skills",
      of: [defineArrayMember({ type: "skillCategory" })],
    }),

    // Certifications
    defineField({
      type: "array",
      name: "certifications",
      title: "Certifications",
      of: [defineArrayMember({ type: "certification" })],
    }),

    // Languages
    defineField({
      type: "array",
      name: "languages",
      title: "Languages",
      of: [defineArrayMember({ type: "language" })],
    }),

    // Awards & Achievements
    defineField({
      type: "array",
      name: "awards",
      title: "Awards & Achievements",
      of: [defineArrayMember({ type: "award" })],
    }),

    // Volunteer Experience
    defineField({
      type: "array",
      name: "volunteerHistory",
      title: "Volunteer History",
      of: [defineArrayMember({ type: "volunteerExperience" })],
    }),

    // Resume Settings
    defineField({
      type: "string",
      name: "theme",
      title: "Resume Theme",
      options: {
        list: [
          { title: "Modern", value: "modern" },
          { title: "Classic", value: "classic" },
          { title: "Creative", value: "creative" },
          { title: "Minimal", value: "minimal" },
        ],
      },
      initialValue: "modern",
    }),
    defineField({
      type: "boolean",
      name: "isPublic",
      title: "Make Resume Public",
      initialValue: false,
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Resume URL Slug",
      options: {
        source: "fullName",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
  ],
});
