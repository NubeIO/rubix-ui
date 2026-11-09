// lb's schedule record read into the editor's `NodeSchedule` (node schedule brief, decision 1).
//
//   - names: Off (value = `default_payload`, else 0), then `config.names` in order. A name's value is
//     read from its blocks (weekly entries, then events; the first one found). A name with no blocks
//     has no stored value, so it reads as its position (Occupied 1, Standby 2, ...).
//   - week: each weekday as the box runs it. Where weekly entries overlap, the one that starts first
//     wins, ties by key in natural order (lb's evaluator). Disabled entries are not drawn; they stay in
//     `source` and ride through a save unchanged.
//   - dated: in the Schedule Groups extension's form, one item per key stem (`datedRead.ts`).
//
// One responsibility: record in, editor model out. Pure.

import { readDated } from "./datedRead";
import {
  DAY_MINUTES,
  fromMinutes,
  OFF,
  parseHHMM,
  WIRE_DAYS,
  type NameValue,
  type NodeSchedule,
  type Seg,
} from "./nodeSchedule";
import type { ScheduleRecord, WeeklyEntry } from "./scheduleRecord";

const natural = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

export function readNodeSchedule(record: ScheduleRecord): NodeSchedule {
  const doc = record.schedule ?? { schedules: {} };
  const real = doc.config?.names?.length ? doc.config.names : ["Default"];
  const weekly = Object.entries(doc.schedules?.weekly ?? {}).sort(([a], [b]) => natural(a, b));
  const events = Object.entries(doc.schedules?.events ?? {}).sort(([a], [b]) => natural(a, b));
  const exception = Object.entries(doc.schedules?.exception ?? {}).sort(([a], [b]) => natural(a, b));

  const seen = new Map<string, number>();
  for (const [, e] of [...weekly, ...events.filter(([, x]) => !x.kind)])
    if (e.name && !seen.has(e.name)) seen.set(e.name, e.value ?? 0);
  const names: NameValue[] = [
    { name: OFF, value: record.default_payload ?? 0 },
    ...real.map((name, i) => ({ name, value: seen.get(name) ?? i + 1 })),
  ];

  const week = WIRE_DAYS.map((day) => readDay(weekly, day));
  return {
    id: record.id,
    name: record.name,
    description: record.description ?? "",
    color: record.color ?? "",
    timezone: record.timezone,
    enabled: record.enabled,
    names,
    week,
    dated: readDated(Object.fromEntries(events), Object.fromEntries(exception), week),
    output: {
      used: record.enable_payload ?? false,
      min: record.min_payload ?? 0,
      max: record.max_payload ?? Math.max(1, real.length),
    },
    rev: record.rev,
    source: record,
  };
}

/** One weekday's blocks: the earliest-starting entry owns each minute. */
function readDay(weekly: [string, WeeklyEntry][], day: string): Seg[] {
  const runs = weekly
    .filter(([, w]) => w.enable !== false && w.days?.includes(day))
    .map(([key, w]) => ({ key, name: w.name ?? "", from: parseHHMM(w.start), last: parseHHMM(w.end) }))
    .filter((r): r is { key: string; name: string; from: number; last: number } =>
      r.from !== null && r.last !== null && r.last >= r.from,
    )
    .sort((a, b) => a.from - b.from || natural(a.key, b.key));
  const minutes = new Array<string | null>(DAY_MINUTES).fill(null);
  for (const r of runs) for (let m = r.from; m <= r.last; m++) minutes[m] ??= r.name;
  return fromMinutes(minutes);
}
