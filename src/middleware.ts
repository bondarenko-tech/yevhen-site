import { defineMiddleware } from "astro:middleware";

const REDIRECTS: Record<string, string> = {
  "/ueber-das-projekt/": "/ueber-uns/",
  "/ueber-das-projekt": "/ueber-uns/",
  "/home/": "/",
  "/home": "/",
  "/bio/": "/ueber-uns/",
  "/bio": "/ueber-uns/",

  "/links.astro": "/links/alle/",
  "/impressum.astro": "/impressum/",
  "/kontakt.astro": "/kontakt/",
  "/transparenz.astro": "/transparenz/",
  "/ueber-uns.astro": "/ueber-uns/",
  "/datenschutzerklaerung.astro": "/datenschutzerklaerung/",

  "/verstehen/mesh-oder-repeater/": "/vergleiche/wlan-repeater-oder-mesh/",
  "/verstehen/powerline-vs-mesh/": "/vergleiche/powerline-oder-mesh-wlan/",
  "/vergleiche/powerline-vs-repeater/": "/vergleiche/powerline-oder-wlan-repeater/",
  "/vergleiche/wlan-repeater-test/": "/vergleiche/wlan-repeater-vergleich/",
  "/vergleiche/brennenstuhl-eco-vs-premium/": "/vergleiche/brennenstuhl-eco-vs-premium-steckdosenleiste/",

  "/empfehlungen/google-nest-cam/": "/empfehlungen/sicherheit/google-nest-cam/",
  "/empfehlungen/reolink-argus-3-pro/": "/empfehlungen/sicherheit/reolink-argus-3-pro/",
  "/empfehlungen/tapo-c210/": "/empfehlungen/sicherheit/tp-link-tapo-c210/",
  "/empfehlungen/tapo-tp-link-c100/": "/empfehlungen/sicherheit/tp-link-tapo-c100/",
  "/empfehlungen/tp-link-tapo-c100/": "/empfehlungen/sicherheit/tp-link-tapo-c100/",
  "/empfehlungen/aqara-g5-pro-wlan-kamera/": "/empfehlungen/sicherheit/aqara-g5-pro-wlan-kamera/",
  "/empfehlungen/lupus-le-204/": "/empfehlungen/sicherheit/lupus-le204/",
  "/empfehlungen/lupus-le-204": "/empfehlungen/sicherheit/lupus-le204/",
  "/empfehlungen/lupus-le204/": "/empfehlungen/sicherheit/lupus-le204/",
  "/empfehlungen/ueberwachung/imou-dual-2k-innenkamera/": "/empfehlungen/sicherheit/imou-dual-2k-innenkamera/",
  "/empfehlungen/ueberwachung/lupus-le202-wlan-ip-kamera/": "/empfehlungen/sicherheit/lupus-le202-wlan-ip-kamera/",
  "/empfehlungen/ueberwachung/": "/empfehlungen/sicherheit/",
  "/empfehlungen/überwachung/": "/empfehlungen/sicherheit/",
  "/empfehlungen/tp-link-tapo-c200/": "/empfehlungen/sicherheit/tp-link-tapo-c200/",
  "/empfehlungen/tp-link-tapo-c210/": "/empfehlungen/sicherheit/tp-link-tapo-c210/",
  "/empfehlungen/eufy-e220-innenkamera/": "/empfehlungen/sicherheit/eufy-e220-innenkamera/",
  "/empfehlungen/imou-dual-2k-innenkamera/": "/empfehlungen/sicherheit/imou-dual-2k-innenkamera/",
  "/empfehlungen/blink-video-doorbell/": "/empfehlungen/sicherheit/blink-video-doorbell/",
  "/empfehlungen/boifun-wlan-video-tuerklingel/": "/empfehlungen/sicherheit/boifun-wlan-video-tuerklingel/",
  "/empfehlungen/mathfel-video-tuersprechanlage/": "/empfehlungen/sicherheit/mathfel-video-tuersprechanlage/",
  "/empfehlungen/aqara-g5-pro-wlan-kamera": "/empfehlungen/sicherheit/aqara-g5-pro-wlan-kamera/",
  "/empfehlungen/reolink-e1-pro/": "/empfehlungen/sicherheit/reolink-e1-pro/",
  "/empfehlungen/abus-facexess-tuersprechanlage/": "/empfehlungen/sicherheit/abus-facexess-tuersprechanlage/",
  "/empfehlungen/ring-akku-videoturklingel-2024-/": "/empfehlungen/sicherheit/ring-akku-videotuerklingel-2024/",
  "/empfehlungen/sicherheit/tapo-tp-link-c100/": "/empfehlungen/sicherheit/tp-link-tapo-c100/",

  "/empfehlungen/wlan-mesh/": "/empfehlungen/netzwerk/",
  "/empfehlungen/viture-luma-pro-xr-brille/": "/empfehlungen/sonstiges/viture-luma-pro-xr-brille/",
  "/empfehlungen/google-tv-streamer/": "/empfehlungen/smart-home/google-tv-streamer/",
  "/empfehlungen/tp-link-kasa-kp115/": "/empfehlungen/smart-home/tp-link-kasa-kp115/",
  "/empfehlungen/govee-led-strip/": "/empfehlungen/beleuchtung/govee-led-strip/",
  "/empfehlungen/led-schranklicht/": "/empfehlungen/beleuchtung/led-schranklicht/",
  "/empfehlungen/anker-usb-c-ladegerat/": "/empfehlungen/strom/anker-usb-c-ladegeraet/",
  "/empfehlungen/brennenstuhl-eco-line-steckdosenleiste/": "/empfehlungen/strom/brennenstuhl-eco-line-steckdosenleiste/",
  "/empfehlungen/philips-sonicare-9900-prestige/": "/empfehlungen/sonstiges/philips-sonicare-9900-prestige/",
  "/empfehlungen/ooono-co-driver-no1/": "/empfehlungen/sonstiges/ooono-co-driver-no1/",
  "/empfehlungen/pac-em90/": "/empfehlungen/klima/pac-em90/",
  "/empfehlungen/mobile-klimaanlage-peirhw/": "/empfehlungen/klima/mobile-klimaanlage-peirhw/",
  "/empfehlungen/midea-4-in-1-mobile-klimaanlage/": "/empfehlungen/klima/midea-4-in-1-mobile-klimaanlage/",
  "/empfehlungen/medion-p502-klimaanlage/": "/empfehlungen/klima/medion-p502-klimaanlage/",
  "/empfehlungen/klima/akku-auto-heizluefter/": "/empfehlungen/klima/akku-auto-heizluefter/",
  "/empfehlungen/mova-e30-ultra/": "/empfehlungen/sonstiges/mova-e30-ultra/",
  "/empfehlungen/spotclean-c5/": "/empfehlungen/sonstiges/spotclean-c5/",
  "/empfehlungen/audio/apple-airpods-pro-3-kabellose-kopfhoerer/": "/empfehlungen/sonstiges/apple-airpods-pro-3-kabellose-kopfhoerer/",
  "/empfehlungen/eufycam-2c-set-2-plus-1/": "/empfehlungen/sicherheit/eufycam-2c-set-2-plus-1/",
  "/empfehlungen/sygonix-video-tuersprechanlage": "/empfehlungen/sicherheit/sygonix-video-tuersprechanlage/",
  "/empfehlungen/uberwachungskameras-2025/": "/vergleiche/ueberwachungskameras-2025/",

  "/kategorien/": "/empfehlungen/",
  "/kategorien/ueberwachung/": "/empfehlungen/sicherheit/",
  "/kategorien/beleuchtung/": "/empfehlungen/beleuchtung/",
  "/kategorien/strom/": "/empfehlungen/strom/",
  "/kategorien/sonstiges/": "/empfehlungen/sonstiges/",
};

function normalizePath(pathname: string) {
  if (pathname !== "/" && /\/{2,}$/.test(pathname)) {
    return pathname.replace(/\/+$/, "/");
  }
  return pathname;
}

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = normalizePath(url.pathname);

  if (pathname.includes("überwachung")) {
    return context.redirect(pathname.replace("überwachung", "ueberwachung"), 301);
  }

  if (pathname.endsWith(".astro")) {
    return context.redirect(pathname.replace(/\.astro$/, "/"), 301);
  }

  if (REDIRECTS[pathname]) {
    return context.redirect(REDIRECTS[pathname], 301);
  }

  if (pathname.startsWith("/video/")) {
    return new Response(null, { status: 410 });
  }

  if (pathname.startsWith("/shorts/")) {
    return new Response(null, { status: 410 });
  }

  if (pathname.startsWith("/marken/")) {
    return new Response(null, { status: 410 });
  }

  if (pathname === "/tests/" || pathname.startsWith("/tests/")) {
    return new Response(null, { status: 410 });
  }

  if (pathname === "/links") {
    return context.redirect("/links/alle/", 301);
  }

  if (pathname === "/empfehlungen") {
    return context.redirect("/empfehlungen/", 301);
  }

  if (pathname === "/impressum") {
    return context.redirect("/impressum/", 301);
  }

  if (pathname === "/kontakt") {
    return context.redirect("/kontakt/", 301);
  }

  if (pathname === "/ueber-uns") {
    return context.redirect("/ueber-uns/", 301);
  }

  if (pathname === "/transparenz") {
    return context.redirect("/transparenz/", 301);
  }

  if (pathname === "/datenschutzerklaerung") {
    return context.redirect("/datenschutzerklaerung/", 301);
  }

  return next();
});