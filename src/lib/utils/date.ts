// src/utils/date.ts

/**
 * Преобразует строку даты (YYYY-MM-DD) в ISO8601 с локальным часовым поясом.
 * Если дата невалидна — вернётся undefined.
 */
export function getIsoDate(d: string | undefined): string | undefined {
  if (!d) return undefined;
  try {
    const [year, month, day] = d.split("-").map(Number);
    const dt = new Date(year, month - 1, day, 12, 0, 0); // локальное время 12:00

    if (isNaN(dt.getTime())) return undefined;

    const tzOffset = -dt.getTimezoneOffset();
    const sign = tzOffset >= 0 ? "+" : "-";
    const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, "0");

    const yyyy = dt.getFullYear();
    const mm = pad(dt.getMonth() + 1);
    const dd = pad(dt.getDate());
    const hh = pad(dt.getHours());
    const mi = pad(dt.getMinutes());
    const ss = pad(dt.getSeconds());

    const tzH = pad(tzOffset / 60);
    const tzM = pad(tzOffset % 60);

    return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${tzH}:${tzM}`;
  } catch {
    return undefined;
  }
}

/**
 * Форматирует дату для отображения в интерфейсе.
 * Например: "21. September 2025".
 */
export function formatDate(d: string | undefined): string {
  if (!d) return "";
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return "";
    return dt.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
