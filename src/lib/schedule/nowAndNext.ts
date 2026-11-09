// A node schedule at an instant, in the schedule's own zone: the name running now and until when, and
// the next change of name with its from and until. A change is any change of name, not only on/off.
// Days are read through `resolveDay`, so dated entries count exactly as the calendar draws them.
//
// Looks a week and a day ahead; a schedule that never changes in that time has no `until` / `next`.
// A switched-off schedule reads Off, with no next change (dashboards and flows read Off while off).
//
// One responsibility: (schedule, instant) → now and next. Pure; the clock comes in.

import { OFF, valueOf, zoneOf, type DatedItem, type NodeSchedule } from "./nodeSchedule";
import { addDays } from "../date";
import { resolveDay, type ResolvedDay } from "./resolveDay";

/** A local wall moment: `YYYY-MM-DD` and the minute of that day. */
export interface Moment {
  date: string;
  minute: number;
}

export interface Running {
  name: string;
  value: number;
}

export interface NowAndNext {
  /** Now, in the schedule's zone. */
  at: Moment;
  enabled: boolean;
  now: Running & {
    /** When it stops (the next change), or null when nothing changes within the horizon. */
    until: Moment | null;
    /** The closed or holiday entry that makes today Off, when that is why it is Off. */
    closed?: DatedItem;
  };
  next: (Running & { from: Moment; until: Moment | null }) | null;
}

const HORIZON_DAYS = 8;

/** `instant` (epoch ms) as local wall time in `zone`. */
export function wallAt(instant: number, zone: string): Moment {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(instant);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  // Some engines still say "24" for midnight.
  const hour = Number(get("hour")) % 24;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minute: hour * 60 + Number(get("minute")) };
}

export function nowAndNext(doc: NodeSchedule, instant: number): NowAndNext {
  const at = wallAt(instant, zoneOf(doc));
  const off = { name: OFF, value: valueOf(doc, null) };
  if (!doc.enabled) return { at, enabled: false, now: { ...off, until: null }, next: null };

  const days = new Map<number, ResolvedDay>();
  const day = (i: number) => {
    let d = days.get(i);
    if (!d) days.set(i, (d = resolveDay(doc, addDays(at.date, i))));
    return d;
  };
  // Minutes from today's midnight; the name running at each (OFF when nothing runs).
  const nameAt = (t: number) => {
    const d = day(Math.floor(t / 1440));
    const m = t % 1440;
    return d.spans.find((s) => s.start <= m && m <= s.end)?.name ?? OFF;
  };
  const end = HORIZON_DAYS * 1440;
  const changeAfter = (t: number) => {
    const name = nameAt(t);
    while (t < end && nameAt(t) === name) t++;
    return t < end ? t : null;
  };
  const moment = (t: number): Moment => ({ date: addDays(at.date, Math.floor(t / 1440)), minute: t % 1440 });
  const run = (name: string): Running => ({ name, value: name === OFF ? off.value : valueOf(doc, name) });

  const current = nameAt(at.minute);
  const t1 = changeAfter(at.minute);
  const closed = current === OFF ? day(0).closed : undefined;
  const now = { ...run(current), until: t1 === null ? null : moment(t1), ...(closed ? { closed } : {}) };
  if (t1 === null) return { at, enabled: true, now, next: null };
  const t2 = changeAfter(t1);
  return {
    at,
    enabled: true,
    now,
    next: { ...run(nameAt(t1)), from: moment(t1), until: t2 === null ? null : moment(t2) },
  };
}
