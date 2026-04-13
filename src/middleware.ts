import { defineMiddleware } from "astro:middleware";

const REDIRECTS = new Map<string, string>([
  ["/ueber-das-projekt/", "/ueber-uns/"],
  ["/ueber-das-projekt", "/ueber-uns/"],
  ["/home/", "/"],
  ["/home", "/"],
  ["/bio/", "/ueber-uns/"],
  ["/bio", "/ueber-uns/"],

  ["/links.astro", "/links/alle/"],
  ["/impressum.astro", "/impressum/"],
  ["/kontakt.astro", "/kontakt/"],
  ["/transparenz.astro", "/transparenz/"],
  ["/ueber-uns.astro", "/ueber-uns/"],
  ["/datenschutzerklaerung.astro", "/datenschutzerklaerung/"],

  ["/verstehen/mesh-oder-repeater/", "/vergleiche/wlan-repeater-vergleich/"],
  ["/verstehen/powerline-vs-mesh/", "/vergleiche/powerline-oder-mesh-wlan/"],
  ["/vergleiche/powerline-vs-repeater/", "/vergleiche/wlan-repeater-vergleich/"],
  ["/vergleiche/wlan-repeater-test/", "/vergleiche/wlan-repeater-vergleich/"],
  ["/vergleiche/brennenstuhl-eco-vs-premium/", "/vergleiche/brennenstuhl-eco-vs-premium-steckdosenleiste/"],
  ["/vergleiche/powerline-oder-mesh/", "/vergleiche/powerline-oder-mesh-wlan/"],
  ["/vergleiche/video-tuerklingel-ezviz-vs-ring/", "/vergleiche/video-tuerklingel-vergleich/"],

  ["/empfehlungen/google-nest-cam/", "/empfehlungen/sicherheit/google-nest-cam/"],
  ["/empfehlungen/reolink-argus-3-pro/", "/empfehlungen/sicherheit/reolink-argus-3-pro/"],
  ["/empfehlungen/tapo-c210/", "/empfehlungen/sicherheit/tp-link-tapo-c210/"],
  ["/empfehlungen/tapo-tp-link-c100/", "/empfehlungen/sicherheit/tp-link-tapo-c100/"],
  ["/empfehlungen/tp-link-tapo-c100/", "/empfehlungen/sicherheit/tp-link-tapo-c100/"],
  ["/empfehlungen/aqara-g5-pro-wlan-kamera/", "/empfehlungen/sicherheit/aqara-g5-pro-wlan-kamera/"],
  ["/empfehlungen/aqara-g5-pro-wlan-kamera", "/empfehlungen/sicherheit/aqara-g5-pro-wlan-kamera/"],
  ["/empfehlungen/lupus-le-204/", "/empfehlungen/sicherheit/lupus-le204/"],
  ["/empfehlungen/lupus-le-204", "/empfehlungen/sicherheit/lupus-le204/"],
  ["/empfehlungen/lupus-le204/", "/empfehlungen/sicherheit/lupus-le204/"],
  ["/empfehlungen/ueberwachung/imou-dual-2k-innenkamera/", "/empfehlungen/sicherheit/imou-dual-2k-innenkamera/"],
  ["/empfehlungen/überwachung/imou-dual-2k-innenkamera/", "/empfehlungen/sicherheit/imou-dual-2k-innenkamera/"],
  ["/empfehlungen/imou-dual-2k-innenkamera/", "/empfehlungen/sicherheit/imou-dual-2k-innenkamera/"],
  ["/empfehlungen/ueberwachung/lupus-le202-wlan-ip-kamera/", "/empfehlungen/sicherheit/lupus-le202-wlan-ip-kamera/"],
  ["/empfehlungen/überwachung/lupus-le202-wlan-ip-kamera/", "/empfehlungen/sicherheit/lupus-le202-wlan-ip-kamera/"],
  ["/empfehlungen/ueberwachung/dahua-bullet-d1-wifi-kamera/", "/empfehlungen/sicherheit/"],
  ["/empfehlungen/ueberwachung/", "/empfehlungen/sicherheit/"],
  ["/empfehlungen/überwachung/", "/empfehlungen/sicherheit/"],
  ["/empfehlungen/tp-link-tapo-c200/", "/empfehlungen/sicherheit/tp-link-tapo-c200/"],
  ["/empfehlungen/tp-link-tapo-c210/", "/empfehlungen/sicherheit/tp-link-tapo-c210/"],
  ["/empfehlungen/eufy-e220-innenkamera/", "/empfehlungen/sicherheit/eufy-e220-innenkamera/"],
  ["/empfehlungen/smart-home/eufy-e220-innenkamera/", "/empfehlungen/sicherheit/eufy-e220-innenkamera/"],
  ["/empfehlungen/blink-video-doorbell/", "/empfehlungen/sicherheit/blink-video-doorbell/"],
  ["/empfehlungen/boifun-wlan-video-tuerklingel/", "/empfehlungen/sicherheit/boifun-wlan-video-tuerklingel/"],
  ["/empfehlungen/mathfel-video-tuersprechanlage/", "/empfehlungen/sicherheit/mathfel-video-tuersprechanlage/"],
  ["/empfehlungen/reolink-e1-pro/", "/empfehlungen/sicherheit/reolink-e1-pro/"],
  ["/empfehlungen/abus-facexess-tuersprechanlage/", "/empfehlungen/sicherheit/abus-facexess-tuersprechanlage/"],
  ["/empfehlungen/ring-akku-videoturklingel-2024-/", "/empfehlungen/sicherheit/ring-akku-videotuerklingel-2024/"],
  ["/empfehlungen/sicherheit/ring-akku-videoturklingel-2024-/", "/empfehlungen/sicherheit/ring-akku-videotuerklingel-2024/"],
  ["/empfehlungen/sicherheit/tapo-tp-link-c100/", "/empfehlungen/sicherheit/tp-link-tapo-c100/"],

  ["/empfehlungen/wlan-mesh/", "/empfehlungen/netzwerk/"],
  ["/empfehlungen/viture-luma-pro-xr-brille/", "/empfehlungen/sonstiges/viture-luma-pro-xr-brille/"],
  ["/empfehlungen/google-tv-streamer/", "/empfehlungen/smart-home/google-tv-streamer/"],
  ["/empfehlungen/tp-link-kasa-kp115/", "/empfehlungen/smart-home/tp-link-kasa-kp115/"],
  ["/empfehlungen/govee-led-strip/", "/empfehlungen/beleuchtung/govee-led-strip/"],
  ["/empfehlungen/govee-g9-smart-led-lampe/", "/empfehlungen/beleuchtung/"],
  ["/empfehlungen/led-schranklicht/", "/empfehlungen/beleuchtung/led-schranklicht/"],
  ["/empfehlungen/anker-usb-c-ladegerat/", "/empfehlungen/strom/anker-usb-c-ladegeraet/"],
  ["/empfehlungen/strom/brennenstuhl-eco-line-steckdosenleiste/", "/empfehlungen/strom/brennenstuhl-eco-line-steckdosenleiste/"],
  ["/empfehlungen/brennenstuhl-eco-line-steckdosenleiste/", "/empfehlungen/strom/brennenstuhl-eco-line-steckdosenleiste/"],
  ["/empfehlungen/philips-sonicare-9900-prestige/", "/empfehlungen/sonstiges/philips-sonicare-9900-prestige/"],
  ["/empfehlungen/ooono-co-driver-no1/", "/empfehlungen/sonstiges/ooono-co-driver-no1/"],
  ["/empfehlungen/pac-em90/", "/empfehlungen/klima/pac-em90/"],
  ["/empfehlungen/mobile-klimaanlage-peirhw/", "/empfehlungen/klima/mobile-klimaanlage-peirhw/"],
  ["/empfehlungen/midea-4-in-1-mobile-klimaanlage/", "/empfehlungen/klima/midea-4-in-1-mobile-klimaanlage/"],
  ["/empfehlungen/medion-p502-klimaanlage/", "/empfehlungen/klima/medion-p502-klimaanlage/"],
  ["/empfehlungen/mova-e30-ultra/", "/empfehlungen/sonstiges/mova-e30-ultra/"],
  ["/empfehlungen/spotclean-c5/", "/empfehlungen/sonstiges/spotclean-c5/"],
  ["/empfehlungen/audio/apple-airpods-pro-3-kabellose-kopfhoerer/", "/empfehlungen/sonstiges/apple-airpods-pro-3-kabellose-kopfhoerer/"],
  ["/empfehlungen/eufycam-2c-set-2-plus-1/", "/empfehlungen/sicherheit/eufycam-2c-set-2-plus-1/"],
  ["/empfehlungen/sygonix-video-tuersprechanlage", "/empfehlungen/sicherheit/sygonix-video-tuersprechanlage/"],

  ["/kategorien/", "/empfehlungen/"],
  ["/kategorien/ueberwachung/", "/empfehlungen/sicherheit/"],
  ["/kategorien/überwachung/", "/empfehlungen/sicherheit/"],
  ["/kategorien/beleuchtung/", "/empfehlungen/beleuchtung/"],
  ["/kategorien/strom/", "/empfehlungen/strom/"],
  ["/kategorien/sonstiges/", "/empfehlungen/sonstiges/"],

  ["/links", "/links/alle/"],
  ["/empfehlungen", "/empfehlungen/"],
  ["/impressum", "/impressum/"],
  ["/kontakt", "/kontakt/"],
  ["/ueber-uns", "/ueber-uns/"],
  ["/transparenz", "/transparenz/"],
  ["/datenschutzerklaerung", "/datenschutzerklaerung/"],
]);

const GONE_PREFIXES = ["/video/", "/shorts/", "/marken/", "/tests/"];

const GONE_EXACT = new Set([
  "/empfehlungen/sonstiges/top-3-staubsauger-unter-200-euro/",
  "/empfehlungen/klima/akku-auto-heizluefter/",
  "/empfehlungen/uberwachungskameras-2025/",
  "/empfehlungen/sicherheit/sicherheitstechnik-fur-innen-und-aussen/",
  "/empfehlungen/switchbot-smart-lock-pro/",
  "/kupit-zhenskij-sportivnyj-kostyum-adidas-germaniya/",
]);

function normalizePathname(pathname: string) {
  let path = pathname.replace(/\/{2,}/g, "/");
  if (path !== "/" && path.endsWith("/")) {
    path = path.replace(/\/+$/, "/");
  }
  return path;
}

function goneResponse() {
  return new Response("Gone", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function redirect(url: URL, destination: string, status = 301) {
  return Response.redirect(`${url.origin}${destination}${url.search}`, status);
}

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = normalizePathname(url.pathname);

  if (url.hostname === "www.yevhenbondarenko.com") {
    return Response.redirect(`https://yevhenbondarenko.com${pathname}${url.search}`, 301);
  }

  const direct = REDIRECTS.get(pathname);
  if (direct && direct !== pathname) {
    return redirect(url, direct, 301);
  }

  if (
    GONE_EXACT.has(pathname) ||
    GONE_PREFIXES.some((prefix) => pathname === prefix.slice(0, -1) || pathname.startsWith(prefix))
  ) {
    return goneResponse();
  }

  if (pathname.includes("überwachung")) {
    return redirect(url, pathname.replaceAll("überwachung", "ueberwachung"), 301);
  }

  if (pathname.endsWith(".astro")) {
    return redirect(url, pathname.replace(/\.astro$/, "/"), 301);
  }

  if (pathname !== "/" && !pathname.endsWith("/") && !pathname.includes(".")) {
    return redirect(url, `${pathname}/`, 301);
  }

  return next();
});