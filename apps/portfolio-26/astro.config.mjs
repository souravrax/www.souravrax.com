// @ts-check

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://souravrax.com",
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: ["../../"],
      },
    },
  },
  integrations: [mdx(), sitemap(), react()],
  server: {
    host: "0.0.0.0",
  },
});
