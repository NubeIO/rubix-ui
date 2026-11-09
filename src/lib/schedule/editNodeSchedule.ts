// The edits the node schedule editor makes, each a pure (schedule, ...) → schedule step: paint the week,
// set or copy a day, and the names (add, rename, change a value, remove). Dated entries are plain
// list edits and are done in place by the caller.
//
// A name's value lives once, on the name; `writeNodeSchedule` puts it on every block of that name. A
// name with no blocks yet keeps its value only in this draft: lb stores values on blocks, so it is
// read back as its position until a block uses it.
//
// lb checks EVERY entry's name against `config.names` on save, disabled weekly entries and a box's own
// (kept) dated entries included, though the editor does not draw the first and writes the second back
// as read. So a rename reaches those too (`mapNames`), and a name they still use cannot be removed
// (`removeBlocker` says why): turning a box's own entry to another name would change what it means,
// and dropping it would lose it.
//
// One responsibility: pure edits of a `NodeSchedule`.

import { fromMinutes, MAX_NAMES, OFF, toMinutes, type NodeSchedule, type Seg } from "./nodeSchedule";
import type { ScheduleDocument } from "./scheduleRecord";

type Entries = ScheduleDocument["schedules"]["weekly"] | ScheduleDocument["schedules"]["events"];

/** Every name `doc` uses passed through `f`: the week's blocks (null turns them Off), the default name
 *  (null drops it, so the first name is the default), and the entries the editor does not draw, in
 *  `source` and on their items (null keeps their name: they cannot turn Off). The names list is the
 *  caller's. */
export function mapNames(doc: NodeSchedule, f: (name: string) => string | null): NodeSchedule {
  const keep = (name: string) => f(name) ?? name;
  const each = <T extends Entries>(map: T): T =>
    map &&
    (Object.fromEntries(
      Object.entries(map).map(([k, e]) => [k, e.name ? { ...e, name: keep(e.name) } : e]),
    ) as T);
  const s = doc.source.schedule?.schedules;
  const at = doc.defaultName && f(doc.defaultName);
  return {
    ...doc,
    ...(doc.defaultName ? { defaultName: at || undefined } : {}),
    week: doc.week.map((segs) =>
      segs.flatMap((x) => {
        const name = f(x.name);
        return name === null ? [] : [{ ...x, name }];
      }),
    ),
    dated: doc.dated.map((i) => (i.kept && i.name ? { ...i, name: keep(i.name) } : i)),
    source: s
      ? {
          ...doc.source,
          schedule: {
            ...doc.source.schedule,
            schedules: { weekly: each(s.weekly), events: each(s.events), exception: each(s.exception) },
          },
        }
      : doc.source,
  };
}

/** Why the name at `index` cannot be removed, or null when it can: entries the editor writes back as
 *  they were (a box's own dated entries, switched-off weekly entries) still use it. */
export function removeBlocker(doc: NodeSchedule, index: number): string | null {
  const name = doc.names[index]?.name;
  const s = doc.source.schedule?.schedules ?? {};
  if (!name) return null;
  const weekly = Object.values(s.weekly ?? {}).some((e) => e.enable === false && e.name === name);
  const dated = doc.dated.some((i) => i.kept && s[i.kept.map]?.[i.kept.key]?.name === name);
  if (!weekly && !dated) return null;
  const what = [dated && "a box's own dated entry", weekly && "a switched-off weekly entry"].filter(Boolean);
  return `${name} can't be removed: ${what.join(" and ")} still ${what.length > 1 ? "use" : "uses"} it.`;
}

/** Paint `name` (null = Off, the Clear brush) from `from` to `to` (minutes, `to` exclusive) on `days`. */
export function paintWeek(
  doc: NodeSchedule,
  days: number[],
  from: number,
  to: number,
  name: string | null,
): NodeSchedule {
  if (to <= from) return doc;
  return {
    ...doc,
    week: doc.week.map((segs, d) => {
      if (!days.includes(d)) return segs;
      const minutes = toMinutes(segs);
      minutes.fill(name, from, to);
      return fromMinutes(minutes);
    }),
  };
}

/** Replace one day's blocks. Overlaps resolve to the later block; Off blocks are dropped. */
export function setDay(doc: NodeSchedule, day: number, segs: Seg[]): NodeSchedule {
  const clean = fromMinutes(toMinutes(segs.filter((s) => s.name !== OFF)));
  return { ...doc, week: doc.week.map((s, d) => (d === day ? clean : s)) };
}

/** Copy one day's blocks onto other days. */
export function copyDay(doc: NodeSchedule, from: number, to: number[]): NodeSchedule {
  return { ...doc, week: doc.week.map((s, d) => (to.includes(d) ? doc.week[from].map((x) => ({ ...x })) : s)) };
}

/** "Make Tue–Fri the same as Monday". */
export function sameAsMonday(doc: NodeSchedule): NodeSchedule {
  return copyDay(doc, 0, [1, 2, 3, 4]);
}

/** Rename the name at `index` (not Off) everywhere it is used. An empty or taken name is refused. */
export function renameName(doc: NodeSchedule, index: number, next: string): NodeSchedule {
  const name = next.trim();
  const old = doc.names[index]?.name;
  if (index < 1 || !old || !name || name === old || doc.names.some((n) => n.name === name)) return doc;
  return {
    ...mapNames(doc, (n) => (n === old ? name : n)),
    names: doc.names.map((n, i) => (i === index ? { ...n, name, was: n.was ?? old } : n)),
  };
}

/** Change the value a name sends (Off's is the box output default). */
export function setNameValue(doc: NodeSchedule, index: number, value: number): NodeSchedule {
  if (!Number.isFinite(value) || !doc.names[index]) return doc;
  return { ...doc, names: doc.names.map((n, i) => (i === index ? { ...n, value } : n)) };
}

/** Add a name ("Name 3" = 3) while there is room. */
export function addName(doc: NodeSchedule): NodeSchedule {
  if (doc.names.length >= MAX_NAMES) return doc;
  let n = doc.names.length;
  while (doc.names.some((x) => x.name === `Name ${n}`)) n++;
  return { ...doc, names: [...doc.names, { name: `Name ${n}`, value: doc.names.length }] };
}

/** Remove a name; its blocks become Off. Off and the first name stay; a name `removeBlocker` names is
 *  refused. Removing the default name makes the first name the default. */
export function removeName(doc: NodeSchedule, index: number): NodeSchedule {
  const name = doc.names[index]?.name;
  if (index < 2 || !name || removeBlocker(doc, index)) return doc;
  return {
    ...mapNames(doc, (n) => (n === name ? null : n)),
    names: doc.names.filter((_, i) => i !== index),
  };
}
