// A node schedule's dated entries written in the Schedule Groups extension's own form, key for key, so
// both pages edit the same records the same way (rust-schedule-management `edit/dated.rs`):
//
//   - closed: one `exception` `<stem>-x`, `kind: "closed"`, over whole days, `yearly` when asked;
//   - changed hours: worked out against each day's weekly hours when saved: an `exception`
//     `<stem>-x`, `kind: "changed"`, over the weekly hours now closed (closed runs joined across
//     minutes that run nothing), and an `events` entry `<stem>-e`, `kind: "extra"`, for hours the
//     week does not run. Either may be absent. Never yearly;
//   - extra hours: one `events` entry `<stem>-e`, `kind: "extra"`;
//   - holiday: one `exception` `h-YYYY-MM-DD`, `kind: "holiday"`, for its day.
// Every entry carries the default name and the person's text as `label`; exceptions are worth 0,
// events the "on" value (the default name's weekly value, else 1); colours are the extension's.
// An entry kept from a box (no `kind`) is written back exactly as read.
//
// One responsibility: dated items → lb's `events` and `exception` maps. Pure.

import { addDays } from "../date";
import {
  DAY_MINUTES,
  defaultName,
  valueOf,
  type DatedItem,
  type DatedKind,
  type NodeSchedule,
} from "./nodeSchedule";
import type { DatedEntry } from "./scheduleRecord";
import { weekdayOf } from "./resolveDay";

const CLOSED_COLOR = "#6b7280";
const OPEN_COLOR = "#2563eb";

type Run = [number, number];

/** `YYYY-MM-DDTHH:MM` for minute `m` of `day`; 1440 is the next day's 00:00 (the extension's `stamp`). */
export function stamp(day: string, m: number): string {
  if (m >= DAY_MINUTES) return `${addDays(day, 1)}T00:00`;
  return `${day}T${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** The `[start, end)` runs where `pick` holds. */
function runs(pick: (m: number) => boolean): Run[] {
  const out: Run[] = [];
  for (let m = 0; m < DAY_MINUTES; ) {
    if (!pick(m)) {
      m++;
      continue;
    }
    const s = m;
    while (m < DAY_MINUTES && pick(m)) m++;
    out.push([s, m]);
  }
  return out;
}

/** The extension's `diff`: closed runs (weekly, not wanted; joined where nothing wanted lies between)
 *  and extra runs (wanted, not weekly). */
export function diff(weekly: boolean[], wanted: boolean[]): { closed: Run[]; extra: Run[] } {
  const closed: Run[] = [];
  for (const [s, e] of runs((m) => weekly[m] && !wanted[m])) {
    const last = closed[closed.length - 1];
    if (last && !wanted.slice(last[1], s).includes(true)) last[1] = e;
    else closed.push([s, e]);
  }
  return { closed, extra: runs((m) => wanted[m] && !weekly[m]) };
}

/** The minutes the weekly hours run on `day` (any name). */
export function weeklyOn(doc: Pick<NodeSchedule, "week">, day: string): boolean[] {
  const on = new Array<boolean>(DAY_MINUTES).fill(false);
  for (const s of doc.week[weekdayOf(day)] ?? []) on.fill(true, s.start, s.end + 1);
  return on;
}

/** The value hours added by a dated entry carry: the default name's weekly value, else 1. */
export function onValue(doc: Pick<NodeSchedule, "names" | "week">): number {
  const name = defaultName(doc);
  return doc.week.some((d) => d.some((s) => s.name === name)) ? valueOf(doc, name) : 1;
}

type Window = [string, string];

function entry(name: string, label: string, kind: DatedKind, dates: Window[], value: number, yearly?: boolean) {
  const e: DatedEntry = {
    name,
    label,
    kind,
    value,
    color: kind === "extra" ? OPEN_COLOR : CLOSED_COLOR,
    dates: dates.map(([start, end]) => ({ start, end })),
  };
  if (yearly) e.yearly = true;
  return e;
}

/** Every day of an item, `date` to `to`. */
function daysOf(item: DatedItem): string[] {
  const out = [item.date];
  while (item.to && out[out.length - 1] < item.to) out.push(addDays(out[out.length - 1], 1));
  return out;
}

export function writeDated(doc: NodeSchedule): {
  events: Record<string, DatedEntry>;
  exception: Record<string, DatedEntry>;
} {
  const name = defaultName(doc);
  const on = onValue(doc);
  const events: Record<string, DatedEntry> = {};
  const exception: Record<string, DatedEntry> = {};
  const source = doc.source.schedule?.schedules ?? {};
  for (const item of doc.dated) {
    if (item.kept) {
      const raw = source[item.kept.map]?.[item.kept.key];
      if (raw) (item.kept.map === "events" ? events : exception)[item.kept.key] = raw;
      continue;
    }
    if (item.kind === "holiday") {
      const dates: Window[] = [[stamp(item.date, 0), stamp(item.date, DAY_MINUTES)]];
      exception[`h-${item.date}`] = entry(name, item.label, "holiday", dates, 0, item.yearly);
    } else if (item.kind === "closed") {
      const dates: Window[] = [[stamp(item.date, 0), stamp(item.to ?? item.date, DAY_MINUTES)]];
      exception[`${item.id}-x`] = entry(name, item.label, "closed", dates, 0, item.yearly);
    } else if (item.kind === "extra" && item.start !== undefined && item.end !== undefined) {
      const dates: Window[] = [[stamp(item.date, item.start), stamp(item.date, item.end + 1)]];
      events[`${item.id}-e`] = entry(name, item.label, "extra", dates, on);
    } else if (item.kind === "changed") {
      const wanted = new Array<boolean>(DAY_MINUTES).fill(false);
      for (const h of item.hours ?? []) wanted.fill(true, h.start, h.end + 1);
      const closed: Window[] = [];
      const extra: Window[] = [];
      for (const day of daysOf(item)) {
        const d = diff(weeklyOn(doc, day), wanted);
        closed.push(...d.closed.map(([s, e]): Window => [stamp(day, s), stamp(day, e)]));
        extra.push(...d.extra.map(([s, e]): Window => [stamp(day, s), stamp(day, e)]));
      }
      if (closed.length) exception[`${item.id}-x`] = entry(name, item.label, "changed", closed, 0);
      if (extra.length) events[`${item.id}-e`] = entry(name, item.label, "extra", extra, on);
    }
  }
  return { events, exception };
}
