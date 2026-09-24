import { defineConfig } from "astro/config";

// Public tracker site. Served from GitHub Pages at:
//   https://ch4114-tem-project-sbs-group.github.io/project-tracker/
export default defineConfig({
  site: "https://ch4114-tem-project-sbs-group.github.io",
  base: "/project-tracker",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
