// The editor's `NodeSchedule` written back as lb's record: the save payload, sent with the `rev` it
// was read at (node schedule brief, decision 1).
//
//   - `config.names` are the names after Off; `default_name` is the stored one while it is still a
//     name (a rename follows it), else the first of them. The Schedule Groups extension runs changed
//     hours and overrides under it, so it must not move on a save. Off is not stored: its value is
//     `default_payload`.
//   - every block of a name carries that name's one value, so changing a name's value rewrites them all;
//   - weekly: blocks with the same times and name share one entry across their days. Disabled entries
//     the record had are kept as they were, under their own keys (new entries take the free `w<n>`
//     keys), so a reload reads the same record back;
//   - dated entries: in the Schedule Groups extension's own form (`datedWrite.ts`), since both pages
//     edit the same records.
//   - legacy top-level `weekly` / `exceptions` (the old read-only stopgap) are dropped: lb refuses them.
//
// One responsibility: editor model in, record out. Pure.

import { writeDated } from "./datedWrite";
import { defaultName, hhmm, valueOf, WIRE_DAYS, type NodeSchedule } from "./nodeSchedule";
import type { ScheduleRecord, WeeklyEntry } from "./scheduleRecord";

export function writeNodeSchedule(doc: NodeSchedule): ScheduleRecord {
  const real = doc.names.slice(1).map((n) => n.name);
  const rest: ScheduleRecord & { weekly?: unknown; exceptions?: unknown } = { ...doc.source };
  delete rest.weekly;
  delete rest.exceptions;
  const { events, exception } = writeDated(doc);

  return {
    ...rest,
    id: doc.id,
    name: doc.name,
    description: doc.description,
    color: doc.color,
    timezone: doc.timezone,
    enabled: doc.enabled,
    enable_payload: doc.output.used,
    min_payload: doc.output.min,
    max_payload: doc.output.max,
    default_payload: doc.names[0]?.value ?? 0,
    rev: doc.rev,
    schedule: {
      config: { names: real, default_name: defaultName(doc) },
      schedules: { weekly: writeWeek(doc), events, exception },
    },
  };
}

function writeWeek(doc: NodeSchedule): Record<string, WeeklyEntry> {
  const groups = new Map<string, WeeklyEntry>();
  doc.week.forEach((segs, day) => {
    for (const s of segs) {
      const k = `${s.start}|${s.end}|${s.name}`;
      const entry = groups.get(k);
      if (entry) entry.days.push(WIRE_DAYS[day]);
      else
        groups.set(k, {
          name: s.name,
          days: [WIRE_DAYS[day]],
          start: hhmm(s.start),
          end: hhmm(s.end),
          value: valueOf(doc, s.name),
        });
    }
  });
  const out: Record<string, WeeklyEntry> = {};
  for (const [key, e] of Object.entries(doc.source.schedule?.schedules?.weekly ?? {}))
    if (e.enable === false) out[key] = e;
  let n = 1;
  for (const e of groups.values()) {
    while (`w${n}` in out) n++;
    out[`w${n}`] = e;
  }
  return out;
}
