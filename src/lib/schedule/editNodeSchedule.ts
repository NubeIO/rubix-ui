// The edits the node schedule editor makes, each a pure (schedule, ...) → schedule step: paint the week,
// set or copy a day, and the names (add, rename, change a value, remove). Dated entries are plain
// list edits and are done in place by the caller.
//
// A name's value lives once, on the name; `writeNodeSchedule` puts it on every block of that name. A
// name with no blocks yet keeps its value only in this draft: lb stores values on blocks, so it is
// read back as its position until a block uses it.
//
// One responsibility: pure edits of a `NodeSchedule`.

import { fromMinutes, MAX_NAMES, OFF, toMinutes, type NodeSchedule, type Seg } from "./nodeSchedule";

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
    ...doc,
    names: doc.names.map((n, i) => (i === index ? { ...n, name } : n)),
    week: doc.week.map((segs) => segs.map((s) => (s.name === old ? { ...s, name } : s))),
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

/** Remove a name; its blocks become Off. Off and the first name (lb's default name, which the dated
 *  entries run) stay. */
export function removeName(doc: NodeSchedule, index: number): NodeSchedule {
  const name = doc.names[index]?.name;
  if (index < 2 || !name) return doc;
  return {
    ...doc,
    names: doc.names.filter((_, i) => i !== index),
    week: doc.week.map((segs) => segs.filter((s) => s.name !== name)),
  };
}
