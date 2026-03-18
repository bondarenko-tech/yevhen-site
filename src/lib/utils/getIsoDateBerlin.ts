export function getIsoDateBerlin(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  const tz = "Europe/Berlin";
  const localeDate = new Date(date.toLocaleString("en-US", { timeZone: tz }));
  const offsetMinutes = -localeDate.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");
  const offset = `${sign}${hours}:${minutes}`;
  return `${localeDate.toISOString().split(".")[0]}${offset}`;
}
