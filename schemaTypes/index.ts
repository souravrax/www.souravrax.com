import { blogType } from "./blog";
import { authorType } from "./authorType";
import { callToAction } from "./ctaType";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";

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

export const schemaTypes = [
  authorType,
  blogType,
  categoryType,
  blockContentType,
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
