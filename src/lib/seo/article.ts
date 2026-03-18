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

export function buildArticleSchema({
  title,
  description,
  canonical,
  datePublished,
  dateModified,
  authorName = "Yevhen Bondarenko",
  organizationName = "Bondarenko Empfehlungen",
  logoUrl = "https://yevhenbondarenko.com/og-cover.jpg",
}: ArticleSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: canonical,
    inLanguage: "de",
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: organizationName,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
  };
}
