// A node schedule's dated entries read from the Schedule Groups extension's form (see `datedWrite.ts`),
// one item per key stem, the way the extension lists them:
//   - `kind: "holiday"` → a holiday on its first window's day;
//   - a stem with an exception `kind: "closed"` → a closure over its whole days;
//   - a stem with an exception `kind: "changed"` (`<stem>-x`) → changed hours over its days, whose
//     hours are the first day's weekly hours less the `-x` windows plus the `-e` windows;
//   - a stem with only an `-e` event, `kind: "extra"`, within one day → extra hours.
// Anything else (a box's own entry without a `kind`, or a shape the extension never writes) is kept:
// listed as a closure or extra hours from its first window, resolved from all its windows as stored
// (`windows`, so a window over several days counts on each), and written back verbatim.
//
// One responsibility: lb's `events` / `exception` maps → dated items. Pure.

import { splitDays } from "./datedWindows";
import { weeklyOn } from "./datedWrite";
import { DAY_MINUTES, type DatedItem, type NodeSchedule } from "./nodeSchedule";
import { addDays } from "../date";
import type { DatedEntry } from "./scheduleRecord";

type MapName = "events" | "exception";
interface Part {
  map: MapName;
  key: string;
  e: DatedEntry;
}

const stemOf = (key: string) => key.replace(/-(x|e)$/, "");

/** The day an exact end falls in: an end at 00:00 is the day before (the extension's `last_day`). */
const lastDay = (end: string) => (end.endsWith("T00:00") ? addDays(end.slice(0, 10), -1) : end.slice(0, 10));

export function readDated(
  events: Record<string, DatedEntry>,
  exception: Record<string, DatedEntry>,
  week: NodeSchedule["week"],
): DatedItem[] {
  const out: DatedItem[] = [];
  const stems = new Map<string, Part[]>();
  const all: Part[] = [
    ...Object.entries(events).map(([key, e]) => ({ map: "events" as const, key, e })),
    ...Object.entries(exception).map(([key, e]) => ({ map: "exception" as const, key, e })),
  ];
  for (const p of all) {
    const k = p.e.kind;
    if (k === "holiday" && p.map === "exception") {
      const w = p.e.dates?.[0];
      if (!w) out.push(kept(p));
      else
        out.push({ id: p.key, kind: "holiday", label: p.e.label ?? "", date: w.start.slice(0, 10), ...yearly(p.e) });
    } else if (k === "closed" || k === "changed" || k === "extra") {
      const stem = stemOf(p.key);
      stems.set(stem, [...(stems.get(stem) ?? []), p]);
    } else out.push(kept(p));
  }
  for (const [stem, parts] of stems) out.push(...readStem(stem, parts, week));
  return out;
}

function readStem(stem: string, parts: Part[], week: NodeSchedule["week"]): DatedItem[] {
  const x = parts.find((p) => p.map === "exception" && p.key === `${stem}-x`);
  const e = parts.find((p) => p.map === "events" && p.key === `${stem}-e` && p.e.kind === "extra");
  const known = parts.every((p) => p === x || p === e);
  const windows = parts.flatMap((p) => p.e.dates ?? []);
  if (!known || windows.length === 0) return parts.map(kept);
  const label = (x ?? e)?.e.label ?? "";
  const date = windows.map((w) => w.start.slice(0, 10)).sort()[0];
  const last = windows.map((w) => lastDay(w.end)).sort().reverse()[0];
  const to = last > date ? { to: last } : {};

  if (x?.e.kind === "closed" && !e) return [{ id: stem, kind: "closed", label, date, ...to, ...yearly(x.e) }];
  if (x?.e.kind === "changed") {
    const open = weeklyOn({ week }, date);
    for (const p of [x, ...(e ? [e] : [])])
      for (const w of p.e.dates ?? [])
        for (const piece of splitDays(w).filter((d) => d.date === date))
          open.fill(p.map === "events", piece.from, piece.to);
    return [{ id: stem, kind: "changed", label, date, ...to, hours: runsOf(open) }];
  }
  if (!x && e) {
    const pieces = splitDays(e.e.dates[0]);
    if (e.e.dates.length === 1 && pieces.length === 1)
      return [{ id: stem, kind: "extra", label, date, start: pieces[0].from, end: pieces[0].to - 1 }];
  }
  return parts.map(kept);
}

/** Open minutes as inclusive-ended runs. */
function runsOf(open: boolean[]): { start: number; end: number }[] {
  const out: { start: number; end: number }[] = [];
  for (let m = 0; m < DAY_MINUTES; ) {
    if (!open[m]) {
      m++;
      continue;
    }
    const s = m;
    while (m < DAY_MINUTES && open[m]) m++;
    out.push({ start: s, end: m - 1 });
  }
  return out;
}

const yearly = (e: DatedEntry) => (e.yearly ? { yearly: true } : {});

/** An entry the editor does not write itself: listed from its first window, run from all of them,
 *  written back as it was. */
function kept({ map, key, e }: Part): DatedItem {
  const w = e.dates?.[0] ?? { start: "", end: "" };
  const first = splitDays(w)[0];
  const windows = (e.dates ?? []).map(({ start, end }) => ({ start, end }));
  const base = { id: `kept:${map}:${key}`, label: e.label ?? "", kept: { map, key }, windows, ...yearly(e) };
  const part = first && (first.from > 0 || first.to < DAY_MINUTES);
  const date = first?.date ?? w.start.slice(0, 10);
  const from = first?.from ?? 0;
  const end = (first?.to ?? DAY_MINUTES) - 1;
  if (map === "events") return { ...base, kind: "extra", date, start: from, end, name: e.name };
  const last = lastDay(w.end);
  const kind = e.kind === "holiday" ? "holiday" : "closed";
  return { ...base, kind, date, ...(part ? { start: from, end } : last > date ? { to: last } : {}) };
}
