// The node schedule as the editor edits it: lb's schedule record (rubix-ce document shape) read into
// names with values, a week of blocks per day, and dated entries of four kinds. `readNodeSchedule`
// builds it from a record, `writeNodeSchedule` turns it back into a save payload.
//
// The default name "Off" is the editor's own (node schedule brief, decision 1): it is `names[0]`, its
// value is the record's box output default (`default_payload`), and it is never stored in
// `config.names`. Blocks of Off are not stored either: Off is what runs when nothing else does.
//
// Days are 0 = Monday ... 6 = Sunday. Minutes are minutes past local midnight in the schedule's zone;
// every `end` here is INCLUSIVE, as lb stores weekly ends (an end of 1079 runs to 17:59:59, said
// "until 18:00").
//
// One responsibility: the types, and the minute-array round trip every edit goes through.

import type { DatedKind, ScheduleRecord } from "./scheduleRecord";

/** The editor's default name. UI only: lb never stores it. */
export const OFF = "Off";
/** Up to six names, Off included. */
export const MAX_NAMES = 6;
export const DAY_MINUTES = 1440;

/** A name and the value it sends. */
export interface NameValue {
  name: string;
  value: number;
}

/** One block of one day: `name` runs from `start` to `end`, both minutes, `end` inclusive. */
export interface Seg {
  start: number;
  end: number;
  name: string;
}

export type { DatedKind } from "./scheduleRecord";

/** A date that differs from the week, stored the way the Schedule Groups extension stores it (both
 *  pages edit the same records; `writeNodeSchedule` has the form):
 *  - extra: the default name runs `start`..`end` on `date`, on top of the week;
 *  - changed: only `hours` run (the default name) on each day `date`..`to`; the week's hours for those
 *    days are replaced. Never yearly;
 *  - closed: Off all day from `date` to `to` (inclusive), optionally every year;
 *  - holiday: Off all day on `date`, optionally every year.
 *  An entry the editor does not write itself (a box's own, without a `kind`) is `kept`: shown, and
 *  written back exactly as it was read. */
export interface DatedItem {
  /** The key stem (`c1731...`; `h-2026-12-25` for a holiday), stable while the record is unchanged so
   *  a reload can tell entries apart. A kept entry's is `kept:<map>:<key>`. */
  id: string;
  kind: DatedKind;
  label: string;
  /** `YYYY-MM-DD`, local. */
  date: string;
  /** The last day of a range, inclusive. */
  to?: string;
  /** Extra hours (and a kept part-day entry): its minutes on `date`, `end` inclusive. */
  start?: number;
  end?: number;
  /** Changed hours: the hours left open each day, `end` inclusive. */
  hours?: { start: number; end: number }[];
  /** A kept entry's own name; the editor's own entries run the default name. */
  name?: string;
  /** Every year. Only closed and holiday (lb and the extension refuse it elsewhere). */
  yearly?: boolean;
  /** Read from a box's own entry: written back verbatim. */
  kept?: { map: "events" | "exception"; key: string };
}

/** The name the editor's dated entries run: lb's default name, the first after Off. */
export function defaultName(doc: Pick<NodeSchedule, "names">): string {
  return doc.names[1]?.name ?? "Default";
}

/** What boxes running the schedule write. The default value is `names[0].value`. */
export interface BoxOutput {
  used: boolean;
  min: number;
  max: number;
}

export interface NodeSchedule {
  id: string;
  name: string;
  description: string;
  /** A chart token name ("chart-8"): marks the schedule only, never its names. */
  color: string;
  timezone: string;
  /** Off: dashboards and flows read Off; boxes keep their hours. */
  enabled: boolean;
  /** `[0]` is Off (the default); the rest are `config.names` in order. */
  names: NameValue[];
  /** Seven days, Monday first, each sorted and non-overlapping. Off blocks are not listed. */
  week: Seg[][];
  dated: DatedItem[];
  output: BoxOutput;
  /** The revision the record was read at; a save sends it back. */
  rev: number;
  /** The record this was read from. Fields the editor does not edit ride through on save. */
  source: ScheduleRecord;
}

/** lb's day names, Monday first. */
export const WIRE_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/** A day's blocks as a minute array (`null` = Off). */
export function toMinutes(segs: Seg[]): (string | null)[] {
  const out = new Array<string | null>(DAY_MINUTES).fill(null);
  for (const s of segs)
    for (let m = Math.max(0, s.start); m <= Math.min(s.end, DAY_MINUTES - 1); m++) out[m] = s.name;
  return out;
}

/** A minute array back to sorted blocks, Off left out. */
export function fromMinutes(minutes: (string | null)[]): Seg[] {
  const out: Seg[] = [];
  let m = 0;
  while (m < DAY_MINUTES) {
    const name = minutes[m];
    let j = m;
    while (j < DAY_MINUTES && minutes[j] === name) j++;
    if (name !== null) out.push({ start: m, end: j - 1, name });
    m = j;
  }
  return out;
}

/** The value a name sends; Off's is the box output default. Unknown names read as Off. */
export function valueOf(doc: Pick<NodeSchedule, "names">, name: string | null): number {
  return doc.names.find((n) => n.name === name)?.value ?? doc.names[0]?.value ?? 0;
}

/** A name's position: 0 for Off, 1..5 for the others, the index `nameColour` takes. */
export function nameIndex(doc: Pick<NodeSchedule, "names">, name: string | null): number {
  const i = name === null ? 0 : doc.names.findIndex((n) => n.name === name);
  return i < 0 ? 0 : i;
}

/** `HH:MM` for a minute of the day; 1440 is "24:00". */
export { hhmm } from "../time";

/** `HH:MM` to minutes, or null. */
export function parseHHMM(text: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(text.trim());
  if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

/** The zone the record's times are in: `use_utc` wins, an empty zone is UTC (lb's rule). */
export function zoneOf(doc: NodeSchedule): string {
  return doc.source.use_utc ? "UTC" : doc.timezone || "UTC";
}
