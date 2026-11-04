// Calendar-day arithmetic on "YYYY-MM-DD" strings, done in UTC so a day never shifts across a time
// zone or a daylight-saving change. Used by `DatePicker`.
//
// One responsibility: day maths and the default day label.

const DAY_MS = 864e5;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Today in the browser's own zone, as "YYYY-MM-DD". */
export function localToday(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export function addDays(iso: string, n: number): string {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

/** `n` months on, keeping the day where the month has it (31 Jan + 1 → 28/29 Feb). */
export function addMonths(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + n);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return d.toISOString().slice(0, 10);
}

/** 0 = Sunday … 6 = Saturday. */
export function weekdayOf(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

/** The six weeks that show the month of `iso`, starting on `weekStart` (1 = Monday, 0 = Sunday). */
export function monthGrid(iso: string, weekStart = 1): string[] {
  const first = `${iso.slice(0, 7)}-01`;
  const lead = (weekdayOf(first) - weekStart + 7) % 7;
  return Array.from({ length: 42 }, (_, i) => addDays(first, i - lead));
}

/** "October 2026", in the browser's language. */
export function monthLabel(iso: string): string {
  return new Date(`${iso.slice(0, 7)}-01T00:00:00Z`).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "31 Oct 2026": the default way a picked day is shown. */
export function formatDay(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : iso;
}
