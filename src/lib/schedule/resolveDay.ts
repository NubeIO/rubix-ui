// What one date of a node schedule runs, minute by minute. The ONE resolution every reader uses (the
// editor's calendar and Now, the all-schedules calendar, dashboards). It is lb's own evaluation
// (`lb-schedules` evaluate.rs) run on what the editor saves, so it says what the box will run:
//
//   1. the week's blocks and the events are OR'd;
//   2. an exception covering the minute switches everything off;
//   3. where several cover a minute, the one that STARTED earliest gives the name (an event that began
//      the day before beats today's week); on the same start a weekly block beats an event, then keys
//      go in natural order.
//
// This follows lb, not the design spec's order ("changed hours clear the day, extra hours go on top"),
// where the two disagree, because dashboards and boxes run lb's answer. So on a changed-hours day only
// the week's unwanted hours are switched off and the week's own names keep running in the hours left;
// extra hours do not cover a weekly block that started earlier; and no event runs inside another
// entry's closed window. The editor's dated items become lb entries the way they are saved
// (`itemEntries`); a box's own (kept) entry runs from its stored windows, every day they touch.
//
// One responsibility: (schedule, date) → the day's blocks. Pure.

import { addDays } from "../date";
import { itemEntries } from "./datedWrite";
import { itemWindow, weekdayOf, windowCopies } from "./datedWindows";
import { DAY_MINUTES, hhmm, type DatedItem, type NodeSchedule } from "./nodeSchedule";

export { weekdayOf } from "./datedWindows";

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
  /** Every dated entry that touched the day: changed hours, extra hours, then closures. */
  items: DatedItem[];
}

/** One lb window that touches the date: `at` and `until` are wall times, `until` exact. */
interface Run {
  at: string;
  until: string;
  key: string;
  name: string;
  item?: DatedItem;
}

const natural = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });
const RANK = { changed: 0, extra: 1, closed: 2, holiday: 2 } as const;

type Doc = Pick<NodeSchedule, "week" | "dated" | "names" | "defaultName">;

/** The events and exceptions of `doc` whose windows touch `date`. */
function runsOn(doc: Doc, date: string): { events: Run[]; offs: Run[]; touched: Set<DatedItem> } {
  const y = Number(date.slice(0, 4));
  const years = [y - 1, y, y + 1];
  const [dayStart, dayEnd] = [`${date}T00:00`, `${addDays(date, 1)}T00:00`];
  const events: Run[] = [];
  const offs: Run[] = [];
  const touched = new Set<DatedItem>();
  for (const item of doc.dated) {
    const inRange = item.date <= date && date <= (item.to ?? item.date);
    if (item.kind === "changed" && !item.kept && !inRange) continue;
    if (item.kind === "changed" && !item.kept) touched.add(item);
    const own = { name: item.name, dates: item.windows ?? [itemWindow(item)], yearly: item.yearly };
    const parts = item.kept ? [{ ...item.kept, entry: own }] : itemEntries(doc, item, [date]);
    for (const { map, key, entry } of parts)
      for (const w of windowCopies(entry.dates, entry.yearly, years)) {
        if (w.start >= dayEnd || w.end <= dayStart) continue;
        touched.add(item);
        const run = { at: w.start, until: w.end, key, name: entry.name ?? "", item };
        (map === "events" ? events : offs).push(run);
      }
  }
  return { events, offs, touched };
}

export function resolveDay(doc: Doc, date: string): ResolvedDay {
  const weekday = weekdayOf(date);
  const { events, offs, touched } = runsOn(doc, date);
  const changed = [...touched].filter((e) => e.kind === "changed" && !e.kept);
  const offMinutes = new Map<DatedItem, number>();
  const cells = new Array<{ name: string; item?: DatedItem } | null>(DAY_MINUTES).fill(null);

  for (let m = 0; m < DAY_MINUTES; m++) {
    const t = `${date}T${hhmm(m)}`;
    const covers = (r: Run) => r.at <= t && t < r.until;
    const off = new Set(offs.filter(covers).map((r) => r.item));
    for (const item of off) if (item) offMinutes.set(item, (offMinutes.get(item) ?? 0) + 1);
    if (off.size) continue;
    const seg = doc.week[weekday]?.find((s) => s.start <= m && m <= s.end);
    let best: Run | undefined = seg && { at: `${date}T${hhmm(seg.start)}`, until: "", key: "", name: seg.name };
    // Earliest start; on a tie the weekly block (no item) stays, events go by key.
    for (const r of events.filter(covers))
      if (!best || r.at < best.at || (r.at === best.at && best.item && natural(r.key, best.key) < 0))
        best = r;
    if (!best) continue;
    // A weekly minute inside a changed-hours item's hours is marked with that item, as the calendar draws it.
    const item = best.item ?? changed.find((c) => c.hours?.some((h) => h.start <= m && m <= h.end));
    cells[m] = { name: best.name, ...(item ? { item } : {}) };
  }

  const spans: DaySpan[] = [];
  for (let m = 0; m < DAY_MINUTES; ) {
    const c = cells[m];
    let j = m;
    while (j < DAY_MINUTES && cells[j]?.name === c?.name && cells[j]?.item === c?.item) j++;
    if (c) spans.push({ start: m, end: j - 1, ...c });
    m = j;
  }
  const items = doc.dated.filter((e) => touched.has(e)).sort((a, b) => RANK[a.kind] - RANK[b.kind]);
  const closed = items.find(
    (e) => (e.kind === "closed" || e.kind === "holiday") && offMinutes.get(e) === DAY_MINUTES,
  );
  return closed ? { date, weekday, spans, closed, items } : { date, weekday, spans, items };
}
