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
    // ───────── СЛУЖЕБНЫЕ ─────────
    "/links.astro": { status: 301, destination: "/links/" },
    "/transparenz.astro": { status: 301, destination: "/transparenz/" },
    "/impressum.astro": { status: 301, destination: "/impressum/" },
    "/datenschutzerklaerung.astro": { status: 301, destination: "/datenschutzerklaerung/" },
    "/kontakt.astro": { status: 301, destination: "/kontakt/" },
    "/ueber-uns.astro": { status: 301, destination: "/ueber-uns/" },

    // ───────── ТОВАРЫ ─────────
    "/empfehlungen/tapo-c210/": { status: 301, destination: "/empfehlungen/sicherheit/tp-link-tapo-c210/" },
    "/empfehlungen/sicherheit/tapo-c210/": { status: 301, destination: "/empfehlungen/sicherheit/tp-link-tapo-c210/" },
    "/empfehlungen/reolink-argus-3-pro/": { status: 301, destination: "/empfehlungen/sicherheit/reolink-argus-3-pro/" },
    "/empfehlungen/google-nest-cam/": { status: 301, destination: "/empfehlungen/sicherheit/google-nest-cam/" },
    "/empfehlungen/ezviz-ep3x-pro/": { status: 301, destination: "/empfehlungen/sicherheit/ezviz-ep3x-pro/" },
    "/empfehlungen/eufy-e220-innenkamera/": { status: 301, destination: "/empfehlungen/sicherheit/eufy-e220-innenkamera/" },
    "/empfehlungen/echo-pop-bluetooth-lautsprecher/": { status: 301, destination: "/empfehlungen/smarthome/echo-pop/" },
    "/empfehlungen/anker-usb-c-ladegerat/": { status: 301, destination: "/empfehlungen/sonstiges/anker-usb-c-ladegerat/" },
    "/empfehlungen/philips-sonicare-9900-prestige/": { status: 301, destination: "/empfehlungen/sonstiges/philips-sonicare-9900-prestige/" },

    // ───────── БРЕНДЫ / СТАТЬИ ─────────
    "/marken/fritz!/": { status: 301, destination: "/marken/avm/" },
    "/marken/medion/": { status: 301, destination: "/marken/" },
    "/verstehen/wlan-repeater-oder-mesh/": { status: 301, destination: "/vergleiche/wlan-repeater-oder-mesh/" },
    "/mesh-vs-repeater/": { status: 301, destination: "/vergleiche/wlan-repeater-oder-mesh/" },

    // ───────── VIDEO → ДЕНЬГИ ─────────
    "/video/tapo-p300-smart-wlan-steckdosenleiste/": { status: 301, destination: "/empfehlungen/smarthome/tapo-p300/" },
    "/video/woliliwo-10zoll-video-tuersprechanlage/": { status: 301, destination: "/empfehlungen/sicherheit/woliliwo-video-doorbell/" },
    "/video/tp-link-kasa-kp115/": { status: 301, destination: "/empfehlungen/smarthome/tp-link-kasa-kp115/" },
    "/video/vevor-diesel-luftheizung-8kw/": { status: 301, destination: "/empfehlungen/sonstiges/vevor-diesel-heizung/" },
    "/video/comfee-breezy-cool-pro-2-6/": { status: 301, destination: "/empfehlungen/klima/comfee-breezy-cool/" },
    "/video/marderschreck-auto/": { status: 301, destination: "/empfehlungen/sonstiges/marderschreck-auto/" },
    "/video/serenelife-4in1-9000btu/": { status: 301, destination: "/empfehlungen/klima/serenelife-9000-btu/" },
    "/video/eufy-e220-innenkamera/": { status: 301, destination: "/empfehlungen/sicherheit/eufy-e220-innenkamera/" },
    "/video/mova-e30-ultra/": { status: 301, destination: "/empfehlungen/haushalt/mova-e30-ultra/" },
    "/video/ring-akku-videoturklingel-2024-/": { status: 301, destination: "/empfehlungen/sicherheit/ring-battery-doorbell-2024/" },
    "/video/hilook-indoor-pt/": { status: 301, destination: "/empfehlungen/sicherheit/hilook-indoor-pt/" },

    // ВСЁ остальное из видео
    "/video/[...slug]": { status: 301, destination: "/empfehlungen/" },

    // мусорный search
    "/links/?q=%7Bsearch_term_string%7D": { status: 301, destination: "/links/" }
  }
});