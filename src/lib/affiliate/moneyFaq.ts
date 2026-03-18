import type { ProduktTyp } from "../domain/product";

type FAQItem = {
  question: string;
  answer: string;
};

export function buildMoneyFaq(typ: ProduktTyp): FAQItem[] {
  switch (typ) {
    case "tuerklingel":
      return [
        {
          question: "Welche Video-Türklingel funktioniert ohne Abo?",
          answer:
            "Viele Modelle bieten lokale Speicherung per microSD oder optionale Cloud-Nutzung. Dadurch entstehen keine monatlichen Pflichtkosten.",
        },
        {
          question: "Brauche ich WLAN für eine Video-Türklingel?",
          answer:
            "Ja, für App-Benachrichtigungen und Live-Ansicht ist eine stabile WLAN-Verbindung erforderlich.",
        },
        {
          question: "Gibt es Modelle mit Akku und ohne Kabel?",
          answer:
            "Ja, es gibt akkubetriebene Modelle sowie festverdrahtete Varianten – je nach Installationssituation.",
        },
      ];

    case "innenkamera":
      return [
        {
          question: "Welche Innenkamera speichert lokal?",
          answer:
            "Viele Modelle unterstützen microSD-Karten zur lokalen Speicherung ohne Cloud-Zwang.",
        },
        {
          question: "Sind Innenkameras ohne Abo möglich?",
          answer:
            "Ja, es gibt Modelle ohne verpflichtende Cloud-Abos. Funktionen bleiben auch ohne laufende Kosten nutzbar.",
        },
      ];

    default:
      return [];
  }
}
