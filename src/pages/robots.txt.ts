import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *

Allow: /

Sitemap: https://yevhenbondarenko.com/sitemap.xml
Sitemap: https://yevhenbondarenko.com/image-sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};