import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://yevhenbondarenko.com",

  trailingSlash: "always",

  redirects: {
    "/empfehlungen/netzwerk/telekom-speedport-pro-plus-gaming-edition/":
      "/empfehlungen/netzwerk/telekom-speedport-pro-plus-gaming/",
  },

  integrations: [
    tailwind(),
    mdx()
  ],

  build: {
    format: "directory"
  },

  compressHTML: true
});