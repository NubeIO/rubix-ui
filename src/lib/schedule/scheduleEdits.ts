// What a draft changed against the schedule it was opened from, and the same changes put back on top of
// a newer saved version (node schedule brief, decision 2: "Reload, keep my edit").
//
// The parts, in the save bar's words: the changed days ("Mon, Tue"), "dated entries", "names",
// "settings". Reapplying takes, from the draft, every changed day whole, the names list when it
// changed, every added, removed or changed dated entry (by id), and each changed setting; the rest is
// the newer version's.
//
// One responsibility: diff a draft and reapply it. Pure.

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
  const doc: NodeSchedule = {
    ...theirs,
    names: same(base.names, mine.names) ? theirs.names : mine.names,
    week: theirs.week.map((segs, d) => (days.has(d) ? mine.week[d] : segs)),
    dated: reapplyDated(base, mine, theirs),
  };
  for (const k of SETTINGS) if (!same(base[k], mine[k])) Object.assign(doc, { [k]: mine[k] });
  return { doc, applied: changedParts(base, mine) };
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
