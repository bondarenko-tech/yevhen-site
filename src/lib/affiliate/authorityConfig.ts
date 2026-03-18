import type { ProduktTyp } from "../domain/product";
type AuthorityConfig = {
  intro: string;
  bullets: string[];
};

export const authorityConfig: Record<ProduktTyp, AuthorityConfig> = {
  innenkamera: {
    intro:
      "Wir stellen Innenkameras vor und zeigen, welche Funktionen im Alltag relevant sein können.",
    bullets: [
      "Bildqualität & Nachtsicht",
      "Speicheroptionen (z. B. microSD oder Cloud)",
      "App-Funktionen & Benachrichtigungen",
      "Allgemeines Preisniveau",
    ],
  },

  aussenkamera: {
    intro:
      "Wir geben einen Überblick über Außenkameras und erklären, worauf man bei Nutzung und Installation achten kann.",
    bullets: [
      "Wetterfestigkeit (IP-Schutz)",
      "Verbindung & Reichweite",
      "Bewegungserkennung",
      "Montageaufwand",
    ],
  },

  tuerklingel: {
    intro:
      "Wir zeigen verschiedene Video-Türklingeln und erklären typische Unterschiede im Alltag.",
    bullets: [
      "Akku oder Festverdrahtung",
      "Gegensprechfunktion",
      "Speicheroptionen",
      "Allgemeines Preisniveau",
    ],
  },

  alarmanlage: {
    intro:
      "Wir stellen Alarmsysteme vor und zeigen grundlegende Unterschiede zwischen verschiedenen Lösungen.",
    bullets: [
      "Sensoren & Abdeckung",
      "Steuerung per App",
      "Erweiterungsmöglichkeiten",
      "Allgemeines Preisniveau",
    ],
  },

  smartlock: {
    intro:
      "Wir geben einen Überblick über Smart Locks und erklären typische Funktionen im Alltag.",
    bullets: [
      "Zugriffsarten",
      "Kompatibilität",
      "App-Funktionen",
      "Allgemeines Preisniveau",
    ],
  },

  sensor: {
    intro:
      "Wir zeigen verschiedene Sensoren und erklären, wie sie im Smart Home eingesetzt werden können.",
    bullets: [
      "Signalstabilität",
      "Reaktionsverhalten",
      "Integration",
      "Allgemeines Preisniveau",
    ],
  },

  sonstiges: {
    intro:
      "Wir stellen Produkte vor und geben einen allgemeinen Überblick über Funktionen und Einsatzmöglichkeiten.",
    bullets: [
      "Funktionen",
      "Bedienung",
      "Verarbeitung",
      "Allgemeines Preisniveau",
    ],
  },
};