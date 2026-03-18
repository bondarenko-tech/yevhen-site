import type { APIRoute } from "astro";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";

export const GET: APIRoute = () => {

  const today = new Date().toISOString().split("T")[0];

  const body = `# robots.txt — Bondarenko Empfehlungen
# Updated: ${today}

User-agent: *
Allow: /

###############################
# Technische Ordner
###############################

Disallow: /_astro/
Disallow: /og/
Disallow: /cdn-cgi/

###############################
# Sitemap
###############################

Sitemap: ${SITE}/sitemap.xml
Sitemap: ${SITE}/sitemap-images.xml
`;

  return new Response(body.trim() + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });

};