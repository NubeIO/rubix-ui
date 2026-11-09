// The schedule calendars' date and time words, in the design's copy: "Fri 6 Nov", "2 Nov – 8 Nov 2026",
// "Nov 2026", "09:00–24:00". Dates are wall dates (`YYYY-MM-DD`), so nothing here reads a clock or a
// zone.
//
// One responsibility: format the calendars' dates and times. Pure.

import { addDays } from "../lib/date";
import { hhmm } from "../lib/time";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const utc = (date: string) => new Date(`${date}T00:00:00Z`);

/** "Wed 11 Nov", with the year when it is not `thisYear`'s. */
export function dateText(date: string, thisYear: string): string {
  const d = utc(date);
  const year = date.slice(0, 4) !== thisYear.slice(0, 4) ? ` ${d.getUTCFullYear()}` : "";
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}${year}`;
}

/** The short date a calendar column heads with: "Mon 2 Nov" on the first day or a 1st, else "Tue 3". */
export function columnText(date: string, first: boolean): string {
  const d = utc(date);
  const month = first || d.getUTCDate() === 1 ? ` ${MONTHS[d.getUTCMonth()]}` : "";
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()}${month}`;
}

/** "2 Nov – 8 Nov 2026" for the week starting `monday`. */
export function weekText(monday: string): string {
  const a = utc(monday);
  const b = utc(addDays(monday, 6));
  return `${a.getUTCDate()} ${MONTHS[a.getUTCMonth()]} – ${b.getUTCDate()} ${MONTHS[b.getUTCMonth()]} ${b.getUTCFullYear()}`;
}

/** A block's stop time as people say it: the minute after its inclusive end; the end of the day is
 *  "24:00", so an all-day block reads "00:00–24:00". */
export function untilText(end: number): string {
  return end >= 1439 ? "24:00" : hhmm(end + 1);
}

/** "09:00–17:00". */
export function spanText(start: number, end: number): string {
  return `${hhmm(start)}–${untilText(end)}`;
}

/** Schedule names for a tooltip: the first `max`, then "and N more". */
export function namesText(schedules: { name: string }[], max = 10): string {
  const names = schedules.slice(0, max).map((s) => s.name).join(", ");
  return schedules.length > max ? `${names} and ${schedules.length - max} more` : names;
}
