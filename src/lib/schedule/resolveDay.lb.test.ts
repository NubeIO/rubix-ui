// resolveDay against lb's own evaluation (`lb-schedules` tests/evaluate_test.rs, on its "Offices"
// document), plus the cases where the design spec's order and lb disagree: lb wins, since boxes and
// dashboards run lb's answer.

import { describe, expect, it } from "vitest";

import type { DatedItem, NodeSchedule } from "./nodeSchedule";
import { readNodeSchedule } from "./readNodeSchedule";
import { resolveDay } from "./resolveDay";
import { buildingHours, dated } from "./scheduleRecord.fixtures";
import type { ScheduleDocument } from "./scheduleRecord";

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];

/** lb's tests/fixtures/offices_doc.json. */
const OFFICES: ScheduleDocument = {
  config: { names: ["Occupied", "Standby"], default_name: "Occupied" },
  schedules: {
    weekly: {
      w1: { name: "Standby", days: WEEKDAYS, start: "06:30", end: "06:59", value: 2, enable: true },
      w2: { name: "Occupied", days: WEEKDAYS, start: "07:00", end: "17:59", value: 1, enable: true },
    },
    events: {
      e1: dated("2026-11-21T21:00", "2026-11-21T23:00", { kind: "extra", label: "Late flight", value: 1 }),
    },
    exception: {
      x1: dated("2026-11-10T06:30", "2026-11-10T10:00", { kind: "changed", label: "Staff training" }),
      x2: dated("2026-12-24T00:00", "2027-01-03T00:00", { kind: "closed", label: "Shutdown", yearly: true }),
      h1: dated("2026-12-25T00:00", "2026-12-26T00:00", { kind: "holiday", label: "Christmas Day" }),
    },
  },
};

const read = (schedule: ScheduleDocument) => readNodeSchedule(buildingHours({}, { schedule }));

/** The name running at `HH:MM` of `date`, or null for Off. */
function at(doc: Pick<NodeSchedule, "week" | "dated" | "names">, date: string, time: string): string | null {
  const m = Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  return resolveDay(doc, date).spans.find((s) => s.start <= m && m <= s.end)?.name ?? null;
}

const spans = (doc: Pick<NodeSchedule, "week" | "dated" | "names">, date: string) =>
  resolveDay(doc, date).spans.map((s) => [s.start, s.end, s.name]);

describe("resolveDay runs lb's evaluation (lb evaluate_test.rs)", () => {
  const d = read(OFFICES);

  it("standby then occupied on a weekday, weekly ends inclusive", () => {
    expect(at(d, "2026-11-04", "06:45")).toBe("Standby");
    expect(at(d, "2026-11-04", "07:00")).toBe("Occupied");
    expect(at(d, "2026-11-04", "17:59")).toBe("Occupied");
    expect(at(d, "2026-11-04", "18:00")).toBeNull();
  });

  it("exceptions switch the schedule off, dated ends exact", () => {
    expect(at(d, "2026-11-10", "09:59")).toBeNull();
    expect(at(d, "2026-11-10", "10:00")).toBe("Occupied");
  });

  it("events add hours the week does not have", () => {
    expect(at(d, "2026-11-21", "22:00")).toBe("Occupied");
    expect(at(d, "2026-11-21", "23:00")).toBeNull();
  });

  it("yearly closures repeat, across New Year too, never before their first year", () => {
    expect(resolveDay(d, "2027-01-01").closed?.label).toBe("Shutdown");
    expect(at(d, "2027-12-28", "09:00")).toBeNull();
    expect(at(d, "2028-01-04", "09:00")).toBe("Occupied");
    expect(at(d, "2025-12-22", "09:00")).toBe("Occupied");
  });

  it("the entry that started first wins: an event from the day before beats today's week", () => {
    const doc = read({
      config: { names: ["A", "B", "C"], default_name: "A" },
      schedules: {
        weekly: {
          a: { name: "A", days: ["monday"], start: "07:00", end: "17:59", value: 1 },
          b: { name: "B", days: ["monday"], start: "06:00", end: "06:59", value: 3 },
        },
        events: { e: dated("2026-11-08T23:00", "2026-11-09T06:30", { name: "C", value: 5 }) },
      },
    });
    expect(at(doc, "2026-11-09", "06:15")).toBe("C");
    expect(at(doc, "2026-11-09", "06:45")).toBe("B");
    expect(at(doc, "2026-11-09", "08:00")).toBe("A");
    expect(at(doc, "2026-11-08", "23:30")).toBe("C");
  });

  it("on the same minute a weekly block beats an event", () => {
    const doc = read({
      config: { names: ["A", "C"], default_name: "A" },
      schedules: {
        weekly: { w1: { name: "A", days: ["monday"], start: "07:00", end: "17:59", value: 1 } },
        events: { a: dated("2026-11-09T07:00", "2026-11-09T09:00", { name: "C", value: 3 }) },
      },
    });
    expect(at(doc, "2026-11-09", "08:00")).toBe("A");
  });

  it("disabled weekly entries never run", () => {
    const off = read({
      ...OFFICES,
      schedules: { weekly: { w2: { ...OFFICES.schedules.weekly!.w2, enable: false } } },
    });
    expect(at(off, "2026-11-04", "09:00")).toBeNull();
  });
});

describe("resolveDay follows lb where the spec's order disagrees", () => {
  const week = (weekly: ScheduleDocument["schedules"]["weekly"]) =>
    read({ config: { names: ["Occupied", "Standby"], default_name: "Occupied" }, schedules: { weekly } });
  const lateStart: DatedItem = { id: "c", kind: "changed", label: "Late start", date: "2026-11-10", hours: [{ start: 600, end: 1079 }] };

  it("changed hours keep the week's own names in the hours left", () => {
    const doc = week({
      w1: { name: "Standby", days: WEEKDAYS, start: "08:00", end: "11:59", value: 2 },
      w2: { name: "Occupied", days: WEEKDAYS, start: "12:00", end: "17:59", value: 1 },
    });
    expect(spans({ ...doc, dated: [lateStart] }, "2026-11-10")).toEqual([
      [600, 719, "Standby"],
      [720, 1079, "Occupied"],
    ]);
  });

  it("extra hours do not cover a weekly block that started earlier", () => {
    const doc = week({ w1: { name: "Standby", days: WEEKDAYS, start: "08:00", end: "17:59", value: 2 } });
    const extra: DatedItem = { id: "e", kind: "extra", label: "Dinner", date: "2026-11-10", start: 720, end: 1199 };
    expect(spans({ ...doc, dated: [extra] }, "2026-11-10")).toEqual([
      [480, 1079, "Standby"],
      [1080, 1199, "Occupied"],
    ]);
  });

  it("extra hours stay Off inside another entry's changed-hours closed window", () => {
    const doc = readNodeSchedule(buildingHours());
    const extra: DatedItem = { id: "e", kind: "extra", label: "Early", date: "2026-11-10", start: 540, end: 659 };
    expect(spans({ ...doc, dated: [lateStart, extra] }, "2026-11-10")).toEqual([[600, 1079, "Occupied"]]);
  });

  it("a box's own window over several days runs on every day it touches", () => {
    const own = dated("2026-11-09T12:00", "2026-11-11T09:00", { label: "Works" });
    delete own.kind;
    const doc = readNodeSchedule(buildingHours({ exception: { box1: own } }));
    expect(spans(doc, "2026-11-09")).toEqual([[480, 719, "Occupied"]]);
    expect(spans(doc, "2026-11-10")).toEqual([]);
    expect(resolveDay(doc, "2026-11-10").closed?.label).toBe("Works");
    expect(spans(doc, "2026-11-11")).toEqual([[540, 1079, "Occupied"]]);
  });
});
