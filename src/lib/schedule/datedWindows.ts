// Dated entries as lb's wall-time windows (`YYYY-MM-DDTHH:mm`, end exact) and back, and where a
// window falls: which minutes of a date it covers, every year for a yearly one.
//
// Yearly windows follow lb (`lb-schedules` windows.rs) to the letter: a copy starts in each year from
// the entry's own year on; a start on 29 February is skipped in a year without one; an end on a
// missing 29 February moves to 1 March 00:00. A window that starts in one year and ends in the next
// (a shutdown over New Year) is found from either side.
//
// One responsibility: wall-time window arithmetic for dated entries. Pure.

import { DAY_MINUTES, hhmm, type DatedItem } from "./nodeSchedule";
import { addDays } from "../date";

export interface WallWindow {
  start: string;
  end: string;
}

/** One day's part of a window: minutes `from` to `to`, `to` exclusive (1440 = the whole rest). */
export interface DayPiece {
  date: string;
  from: number;
  to: number;
}

/** The weekday of `YYYY-MM-DD`, 0 = Monday. */
export function weekdayOf(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7;
}

const WALL = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

const minuteOf = (wall: string) => Number(wall.slice(11, 13)) * 60 + Number(wall.slice(14, 16));
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** `wall` moved to `year`, or null when that date does not exist (29 February). */
function withYear(wall: string, year: number): string | null {
  if (wall.slice(5, 10) === "02-29" && !isLeap(year)) return null;
  return `${String(year).padStart(4, "0")}${wall.slice(4)}`;
}

/** The window an entry stands for: whole days for a closure, its minutes otherwise. */
export function itemWindow(item: DatedItem): WallWindow {
  if (item.start === undefined || item.end === undefined)
    return { start: `${item.date}T00:00`, end: `${addDays(item.to ?? item.date, 1)}T00:00` };
  return {
    start: `${item.date}T${hhmm(item.start)}`,
    end: item.end >= DAY_MINUTES - 1 ? `${addDays(item.date, 1)}T00:00` : `${item.date}T${hhmm(item.end + 1)}`,
  };
}

/** The concrete windows of an entry. One-offs give their own; a yearly one gives a copy starting in
 *  each of `years`, by lb's rules above. */
export function occurrences(item: DatedItem, years: number[]): WallWindow[] {
  return windowCopies([itemWindow(item)], item.yearly, years);
}

/** lb's `occurrences` over stored windows: unreadable ones are skipped, a yearly entry gives a copy
 *  of each window starting in each of `years`. */
export function windowCopies(
  windows: WallWindow[],
  yearly: boolean | undefined,
  years: number[],
): WallWindow[] {
  const out: WallWindow[] = [];
  for (const own of windows) {
    if (!WALL.test(own.start) || !WALL.test(own.end)) continue;
    if (!yearly) {
      out.push(own);
      continue;
    }
    const first = Number(own.start.slice(0, 4));
    for (const year of years) {
      const by = year - first;
      if (by < 0) continue;
      const start = withYear(own.start, year);
      if (!start) continue;
      const endYear = Number(own.end.slice(0, 4)) + by;
      const end = withYear(own.end, endYear) ?? `${String(endYear).padStart(4, "0")}-03-01T00:00`;
      out.push({ start, end });
    }
  }
  return out;
}

/** The minutes of `date` a window covers, `to` exclusive, or null when it misses the day. */
export function pieceOn(w: WallWindow, date: string): DayPiece | null {
  const dayStart = `${date}T00:00`;
  const dayEnd = `${addDays(date, 1)}T00:00`;
  if (w.end <= dayStart || w.start >= dayEnd) return null;
  return {
    date,
    from: w.start <= dayStart ? 0 : minuteOf(w.start),
    to: w.end >= dayEnd ? DAY_MINUTES : minuteOf(w.end),
  };
}

/** A window cut into one piece per local day it touches. Unreadable or empty windows give none. */
export function splitDays(w: WallWindow): DayPiece[] {
  if (!WALL.test(w.start) || !WALL.test(w.end) || w.end <= w.start) return [];
  const out: DayPiece[] = [];
  for (let date = w.start.slice(0, 10); `${date}T00:00` < w.end; date = addDays(date, 1)) {
    const p = pieceOn(w, date);
    if (p && p.to > p.from) out.push(p);
  }
  return out;
}

/** When an entry next happens, from `today` (`YYYY-MM-DD`): the first copy that has not ended yet. A
 *  past one-off answers its own window. */
export function nextWindow(item: DatedItem, today: string): WallWindow {
  const y = Number(today.slice(0, 4));
  const live = occurrences(item, [y - 1, y, y + 1, y + 2]).find((w) => w.end > `${today}T00:00`);
  return live ?? itemWindow(item);
}

/** Has a one-off entry ended before `today`? Yearly entries never have. */
export function isPast(item: DatedItem, today: string): boolean {
  return !item.yearly && itemWindow(item).end <= `${today}T00:00`;
}
