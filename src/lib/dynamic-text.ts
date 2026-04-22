export function getDynamicUsageText(title: string, category: string) {
  const base = [
    `Im Alltag zeigt sich schnell, ob ${title} wirklich sinnvoll ist oder nur auf dem Papier überzeugt.`,
    `${title} wirkt zunächst wie eine solide Lösung – entscheidend ist aber die Nutzung im Alltag.`,
    `Technische Daten sind eine Sache – wie sich ${title} tatsächlich verhält, ist die andere.`,
  ];

  const categoryAddons: Record<string, string[]> = {
    sicherheit: [
      `Gerade im Bereich Sicherheit zählt vor allem Zuverlässigkeit und schnelle Reaktion.`,
      `Bei Sicherheitsgeräten ist entscheidend, dass sie im richtigen Moment funktionieren.`,
    ],
    netzwerk: [
      `Bei Netzwerkgeräten ist Stabilität oft wichtiger als reine Geschwindigkeit.`,
      `Ein gutes WLAN-Gerät merkt man daran, dass es einfach funktioniert – ohne ständige Probleme.`,
    ],
    "smart-home": [
      `Im Smart Home zählt vor allem, wie gut sich das Gerät in den Alltag integriert.`,
      `Automatisierung bringt nur dann etwas, wenn sie wirklich zuverlässig läuft.`,
    ],
    strom: [
      `Bei Strom- und Ladegeräten ist vor allem wichtig, dass sie im Alltag unkompliziert funktionieren.`,
      `Geräte in dieser Kategorie müssen vor allem praktisch und zuverlässig sein.`,
    ],
    klima: [
      `Bei Geräten für Klima und Luft merkt man den Unterschied meist erst im täglichen Einsatz.`,
      `Gerade in dieser Kategorie sind Alltagstauglichkeit und Bedienkomfort besonders wichtig.`,
    ],
    beleuchtung: [
      `Bei Beleuchtung zählt nicht nur die Technik, sondern wie angenehm sie sich im Alltag nutzen lässt.`,
      `Lichtlösungen wirken nur dann sinnvoll, wenn sie einfach passen und nicht unnötig kompliziert sind.`,
    ],
    sonstiges: [
      `Gerade bei Alltagsgeräten ist entscheidend, ob sie wirklich einen praktischen Nutzen bringen.`,
      `Nicht jede Funktion ist im Alltag relevant – wichtig ist, was davon tatsächlich nützt.`,
    ]
  };

  const baseIndex = Math.abs(title.length) % base.length;
  const addonList = categoryAddons[category] ?? [
    `Wichtig ist vor allem, ob das Gerät im Alltag wirklich einen klaren Nutzen bringt.`
  ];
  const addonIndex = Math.abs(title.length + category.length) % addonList.length;

  return `${base[baseIndex]} ${addonList[addonIndex]}`;
}

export function getDynamicDecisionText(title: string, price?: number) {
  const cheap = [
    `Gerade im unteren Preisbereich kann ${title} sinnvoll sein, wenn die Erwartungen realistisch bleiben.`,
    `${title} ist interessant, wenn du eine funktionierende Lösung suchst – ohne zu viel auszugeben.`,
  ];

  const mid = [
    `${title} bewegt sich im mittleren Bereich und bietet eine solide Balance aus Preis und Funktion.`,
    `Für viele Nutzer ist ${title} genau die Art von Gerät, die im Alltag einfach funktioniert.`,
  ];

  const premium = [
    `In dieser Preisklasse wird mehr erwartet – ${title} muss sich also im Alltag wirklich beweisen.`,
    `${title} richtet sich eher an Nutzer, die bewusst in eine bessere Lösung investieren wollen.`,
  ];

  let pool = mid;
  if (price && price < 70) pool = cheap;
  if (price && price > 150) pool = premium;

  const index = Math.abs(title.length + Math.floor(price ?? 0)) % pool.length;
  return pool[index];
}

export function getDynamicCategoryText(
  title: string,
  category: string,
  price?: number
) {
  const fallback = [
    `${title} gehört zu den Modellen, die vor allem dann interessant sind, wenn eine alltagstaugliche Lösung gesucht wird.`,
    `Bei ${title} kommt es weniger auf einzelne Werbeversprechen an, sondern darauf, ob das Gerät wirklich zur eigenen Nutzung passt.`,
  ];

  const categoryTexts: Record<string, string[]> = {
    sicherheit: [
      `${title} gehört im Bereich Sicherheit eher zu den Lösungen, die im Alltag vor allem durch Zuverlässigkeit und einfache Nutzung überzeugen müssen.`,
      `Gerade bei Sicherheitsgeräten wie ${title} ist nicht nur die Funktion wichtig, sondern auch, ob das Modell im entscheidenden Moment unkompliziert reagiert.`,
    ],
    netzwerk: [
      `${title} gehört in eine Kategorie, bei der Stabilität im Alltag oft wichtiger ist als einzelne Maximalwerte auf dem Datenblatt.`,
      `Bei Netzwerkgeräten wie ${title} zeigt sich der eigentliche Nutzen meist erst dann, wenn Verbindungen im Alltag wirklich stabil bleiben.`,
    ],
    "smart-home": [
      `${title} ist vor allem dann sinnvoll, wenn es sich ohne unnötige Hürden in bestehende Abläufe integrieren lässt.`,
      `Im Smart Home zählt bei ${title} weniger die reine Anzahl an Funktionen, sondern ob die Nutzung im Alltag wirklich einfacher wird.`,
    ],
    strom: [
      `${title} gehört zu den Geräten, bei denen vor allem praktische Nutzung, Sicherheit und unkomplizierte Handhabung zählen.`,
      `Geräte wie ${title} müssen im Alltag vor allem zuverlässig funktionieren und sollten keine unnötige Komplexität mitbringen.`,
    ],
    klima: [
      `${title} ist in einer Kategorie zuhause, in der Alltagstauglichkeit und Bedienkomfort oft entscheidender sind als reine Werbeversprechen.`,
      `Bei Geräten wie ${title} zeigt sich der eigentliche Wert meist erst dann, wenn sie im täglichen Einsatz spürbar entlasten.`,
    ],
    beleuchtung: [
      `${title} ist vor allem dann interessant, wenn Licht im Alltag nicht nur technisch, sondern auch praktisch und angenehm nutzbar sein soll.`,
      `Bei Beleuchtungslösungen wie ${title} zählt vor allem, ob das Modell im Alltag wirklich passend eingesetzt werden kann.`,
    ],
    sonstiges: [
      `${title} gehört zu den Produkten, bei denen vor allem der konkrete Alltagsnutzen entscheidet.`,
      `Gerade bei Alltagsgeräten wie ${title} ist wichtig, ob sie einen echten Mehrwert bringen und nicht nur zusätzliche Funktionen auflisten.`,
    ]
  };

  const priceTextsCheap = [
    `Im günstigeren Preisbereich ist vor allem wichtig, dass die wichtigsten Funktionen zuverlässig abgedeckt werden.`,
    `Gerade bei einem eher günstigeren Modell sollte der Fokus weniger auf Extras und mehr auf sinnvoller Alltagstauglichkeit liegen.`,
  ];

  const priceTextsMid = [
    `Im mittleren Preisbereich wird meist ein solides Verhältnis aus Funktion, Bedienung und Alltagstauglichkeit erwartet.`,
    `In dieser Preisklasse ist vor allem interessant, ob das Modell eine vernünftige Balance aus Nutzen und Aufwand bietet.`,
  ];

  const priceTextsPremium = [
    `Im höheren Preisbereich steigen die Erwartungen deutlich, deshalb muss sich der Mehrwert im Alltag auch wirklich zeigen.`,
    `Wenn ein Modell preislich höher liegt, wird nicht nur mehr Funktion erwartet, sondern auch mehr Klarheit im praktischen Nutzen.`,
  ];

  const pool = categoryTexts[category] ?? fallback;
  const baseIndex = Math.abs(title.length + category.length) % pool.length;
  const mainText = pool[baseIndex];

  let pricePool = priceTextsMid;
  if (price && price < 70) pricePool = priceTextsCheap;
  if (price && price > 150) pricePool = priceTextsPremium;

  const priceIndex = Math.abs(title.length + Math.floor(price ?? 0)) % pricePool.length;
  const priceText = pricePool[priceIndex];

  return {
    mainText,
    priceText
  };
}