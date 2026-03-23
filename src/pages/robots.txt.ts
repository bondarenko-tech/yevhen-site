// src/pages/robots.txt.ts

import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(`User-agent: *

Allow: /

Disallow: /links/
Disallow: /shorts/
Disallow: /marken/

Sitemap: https://yevhenbondarenko.com/sitemap.xml
`, {
    headers: { "Content-Type": "text/plain" }
  });
};