import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://yevhenbondarenko.com",

  trailingSlash: "always",

  redirects: {
  "/video/tp-link-tapo-c210/ 11.11.2025":
  "/empfehlungen/sicherheit/tp-link-tapo-c210/",
  "/video/tp-link-tapo-c210/%2011.11.2025/":
  "/empfehlungen/sicherheit/tp-link-tapo-c210/",
  "/video/tp-link-tapo-c210/ 11.11.2025/":
  "/empfehlungen/sicherheit/tp-link-tapo-c210/",
  "/video/eufy-solocam-s340/":
  "/empfehlungen/sicherheit/eufy-solocam-s340/",
  "/video/tp-link-tapo-c210/%2011.11.2025":
  "/empfehlungen/sicherheit/tp-link-tapo-c210/",
  "/video/bosch-smart-home-controller/":
  "/empfehlungen/smart-home/bosch-smart-home-controller/",
  "/video/sygonix-video-tuersprechanlage/":
  "/empfehlungen/sicherheit/sygonix-video-tuersprechanlage/",
  "/video/tapo-l530e-wlan-gluhbirne/":
  "/empfehlungen/beleuchtung/tapo-l530e-wlan-gluhbirne/",
  "/video/levoit-ventilator/":
  "/empfehlungen/klima/levoit-ventilator/",
  "/video/blessource-ki-uebersetzerbrille/":
  "/empfehlungen/sonstiges/blessource-ki-uebersetzerbrille/",
  "/video/amazon-fire-tv-cube/":
  "/empfehlungen/sonstiges/amazon-fire-tv-cube/",
  "/video/amazon-fire-tv-cube/":
  "/empfehlungen/sonstiges/amazon-fire-tv-cube/",
  "/video/fritz-dect-repeater-100/":
  "/empfehlungen/netzwerk/fritz-dect-repeater-100/",
  "/video/apple-airpods-4/":
  "/empfehlungen/smart-home/apple-airpods-4/",
  "/video/gku-dash-cam-4k-1080p/":
  "/empfehlungen/sicherheit/gku-dash-cam-4k-1080p/",
  "/video/eufycam-2c-set-2-plus-1/":
  "/empfehlungen/sicherheit/eufycam-2c-set-2-plus-1/",
  "/empfehlungen/mobile-klimaanlage-peirhw/":
  "/empfehlungen/klima/mobile-klimaanlage-peirhw/",
  "/empfehlungen/ueberwachung/dahua-bullet-d1-wifi-kamera/":
  "/empfehlungen/sicherheit/dahua-bullet-d1-wifi-kamera/",
  "/empfehlungen/viture-luma-pro-xr-brille":
  "/empfehlungen/sonstiges/viture-luma-pro-xr-brille/",
  "/empfehlungen/abus-facexess-tuersprechanlage/":
  "/empfehlungen/sicherheit/abus-facexess-tuersprechanlage/",
  "/empfehlungen/ezviz-4k-h3k-poe-kit/":
  "/empfehlungen/sicherheit/ezviz-4k-h3k-poe-kit/", 
  "/empfehlungen/roku-express-4k/":
  "/empfehlungen/smart-home/roku-express-4k/",
  "/video/blink-mini-2/":
  "/empfehlungen/sicherheit/blink-mini-2/",  
  "/empfehlungen/ueberwachung":
  "/empfehlungen/sicherheit/",
  "/empfehlungen/tp-link-tapo-p110":
  "/empfehlungen/strom/tp-link-tapo-p110/",
  "/empfehlungen/midea-4-in-1-mobile-klimaanlage":
  "/empfehlungen/klima/midea-4-in-1-mobile-klimaanlage/",
  "/empfehlungen/mobile-klimaanlage-4in1":
  "/empfehlungen/klima/mobile-klimaanlage-4in1/",
  "/empfehlungen/boifun-wlan-video-tuerklingel":
  "/empfehlungen/sicherheit/boifun-wlan-video-tuerklingel/",
  "/empfehlungen/ring-innenkamera-2":
  "/empfehlungen/sicherheit/ring-innenkamera-2/",

  "/empfehlungen/netzwerk/telekom-speedport-pro-plus-gaming-edition/":
    "/empfehlungen/netzwerk/telekom-speedport-pro-plus-gaming/",

  "/empfehlungen/netzwerk/telekom-speedport-7-wifi7-router/":
    "/empfehlungen/netzwerk/speedport-7-wifi7-router/",

  "/empfehlungen/sicherheit/sonoff-cam-slim-gen2/":
    "/empfehlungen/sicherheit/sonoff-cam-slim-gen2-test/",

  "/empfehlungen/klima/tado-thermostat-x-matter/":
    "/empfehlungen/klima/tado-thermostat-x/",

  "/empfehlungen/marderschreck-auto/":
    "/empfehlungen/sonstiges/marderschreck-auto/",

  "/empfehlungen/sonstiges/roborock-q7-m5/":
    "/empfehlungen/smart-home/roborock-q7-m5/",

  "/empfehlungen/sicherheit/reolink-duo-2-wifi/":
    "/empfehlungen/sicherheit/reolink-duo-2-wifi-180-grad-kamera-ohne-abo-de/",

  "/empfehlungen/netzwerk/lan-splitter-1-3-gigabit/":
    "/empfehlungen/netzwerk/vedindust-lan-splitter-1-auf-3-gigabit/",

  "/empfehlungen/klima/mobiles-klimageraet-mit-fernbedienung/":
    "/empfehlungen/klima/mobiles-klimagerat-mit-fernbedienung/",

  "/empfehlungen/homematic-ip-starter-set-beschattung/":
    "/empfehlungen/smart-home/homematic-ip-starter-set-beschattung/",

  "/empfehlungen/bosch-smart-home-controller-ii/":
    "/empfehlungen/smart-home/bosch-smart-home-controller-ii/",

  "/empfehlungen/hikam-s6/":
    "/empfehlungen/sicherheit/hikam-s6/",

  "/empfehlungen/uebersetzer-ohrhoerer-lcd/":
    "/empfehlungen/sonstiges/uebersetzer-ohrhorer-lcd/",

  "/empfehlungen/strom/brennenstuhl-eco-line-steckdosenleiste/":
    "/empfehlungen/strom/brennenstuhl-eco-line-steckdosenleiste-6fach-ueberspannungsschutz/",

  "/empfehlungen/klima/akku-auto-heizluefter/":
    "/empfehlungen/klima/vevor-diesel-luftheizung-8kw/",

  "/empfehlungen/mathfel-video-tuersprechanlage/":
    "/empfehlungen/sicherheit/mathfel-video-tuersprechanlage/",

  "/empfehlungen/audio/apple-airpods-pro-3-kabellose-kopfhoerer/":
    "/empfehlungen/smart-home/apple-airpods-pro-3-kabellose-kopfhoerer/",

  "/empfehlungen/ooono-co-driver-no1/":
    "/empfehlungen/sonstiges/ooono-co-driver-no1/",

  "/empfehlungen/überwachung/imou-dual-2k-innenkamera/":
    "/empfehlungen/sicherheit/imou-dual-2k-innenkamera/",

  "/empfehlungen/sicherheit/tapo-c210/":
    "/empfehlungen/sicherheit/tp-link-tapo-c210/",

  "/empfehlungen/reolink-e1-pro/":
    "/empfehlungen/sicherheit/reolink-e1-pro/",

  "/empfehlungen/mova-e30-ultra/":
    "/empfehlungen/sonstiges/mova-e30-ultra/",

  "/empfehlungen/ring-akku-videoturklingel-2024-/":
    "/empfehlungen/sicherheit/ring-akku-videotuerklingel-2024/",

    "/vergleiche/wlan-5ghz-vs-2-4ghz/":
    "/vergleiche/2-4ghz-vs-5ghz-wlan/",

  "/vergleiche/ueberwachungskamera-test/":
    "/vergleiche/ueberwachungskameras-2026/",

  "/vergleiche/powerline-oder-mesh/":
  "/vergleiche/powerline-oder-mesh-wlan/",

  "/vergleiche/powerline-oder-wlan-repeater/":
    "/vergleiche/powerline-oder-mesh-wlan/",

  "/verstehen/wlan-repeater-oder-mesh/":
    "/verstehen/mesh-vs-repeater/",

  "/verstehen/powerline/":
    "/verstehen/powerline-wann-sinnvoll/",
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