// lb's node schedule record, the shape `schedule.get` returns and `schedule.save` takes: rubix-ce's
// schedule document under `schedule`, key for key (node schedule sync design §3). Times are the box's:
// local wall time in the record's zone, weekly ends inclusive to the minute, dated ends exact. Every
// save sends back the `rev` the record was read at.
//
// Plain types only: the API client that reads and saves them stays in the app.
//
// One responsibility: the record types.

/** A weekly entry: open on `days` (lowercase day names) from `start` to `end`, `HH:MM` local wall time,
 *  the end INCLUSIVE to the minute (`17:59` runs to 17:59:59), never past midnight. A missing `enable`
 *  means on; a missing `value` means 0. */
export interface WeeklyEntry {
  name?: string;
  days: string[];
  start: string;
  end: string;
  value?: number;
  color?: string;
  enable?: boolean;
}

/** One dated window: local wall time `YYYY-MM-DDTHH:mm` in the schedule's zone, the end exact. */
export interface DateWindow {
  start: string;
  end: string;
}

/** What a dated entry is for: lb's addition beside rubix-ce's structure. */
export type DatedKind = "closed" | "changed" | "extra" | "holiday";

/** A dated entry. Under `events` it adds open hours; under `exception` it switches the schedule off
 *  (a closure, a changed-hours day, a holiday). */
export interface DatedEntry {
  name?: string;
  label?: string;
  kind?: DatedKind;
  dates: DateWindow[];
  value?: number;
  color?: string;
  /** Repeat every year. Only on `closed` and `holiday` exceptions. */
  yearly?: boolean;
}

/** rubix-ce's schedule document. Each map may be absent; absent reads as empty. */
export interface ScheduleDocument {
  /** The names an entry may use. Missing: `["Default"]`, default `"Default"`. */
  config?: { names?: string[]; default_name?: string };
  schedules: {
    weekly?: Record<string, WeeklyEntry>;
    events?: Record<string, DatedEntry>;
    exception?: Record<string, DatedEntry>;
  };
}

/** One global schedule record. */
export interface ScheduleRecord {
  id: string;
  name: string;
  description?: string;
  /** The schedule's own colour, `#rrggbb`. */
  color?: string;
  enabled: boolean;
  timezone: string;
  use_utc: boolean;
  priority: number;
  enable_payload?: boolean;
  min_payload?: number;
  max_payload?: number;
  default_payload?: number;
  schedule: ScheduleDocument;
  /** The stored revision. Every save sends it back: the host refuses a save whose `rev` is not the
   *  stored one, and `0` means "create; must not exist yet". */
  rev: number;
}
