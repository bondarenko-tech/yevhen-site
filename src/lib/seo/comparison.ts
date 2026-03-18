type ComparisonSchemaParams = {
  title: string;
  description: string;
  canonical: string;
};

export function buildComparisonSchema({
  title,
  description,
  canonical,
}: ComparisonSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical,
    name: title,
    description,
    url: canonical,
    inLanguage: "de",
    isPartOf: {
      "@type": "WebSite",
      name: "Bondarenko Empfehlungen",
      url: "https://yevhenbondarenko.com",
    },
    about: {
      "@type": "Thing",
      name: "Produktvergleich",
    },
  };
}
