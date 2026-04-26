type ComparisonItem = {
  name: string;
  url: string;
};

type ComparisonSchemaParams = {
  title: string;
  description: string;
  canonical: string;
  items?: ComparisonItem[];
};

export function buildComparisonSchema({
  title,
  description,
  canonical,
  items = [],
}: ComparisonSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "de",
      },

      {
        "@type": "ItemList",
        "@id": `${canonical}#list`,
        name: title,
        description,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: item.url,
          name: item.name,
        })),
      },
    ],
  };
}