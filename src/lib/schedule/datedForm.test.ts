// Dated entries in the Schedule Groups extension's form, both ways. The expectations are the
// extension's own tests (rust-schedule-management `tests/edit_test.rs`, `offices()`): the same input
// must give the same keys, kinds, windows, names, values and colours, and a record the extension wrote
// must read back as one entry per stem and write back unchanged.

import { describe, expect, it } from "vitest";

import type { DatedItem } from "./nodeSchedule";
import { readNodeSchedule } from "./readNodeSchedule";
import type { DatedEntry } from "./scheduleRecord";
import { buildingHours, WEEKDAYS } from "./scheduleRecord.fixtures";
import { writeNodeSchedule } from "./writeNodeSchedule";

/** The extension's `offices()`: Mon to Fri 06:30 to 06:59 Standby (2), 07:00 to 17:59 Occupied (1). */
const offices = (schedules: { events?: Record<string, DatedEntry>; exception?: Record<string, DatedEntry> } = {}) =>
  buildingHours({
    weekly: {
      w1: { name: "Standby", days: WEEKDAYS, start: "06:30", end: "06:59", value: 2, color: "#f59e0b", enable: true },
      w2: { name: "Occupied", days: WEEKDAYS, start: "07:00", end: "17:59", value: 1, color: "#2563eb", enable: true },
    },
    ...schedules,
  });

const write = (dated: DatedItem[]) => {
  const doc = readNodeSchedule(offices());
  return writeNodeSchedule({ ...doc, dated }).schedule.schedules;
};

// What the extension writes for its tests' closures and holidays.
const EXCEPTION: Record<string, DatedEntry> = {
  "c1-x": {
    name: "Occupied", label: "Christmas shutdown", kind: "closed", value: 0, color: "#6b7280", yearly: true,
    dates: [{ start: "2026-12-24T00:00", end: "2027-01-03T00:00" }],
  },
  "c2-x": {
    name: "Occupied", label: "Staff training", kind: "changed", value: 0, color: "#6b7280",
    dates: [{ start: "2026-10-14T06:30", end: "2026-10-14T10:00" }],
  },
  "c3-x": {
    name: "Occupied", label: "Open late", kind: "changed", value: 0, color: "#6b7280",
    dates: [{ start: "2026-10-15T06:30", end: "2026-10-15T08:00" }],
  },
  "h-2026-12-25": {
    name: "Occupied", label: "Christmas Day", kind: "holiday", value: 0, color: "#6b7280", yearly: true,
    dates: [{ start: "2026-12-25T00:00", end: "2026-12-26T00:00" }],
  },
  "h-2026-12-26": {
    name: "Occupied", label: "Boxing Day", kind: "holiday", value: 0, color: "#6b7280",
    dates: [{ start: "2026-12-26T00:00", end: "2026-12-27T00:00" }],
  },
};
const EVENTS: Record<string, DatedEntry> = {
  "c3-e": {
    name: "Occupied", label: "Open late", kind: "extra", value: 1, color: "#2563eb",
    dates: [{ start: "2026-10-15T18:00", end: "2026-10-15T20:00" }],
  },
};

const ITEMS: DatedItem[] = [
  { id: "c1", kind: "closed", label: "Christmas shutdown", date: "2026-12-24", to: "2027-01-02", yearly: true },
  { id: "c2", kind: "changed", label: "Staff training", date: "2026-10-14", hours: [{ start: 600, end: 1079 }] },
  { id: "c3", kind: "changed", label: "Open late", date: "2026-10-15", hours: [{ start: 480, end: 1199 }] },
  { id: "h-2026-12-25", kind: "holiday", label: "Christmas Day", date: "2026-12-25", yearly: true },
  { id: "h-2026-12-26", kind: "holiday", label: "Boxing Day", date: "2026-12-26" },
];

describe("dated entries in the extension's form", () => {
  it("writes the same keys, kinds, windows and values the extension writes", () => {
    const s = write(ITEMS);
    expect(s.exception).toEqual(EXCEPTION);
    expect(s.events).toEqual(EVENTS);
  });

  it("reads a record the extension wrote as one entry per stem, changed hours as the hours left open", () => {
    const doc = readNodeSchedule(offices({ events: EVENTS, exception: EXCEPTION }));
    const byId = Object.fromEntries(doc.dated.map((e) => [e.id, e]));
    expect(doc.dated).toHaveLength(5);
    for (const item of ITEMS) expect(byId[item.id]).toEqual(item);
  });

  it("round-trips the extension's record unchanged", () => {
    const record = offices({ events: EVENTS, exception: EXCEPTION });
    const s = writeNodeSchedule(readNodeSchedule(record)).schedule.schedules;
    expect(s.exception).toEqual(EXCEPTION);
    expect(s.events).toEqual(EVENTS);
  });

  it("reads an -e with no -x as extra hours, and writes extra hours as one -e", () => {
    const extra: DatedItem = { id: "c9", kind: "extra", label: "Late flight", date: "2026-11-21", start: 1260, end: 1379 };
    const s = write([extra]);
    expect(s.events).toEqual({
      "c9-e": {
        name: "Occupied", label: "Late flight", kind: "extra", value: 1, color: "#2563eb",
        dates: [{ start: "2026-11-21T21:00", end: "2026-11-21T23:00" }],
      },
    });
    expect(s.exception).toEqual({});
    expect(readNodeSchedule(offices({ events: s.events })).dated).toEqual([extra]);
  });

  it("works changed hours out per day of a range and joins closed runs over minutes that run nothing", () => {
    // Open 12:00 to 13:00 on Mon 12 and Tue 13 Oct: 06:30 to 12:00 and 13:00 to 18:00 closed each day.
    const s = write([
      { id: "c5", kind: "changed", label: "Short days", date: "2026-10-12", to: "2026-10-13", hours: [{ start: 720, end: 779 }] },
    ]);
    expect(s.exception?.["c5-x"].dates).toEqual([
      { start: "2026-10-12T06:30", end: "2026-10-12T12:00" },
      { start: "2026-10-12T13:00", end: "2026-10-12T18:00" },
      { start: "2026-10-13T06:30", end: "2026-10-13T12:00" },
      { start: "2026-10-13T13:00", end: "2026-10-13T18:00" },
    ]);
    expect(s.events?.["c5-e"]).toBeUndefined();
  });
});
