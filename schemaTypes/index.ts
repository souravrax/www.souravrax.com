import { blog } from "./blogType";
import { author } from "./authorType";
import { callToAction } from "./ctaType";

// Resume-related types
import { resume } from "./resumeType";
import { workExperience } from "./workExperienceType";
import { education } from "./educationType";
import { skill, skillCategory } from "./skillType";
import { project } from "./projectType";
import { certification } from "./certificationType";
import { language } from "./languageType";
import { award } from "./awardType";
import { volunteerExperience } from "./volunteerType";

// Re-export all types
export {
  blog,
  author,
  callToAction,
  resume,
  workExperience,
  education,
  skill,
  skillCategory,
  project,
  certification,
  language,
  award,
  volunteerExperience,
};

// Schema types array for Sanity config
export const schemaTypes = [
  // Existing types
  author,
  blog,
  callToAction,

  // Resume types
  resume,
  workExperience,
  education,
  skill,
  skillCategory,
  project,
  certification,
  language,
  award,
  volunteerExperience,
];
