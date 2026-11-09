// The node schedule editor's date and time words, in the design's copy: "Fri 6 Nov", "Thu 24 Dec – Fri 1
// Jan 2027", "until 18:00 today", "Now · Fri 6 Nov, 14:20", "Occupied = 1". Dates are local wall dates
// in the schedule's zone (`YYYY-MM-DD`), so nothing here touches a clock or a zone.
//
// One responsibility: format the editor's dates, times and name values. Pure.

import { addDays } from "../lib/date";
import { hhmm, valueOf, type NameValue, type NodeSchedule } from "../lib/schedule/nodeSchedule";
import type { Moment } from "../lib/schedule/nowAndNext";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DAY_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const utc = (date: string) => new Date(`${date}T00:00:00Z`);

/** "Wed 11 Nov", with the year when it is not `thisYear`'s. */
export function dateText(date: string, thisYear: string, weekday = true): string {
  const d = utc(date);
  const year = date.slice(0, 4) !== thisYear.slice(0, 4) ? ` ${d.getUTCFullYear()}` : "";
  return `${weekday ? `${WEEKDAYS[d.getUTCDay()]} ` : ""}${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}${year}`;
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

/** "18:00 today", "07:00 tomorrow", "08:00 Mon 9 Nov". Midnight that ends a day is "00:00 tomorrow". */
export function momentText(m: Moment, today: string): string {
  const day = m.date === today ? "today" : m.date === addDays(today, 1) ? "tomorrow" : dateText(m.date, today);
  return `${hhmm(m.minute)} ${day}`;
}

/** "Now · Fri 6 Nov, 14:20". */
export function nowLabel(at: Moment): string {
  return `Now · ${dateText(at.date, at.date)}, ${hhmm(at.minute)}`;
}

/** "Occupied = 1". */
export function nameValue(n: NameValue): string {
  return `${n.name} = ${n.value}`;
}

/** "Occupied = 1" for a name of `doc`; null is the default ("Off = 0"). */
export function nameText(doc: Pick<NodeSchedule, "names">, name: string | null): string {
  return `${name ?? doc.names[0]?.name} = ${valueOf(doc, name)}`;
}

/** A block's stop time as people say it: the minute after its inclusive end. A block that runs to the
 *  end of the day stops at "24:00" (until midnight), so an all-day block reads "00:00–24:00". */
export function untilText(end: number): string {
  return end >= 1439 ? "24:00" : hhmm(end + 1);
}

/** The same stop time for a time field, which cannot hold 24:00: the end of the day is "00:00" there. */
export function untilInput(end: number): string {
  return end >= 1439 ? "00:00" : hhmm(end + 1);
}

/** The Monday of the week holding `date`. */
export function mondayOf(date: string): string {
  const back = (utc(date).getUTCDay() + 6) % 7;
  return addDays(date, -back);
}
