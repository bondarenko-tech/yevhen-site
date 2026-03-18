/* ─────────────────────────────────────────────── */
/* FAQ Engine – Production Grade (DE Market)     */
/* ─────────────────────────────────────────────── */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

/* ─────────────────────────────────────────────── */
/* Sanitizer                                      */
/* ─────────────────────────────────────────────── */

function cleanText(input: string): string {
  return input
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

/* ─────────────────────────────────────────────── */
/* Validate FAQ                                   */
/* ─────────────────────────────────────────────── */

function isValidFAQ(item: FAQItem): boolean {
  return (
    typeof item.question === "string" &&
    typeof item.answer === "string" &&
    item.question.length > 5 &&
    item.answer.length > 10
  );
}

/* ─────────────────────────────────────────────── */
/* Normalize FAQ                                  */
/* ─────────────────────────────────────────────── */

export function normalizeFAQ(items?: FAQItem[]): FAQItem[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter(isValidFAQ)
    .map((item) => ({
      question: cleanText(item.question),
      answer: cleanText(item.answer),
    }));
}

/* ─────────────────────────────────────────────── */
/* Build JSON-LD                                  */
/* ─────────────────────────────────────────────── */

export function buildFAQSchema(items?: FAQItem[]): FAQSchema | null {
  const normalized = normalizeFAQ(items);

  if (normalized.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: normalized.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}