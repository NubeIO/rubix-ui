// Node schedule records for tests, in the one shape lb stores (node schedule sync design §3): Building
// Hours, Mon to Fri, open 08:00 to 18:00 (stored as 08:00 to 17:59, the box's inclusive end), in
// Sydney, plus builders for the weekly and dated entries a test adds. Test-only: nothing in the app
// imports this file.

import type { DatedEntry, ScheduleDocument, ScheduleRecord } from "./scheduleRecord";

export const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];

/** A `weekly` map with one Occupied entry on `days` from `start` to `end` (inclusive). */
export function hours(
  start: string,
  end: string,
  days: string[] = WEEKDAYS,
): NonNullable<ScheduleDocument["schedules"]["weekly"]> {
  return { w1: { name: "Occupied", days, start, end, value: 1 } };
}

/** One dated entry over one window of local wall time (`YYYY-MM-DDTHH:mm`, end exact). */
export function dated(start: string, end: string, more: Partial<DatedEntry> = {}): DatedEntry {
  return { name: "Occupied", dates: [{ start, end }], value: 0, ...more };
}

/** Building Hours. `schedules` replaces any of the three maps; `patch` replaces any record field. */
export function buildingHours(
  schedules: ScheduleDocument["schedules"] = {},
  patch: Partial<ScheduleRecord> = {},
): ScheduleRecord {
  return {
    id: "building-hours",
    name: "Building Hours",
    priority: 1,
    use_utc: false,
    timezone: "Australia/Sydney",
    enabled: true,
    rev: 1,
    schedule: {
      config: { names: ["Occupied", "Standby"], default_name: "Occupied" },
      schedules: { weekly: hours("08:00", "17:59"), ...schedules },
    },
    ...patch,
  };
}
