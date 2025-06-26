// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import "dotenv/config";

import react from "@astrojs/react";

import sanity from "@sanity/astro";

const SANITY_STUDIO_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID;
const SANITY_STUDIO_DATASET = process.env.SANITY_STUDIO_DATASET;

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sanity({
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: SANITY_STUDIO_DATASET,
      useCdn: false,
      studioBasePath: "/admin",
    }),
  ],
});
