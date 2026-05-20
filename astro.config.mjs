// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sharpImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://batverkstad.se",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/tack/") && !page.includes("/boka/"),
    }),
  ],
  build: {
    assets: "_astro",
  },
  image: {
    service: sharpImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
