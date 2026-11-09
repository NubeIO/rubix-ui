// resolveDay on the editor's own dated items, and where dated entries fall: yearly, ranges over a year
// end, 29 February the way lb reads it. lb's own evaluation cases are in `resolveDay.lb.test.ts`.

import { describe, expect, it } from "vitest";

import { nextWindow, occurrences } from "./datedWindows";
import type { DatedItem, NodeSchedule } from "./nodeSchedule";
import { resolveDay } from "./resolveDay";

const WEEK = Array.from({ length: 7 }, (_, d) => (d < 5 ? [{ start: 420, end: 1079, name: "Occupied" }] : []));
const NAMES = [
  { name: "Off", value: 0 },
  { name: "Occupied", value: 1 },
  { name: "Standby", value: 2 },
];
type Doc = Pick<NodeSchedule, "week" | "dated" | "names">;
const doc = (dated: DatedItem[]): Doc => ({ week: WEEK, dated, names: NAMES });
const spans = (d: Doc, date: string) =>
  resolveDay(d, date).spans.map((s) => [s.start, s.end, s.name]);

describe("resolveDay", () => {
  it("runs the weekday's blocks (Wed 11 Nov 2026)", () => {
    expect(spans(doc([]), "2026-11-11")).toEqual([[420, 1079, "Occupied"]]);
    expect(spans(doc([]), "2026-11-14")).toEqual([]);
  });

  it("changed hours close the week's unwanted hours, extra hours add some, a closure wins over both", () => {
    const changed: DatedItem = { id: "c", kind: "changed", label: "Late", date: "2026-11-11", hours: [{ start: 600, end: 1079 }] };
    const extra: DatedItem = { id: "e", kind: "extra", label: "Dinner", date: "2026-11-11", start: 1140, end: 1319 };
    const d = doc([changed, extra]);
    expect(spans(d, "2026-11-11")).toEqual([
      [600, 1079, "Occupied"],
      [1140, 1319, "Occupied"],
    ]);
    expect(resolveDay(d, "2026-11-11").items).toEqual([changed, extra]);
    const closed: DatedItem = { id: "x", kind: "closed", label: "Testing", date: "2026-11-11" };
    const day = resolveDay(doc([changed, extra, closed]), "2026-11-11");
    expect(day.spans).toEqual([]);
    expect(day.closed).toBe(closed);
  });

  it("a box's own part-day closure clears only its minutes", () => {
    const x: DatedItem = {
      id: "kept:exception:x",
      kind: "closed",
      label: "Late start",
      date: "2026-11-10",
      start: 390,
      end: 599,
      kept: { map: "exception", key: "x" },
      windows: [{ start: "2026-11-10T06:30", end: "2026-11-10T10:00" }],
    };
    expect(spans(doc([x]), "2026-11-10")).toEqual([[600, 1079, "Occupied"]]);
    expect(resolveDay(doc([x]), "2026-11-10").closed).toBeUndefined();
  });

  it("repeats a yearly holiday in later years, never before its own", () => {
    const h: DatedItem = { id: "h", kind: "holiday", label: "Christmas", date: "2026-12-25", yearly: true };
    expect(resolveDay(doc([h]), "2030-12-25").closed).toBe(h);
    expect(resolveDay(doc([h]), "2025-12-25").closed).toBeUndefined();
  });

  it("finds a yearly range over a year end from either side", () => {
    const x: DatedItem = { id: "x", kind: "closed", label: "Shutdown", date: "2026-12-24", to: "2027-01-01", yearly: true };
    expect(resolveDay(doc([x]), "2027-12-30").closed).toBe(x);
    expect(resolveDay(doc([x]), "2028-01-01").closed).toBe(x);
    expect(resolveDay(doc([x]), "2028-01-03").closed).toBeUndefined();
  });

  it("skips a yearly entry starting 29 Feb in other years, as lb does", () => {
    const x: DatedItem = { id: "x", kind: "closed", label: "Leap", date: "2028-02-29", yearly: true };
    expect(resolveDay(doc([x]), "2032-02-29").closed).toBe(x);
    expect(resolveDay(doc([x]), "2029-02-28").closed).toBeUndefined();
    expect(resolveDay(doc([x]), "2029-03-01").closed).toBeUndefined();
  });

  it("ends a yearly entry ending 29 Feb on 1 March in other years, as lb does", () => {
    const ends29: DatedItem = { id: "y", kind: "closed", label: "Feb end", date: "2028-02-28", to: "2028-02-28", yearly: true };
    // Whole days ending the 28th end at 29 Feb 00:00, which 2029 lacks: lb moves it to 1 Mar 00:00.
    expect(occurrences(ends29, [2029])).toEqual([{ start: "2029-02-28T00:00", end: "2029-03-01T00:00" }]);
    expect(resolveDay(doc([ends29]), "2029-02-28").closed).toBe(ends29);
    expect(resolveDay(doc([ends29]), "2029-03-01").closed).toBeUndefined();
  });

  it("says when a yearly entry happens next", () => {
    const h: DatedItem = { id: "h", kind: "holiday", label: "Australia Day", date: "2027-01-26", yearly: true };
    expect(nextWindow(h, "2027-06-01").start).toBe("2028-01-26T00:00");
    expect(nextWindow(h, "2026-11-06").start).toBe("2027-01-26T00:00");
  });
});
