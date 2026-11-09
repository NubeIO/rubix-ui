// The dated entries a set of schedules has over some days, as the all-schedules calendar lists them:
// one row per entry (kind + label), on the first day of the period it touches, with every schedule
// that has it, so a holiday several schedules share lists once. Days come from `resolveDay`, so an
// entry counts exactly where the calendar draws it.
//
// One responsibility: (schedules, days) → the period's dated entries. Pure.

import type { DatedItem, NodeSchedule } from "../lib/schedule/nodeSchedule";
import { resolveDay, type ResolvedDay } from "../lib/schedule/resolveDay";

export interface PeriodEntry {
  /** The first day of the period it touches. */
  date: string;
  item: DatedItem;
  schedules: NodeSchedule[];
}

/** Each schedule's resolved days, by schedule id then date. */
export type DayTable = Map<string, Map<string, ResolvedDay>>;

export function dayTable(schedules: NodeSchedule[], days: string[]): DayTable {
  return new Map(schedules.map((s) => [s.id, new Map(days.map((d) => [d, resolveDay(s, d)]))]));
}

const keyOf = (e: DatedItem) => `${e.kind}|${e.label}`;

/** The entries on one day, grouped across schedules. */
export function entriesOn(schedules: NodeSchedule[], table: DayTable, date: string): PeriodEntry[] {
  const groups = new Map<string, PeriodEntry>();
  for (const s of schedules)
    for (const item of table.get(s.id)?.get(date)?.items ?? []) {
      const g = groups.get(keyOf(item));
      if (g) {
        if (!g.schedules.includes(s)) g.schedules.push(s);
      } else groups.set(keyOf(item), { date, item, schedules: [s] });
    }
  return [...groups.values()];
}

/** The entries over `days`, each on the first day it touches. */
export function periodEntries(schedules: NodeSchedule[], table: DayTable, days: string[]): PeriodEntry[] {
  const out = new Map<string, PeriodEntry>();
  for (const d of days)
    for (const e of entriesOn(schedules, table, d)) {
      const g = out.get(keyOf(e.item));
      if (!g) out.set(keyOf(e.item), e);
      else for (const s of e.schedules) if (!g.schedules.includes(s)) g.schedules.push(s);
    }
  return [...out.values()];
}
