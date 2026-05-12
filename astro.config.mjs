import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://yevhenbondarenko.com",

  trailingSlash: "always",

  redirects: {
    "/empfehlungen/netzwerk/telekom-speedport-pro-plus-gaming-edition/":
      "/empfehlungen/netzwerk/telekom-speedport-pro-plus-gaming/",
    "/empfehlungen/netzwerk/telekom-speedport-7-wifi7-router/":
    "/empfehlungen/netzwerk/speedport-7-wifi7-router/",
    "/empfehlungen/sicherheit/sonoff-cam-slim-gen2/":
    "/empfehlungen/sicherheit/sonoff-cam-slim-gen2/",

    "/empfehlungen/klima/tado-thermostat-x-matter/":
    "/empfehlungen/klima/tado-thermostat-x-matter/",

    "/empfehlungen/sicherheit/sonoff-cam-slim-gen2/":
    "/empfehlungen/sicherheit/sonoff-cam-slim-gen2-test/",

    "/empfehlungen/klima/tado-thermostat-x-matter/":
    "/empfehlungen/klima/tado-thermostat-x/",

    "/empfehlungen/marderschreck-auto":
    "/empfehlungen/sonstiges/marderschreck-auto/",


    "/vergleiche/ueberwachungskamera-test/":
    "/vergleiche/ueberwachungskameras-2026/",

    "/vergleiche/powerline-oder-wlan-repeater/":
    "/powerline-oder-mesh-wlan/",
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