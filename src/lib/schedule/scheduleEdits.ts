// What a draft changed against the schedule it was opened from, and the same changes put back on top of
// a newer saved version (node schedule brief, decision 2: "Reload, keep my edit").
//
// The parts, in the save bar's words: the changed days ("Mon, Tue"), "dated entries", "names",
// "settings". Reapplying takes, from the draft, every changed day whole, every added, removed or
// changed dated entry (by id), and each changed setting; the rest is the newer version's. When the
// names changed, my list is merged with theirs: names they added stay, my renames and removals are
// carried onto the days and entries I did not touch (else those would still use a name my list no
// longer has, and lb refuses the save), and a name their kept entries still use stays.
//
// One responsibility: diff a draft and reapply it. Pure.

import { mapNames } from "./editNodeSchedule";
import type { NodeSchedule } from "./nodeSchedule";

export const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const SETTINGS = ["name", "description", "color", "timezone", "enabled", "output"] as const;

/** The weekdays (0 = Monday) whose blocks differ. */
export function changedDays(base: NodeSchedule, draft: NodeSchedule): number[] {
  return draft.week.map((_, d) => d).filter((d) => !same(base.week[d], draft.week[d]));
}

/** The save bar's parts: "Mon, Tue", "dated entries", "names", "settings". Empty when nothing changed. */
export function changedParts(base: NodeSchedule, draft: NodeSchedule): string[] {
  const days = changedDays(base, draft);
  return [
    ...(days.length ? [days.map((d) => DAY_SHORT[d]).join(", ")] : []),
    ...(!same(base.dated, draft.dated) ? ["dated entries"] : []),
    ...(!same(base.names, draft.names) ? ["names"] : []),
    ...(SETTINGS.some((k) => !same(base[k], draft[k])) ? ["settings"] : []),
  ];
}

/** `mine`'s edits (against `base`) applied on top of `theirs`. `applied` lists what was carried over. */
export function reapplyEdits(
  base: NodeSchedule,
  mine: NodeSchedule,
  theirs: NodeSchedule,
): { doc: NodeSchedule; applied: string[] } {
  const days = new Set(changedDays(base, mine));
  const named = same(base.names, mine.names) ? theirs : mergeNames(base, mine, theirs);
  const doc: NodeSchedule = {
    ...named,
    week: named.week.map((segs, d) => (days.has(d) ? mine.week[d] : segs)),
    dated: reapplyDated(base, mine, named),
  };
  for (const k of SETTINGS) if (!same(base[k], mine[k])) Object.assign(doc, { [k]: mine[k] });
  return { doc, applied: changedParts(base, mine) };
}

/** `theirs` with my names: my renames and removals mapped onto everything of theirs, then my list,
 *  then the names they added, then any name their kept entries still need. */
function mergeNames(base: NodeSchedule, mine: NodeSchedule, theirs: NodeSchedule): NodeSchedule {
  const inBase = new Set(base.names.map((n) => n.name));
  const renamed = new Map(
    mine.names.filter((n) => n.was && n.was !== n.name && inBase.has(n.was)).map((n) => [n.was!, n.name]),
  );
  const mineFrom = new Set(mine.names.map((n) => n.was ?? n.name));
  const removed = new Set([...inBase].filter((n) => !mineFrom.has(n)));
  const doc = mapNames(theirs, (n) => (removed.has(n) ? null : (renamed.get(n) ?? n)));
  const names = [...mine.names];
  const has = (name: string) => names.some((n) => n.name === name);
  for (const n of theirs.names) if (!inBase.has(n.name) && !has(n.name)) names.push(n);
  const src = doc.source.schedule?.schedules ?? {};
  const used = [
    ...Object.values(src.weekly ?? {}).filter((e) => e.enable === false),
    ...doc.dated.flatMap((i) => (i.kept ? [src[i.kept.map]?.[i.kept.key]] : [])),
  ];
  for (const e of used)
    if (e?.name && !has(e.name))
      names.push(theirs.names.find((n) => n.name === e.name) ?? { name: e.name, value: 0 });
  return { ...doc, names };
}

function reapplyDated(base: NodeSchedule, mine: NodeSchedule, theirs: NodeSchedule) {
  const baseById = new Map(base.dated.map((e) => [e.id, e]));
  const mineById = new Map(mine.dated.map((e) => [e.id, e]));
  const kept = theirs.dated
    .filter((e) => !(baseById.has(e.id) && !mineById.has(e.id)))
    .map((e) => {
      const m = mineById.get(e.id);
      return m && !same(m, baseById.get(e.id)) ? m : e;
    });
  const have = new Set(kept.map((e) => e.id));
  const added = mine.dated.filter((e) => !have.has(e.id) && !same(e, baseById.get(e.id)));
  return [...kept, ...added];
}
