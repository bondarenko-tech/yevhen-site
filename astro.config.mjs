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
    // Старые URL без категории → новые
    "/ueber-das-projekt/": {
    status: 301,
    destination: "/ueber-uns/"
    },

  "/ueber-das-projekt": {
    status: 301,
    destination: "/ueber-uns/"
    },


    "/empfehlungen/fritzbox-6690-kabel-wlan-problem/": {
      status: 301,
      destination: "/empfehlungen/netzwerk/fritzbox-6690-kabel-wlan-problem/"
    },
    "/empfehlungen/fritzbox-6690-kabel-wlan-problem": {
      status: 301,
      destination: "/empfehlungen/netzwerk/fritzbox-6690-kabel-wlan-problem/"
    },

    "/empfehlungen/google-tv-streamer/": {
      status: 301,
      destination: "/empfehlungen/smart-home/google-tv-streamer/"
    },
    "/empfehlungen/google-tv-streamer": {
      status: 301,
      destination: "/empfehlungen/smart-home/google-tv-streamer/"
    },

    "/empfehlungen/tp-link-kasa-kp115/": {
      status: 301,
      destination: "/empfehlungen/smart-home/tp-link-kasa-kp115/"
    },
    "/empfehlungen/tp-link-kasa-kp115": {
      status: 301,
      destination: "/empfehlungen/smart-home/tp-link-kasa-kp115/"
    },

    "/empfehlungen/tp-link-tapo-c200/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/tp-link-tapo-c200/"
    },
    "/empfehlungen/tp-link-tapo-c200": {
      status: 301,
      destination: "/empfehlungen/sicherheit/tp-link-tapo-c200/"
    },

    "/empfehlungen/tp-link-tapo-c210/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/tp-link-tapo-c210/"
    },
    "/empfehlungen/tp-link-tapo-c210": {
      status: 301,
      destination: "/empfehlungen/sicherheit/tp-link-tapo-c210/"
    },

    "/empfehlungen/reolink-argus-3-pro/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/reolink-argus-3-pro/"
    },
    "/empfehlungen/reolink-argus-3-pro": {
      status: 301,
      destination: "/empfehlungen/sicherheit/reolink-argus-3-pro/"
    },

    "/empfehlungen/google-nest-cam/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/google-nest-cam/"
    },
    "/empfehlungen/google-nest-cam": {
      status: 301,
      destination: "/empfehlungen/sicherheit/google-nest-cam/"
    },

    "/empfehlungen/aqara-g5-pro-wlan-kamera/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/aqara-g5-pro-wlan-kamera/"
    },
    "/empfehlungen/aqara-g5-pro-wlan-kamera": {
      status: 301,
      destination: "/empfehlungen/sicherheit/aqara-g5-pro-wlan-kamera/"
    },

    "/empfehlungen/aqara-e1-kamera/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/aqara-e1-kamera/"
    },
    "/empfehlungen/aqara-e1-kamera": {
      status: 301,
      destination: "/empfehlungen/sicherheit/aqara-e1-kamera/"
    },

    "/empfehlungen/blink-mini-2/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/blink-mini-2/"
    },
    "/empfehlungen/blink-mini-2": {
      status: 301,
      destination: "/empfehlungen/sicherheit/blink-mini-2/"
    },

    "/empfehlungen/bosch-eyes-aussenkamera-2/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/bosch-eyes-aussenkamera-2/"
    },
    "/empfehlungen/bosch-eyes-aussenkamera-2": {
      status: 301,
      destination: "/empfehlungen/sicherheit/bosch-eyes-aussenkamera-2/"
    },

    // Старые разделы / старые категории
    "/empfehlungen/ueberwachung/": {
      status: 301,
      destination: "/empfehlungen/sicherheit/"
    },
    "/kategorien/smart-home/echo-show-8-hd-smart-hub/": {
      status: 301,
      destination: "/empfehlungen/smart-home/echo-show-8-hd-smart-hub/"
    },

    // Старые статьи → новые сравнения
    "/verstehen/wlan-repeater-oder-mesh/": {
      status: 301,
      destination: "/vergleiche/wlan-repeater-oder-mesh/"
    },
    "/verstehen/powerline-vs-mesh/": {
      status: 301,
      destination: "/vergleiche/powerline-oder-mesh-wlan/"
    },
    "/verstehen/powerline-vs-mesh": {
      status: 301,
      destination: "/vergleiche/powerline-oder-mesh-wlan/"
    },

    // Служебные
    "/links/": {
      status: 301,
      destination: "/links/alle/"
    },
    "/links": {
      status: 301,
      destination: "/links/alle/"
    }
  }
});