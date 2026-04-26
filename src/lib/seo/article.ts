type ArticleSchemaParams = {
  title: string;
  description: string;
  canonical: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  organizationName?: string;
  logoUrl?: string;
};

const SITE = "https://yevhenbondarenko.com";

export function buildArticleSchema({
  title,
  description,
  canonical,
  datePublished,
  dateModified,
  authorName = "Yevhen Bondarenko",
  organizationName = "Bondarenko Empfehlungen",
  logoUrl = `${SITE}/og/site.webp`,
}: ArticleSchemaParams) {
  return {
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: title,
    description,
    url: canonical,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
    },
    inLanguage: "de-DE",
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${SITE}/ueber-uns/`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: organizationName,
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
  };
}