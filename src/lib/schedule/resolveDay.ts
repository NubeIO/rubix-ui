// What one date of a node schedule runs, minute by minute. The ONE resolution every reader uses (the
// editor's calendar and Now, the all-schedules calendar, dashboards), in the spec's order:
//
//   week[weekday] → a changed-hours entry on the date clears the day and applies its hours →
//   extra-hours entries go on top → a closed or holiday entry on the date makes the whole day Off.
//
// Extra and changed hours run the default name (the extension's form). A kept part-day closure (a
// box's own entry) clears only its part. Dates are local
// wall dates in the schedule's zone; yearly entries and ranges over a year end are found through
// `datedWindows` (lb's rules, 29 February included).
//
// One responsibility: (schedule, date) → the day's blocks. Pure.

import { coverOn } from "./datedWindows";
import { DAY_MINUTES, defaultName, type DatedItem, type NodeSchedule } from "./nodeSchedule";

/** One block of the resolved day. `end` inclusive; `item` is the dated entry that put it there. */
export interface DaySpan {
  start: number;
  end: number;
  name: string;
  item?: DatedItem;
}

export interface ResolvedDay {
  date: string;
  /** 0 = Monday ... 6 = Sunday. */
  weekday: number;
  /** The blocks that run, Off left out, sorted. */
  spans: DaySpan[];
  /** The closed or holiday entry that makes the whole day Off. */
  closed?: DatedItem;
  /** Every dated entry that touched the day, in the order applied. */
  items: DatedItem[];
}

interface Cell {
  name: string;
  item?: DatedItem;
}

/** The weekday of `YYYY-MM-DD`, 0 = Monday. */
export function weekdayOf(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7;
}

export function resolveDay(doc: Pick<NodeSchedule, "week" | "dated" | "names">, date: string): ResolvedDay {
  const weekday = weekdayOf(date);
  const cells = new Array<Cell | null>(DAY_MINUTES).fill(null);
  for (const s of doc.week[weekday] ?? []) for (let m = s.start; m <= s.end; m++) cells[m] = { name: s.name };
  const items: DatedItem[] = [];
  const paint = (item: DatedItem, cell: Cell | null) => {
    const cover = coverOn(item, date);
    if (!cover) return false;
    for (let m = cover.from; m < cover.to; m++) cells[m] = cell;
    items.push(item);
    return cover.from === 0 && cover.to === DAY_MINUTES;
  };

  const runs = defaultName(doc);
  const changed = doc.dated.find((e) => e.kind === "changed" && coverOn(e, date));
  if (changed) {
    cells.fill(null);
    for (const h of changed.hours ?? [])
      for (let m = h.start; m <= h.end; m++) cells[m] = { name: runs, item: changed };
    items.push(changed);
  }
  for (const e of doc.dated) if (e.kind === "extra") paint(e, { name: e.name ?? runs, item: e });
  let closed: DatedItem | undefined;
  for (const e of doc.dated)
    if ((e.kind === "closed" || e.kind === "holiday") && paint(e, null)) closed ??= e;

  const spans: DaySpan[] = [];
  for (let m = 0; m < DAY_MINUTES; ) {
    const c = cells[m];
    let j = m;
    while (j < DAY_MINUTES && cells[j]?.name === c?.name && cells[j]?.item === c?.item) j++;
    if (c) spans.push({ start: m, end: j - 1, name: c.name, ...(c.item ? { item: c.item } : {}) });
    m = j;
  }
  return closed ? { date, weekday, spans, closed, items } : { date, weekday, spans, items };
}
