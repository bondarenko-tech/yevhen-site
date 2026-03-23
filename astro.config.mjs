import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://yevhenbondarenko.com",
  trailingSlash: "always",

  integrations: [
    tailwind(),
    mdx()
  ],

  build: {
    format: "directory"
  },

  compressHTML: true,

  redirects: {

    // 🔥 FIX: старые URL без категории → новые
    "/empfehlungen/fritzbox-6690-kabel-wlan-problem/": {
      status: 301,
      destination: "/empfehlungen/netzwerk/fritzbox-6690-kabel-wlan-problem/"
    },
    "/empfehlungen/fritzbox-6690-kabel-wlan-problem": {
      status: 301,
      destination: "/empfehlungen/netzwerk/fritzbox-6690-kabel-wlan-problem/"
    },

    // 🔥 ОБЩИЕ SEO фиксы
    "/empfehlungen/tapo-c210/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/tp-link-tapo-c210/"
    },
    "/empfehlungen/reolink-argus-3-pro/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/reolink-argus-3-pro/"
    },
    "/empfehlungen/google-nest-cam/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/google-nest-cam/"
    },

    // 🔥 служебные
    "/links/": {
      status: 301,
      destination: "/links/alle/"
    }
  }
});