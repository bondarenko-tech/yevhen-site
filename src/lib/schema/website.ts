export function buildWebsiteSchema() {
  const SITE = "https://yevhenbondarenko.com";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        "name": "Bondarenko Empfehlungen",
        "url": SITE,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE}/logo-yevhen-bondarenko.webp`
        }
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        "name": "Yevhen Bondarenko",
        "url": SITE,
        "description": "Technik-Experte für Smart Home und Netzwerk-Lösungen.",
        "sameAs": [
          "https://youtube.com/@bondarenko-tech"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        "url": SITE,
        "name": "Bondarenko Empfehlungen",
        "alternateName": "Yevhen Bondarenko Technik-Tipps",
        "inLanguage": "de-DE",
        "publisher": {
          "@id": `${SITE}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
}