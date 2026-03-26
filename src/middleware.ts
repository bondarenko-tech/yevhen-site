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

  "/empfehlungen/google-nest-cam/": "/empfehlungen/sicherheit/google-nest-cam/",
  "/empfehlungen/reolink-argus-3-pro/": "/empfehlungen/sicherheit/reolink-argus-3-pro/",
  "/empfehlungen/tapo-c210/": "/empfehlungen/sicherheit/tp-link-tapo-c210/",
  "/empfehlungen/tapo-tp-link-c100/": "/empfehlungen/sicherheit/tp-link-tapo-c100/",
  "/empfehlungen/aqara-g5-pro-wlan-kamera/": "/empfehlungen/sicherheit/aqara-g5-pro-wlan-kamera/",
  "/empfehlungen/lupus-le-204/": "/empfehlungen/sicherheit/lupus-le204/",
  "/empfehlungen/lupus-le204/": "/empfehlungen/sicherheit/lupus-le204/",
  "/empfehlungen/ueberwachung/imou-dual-2k-innenkamera/": "/empfehlungen/sicherheit/imou-dual-2k-innenkamera/",
  "/empfehlungen/ueberwachung/lupus-le202-wlan-ip-kamera/": "/empfehlungen/sicherheit/lupus-le202-wlan-ip-kamera/",
  "/empfehlungen/ueberwachung/": "/empfehlungen/sicherheit/",

  "/kategorien/": "/empfehlungen/",
  "/kategorien/ueberwachung/": "/empfehlungen/sicherheit/",
  "/kategorien/beleuchtung/": "/empfehlungen/smart-home/",
  "/kategorien/strom/": "/empfehlungen/smart-home/",
  "/kategorien/sonstiges/": "/empfehlungen/",
};

function normalizePath(pathname: string) {
  if (pathname !== "/" && pathname.endsWith("//")) {
    return pathname.replace(/\/+$/, "/");
  }
  return pathname;
}

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = normalizePath(url.pathname);

  if (REDIRECTS[pathname]) {
    return context.redirect(REDIRECTS[pathname], 301);
  }

  if (pathname.startsWith("/video/")) {
    return context.redirect("/", 301);
  }

  if (pathname.startsWith("/shorts/")) {
    return context.redirect("/", 301);
  }

  if (pathname.startsWith("/marken/")) {
    return context.redirect("/", 301);
  }

  if (pathname === "/links") {
    return context.redirect("/links/alle/", 301);
  }

  if (pathname === "/empfehlungen" ) {
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