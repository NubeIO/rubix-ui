// What a draft changed, and the same edit reapplied on top of someone else's newer save.

import { describe, expect, it } from "vitest";

import { addName, paintWeek, removeName, renameName } from "./editNodeSchedule";
import { readNodeSchedule } from "./readNodeSchedule";
import { changedParts, reapplyEdits } from "./scheduleEdits";
import { buildingHours, dated } from "./scheduleRecord.fixtures";
import { writeNodeSchedule } from "./writeNodeSchedule";

const record = buildingHours({
  exception: { x1: dated("2026-11-21T00:00", "2026-11-22T00:00", { kind: "closed", label: "Testing" }) },
});

describe("changedParts", () => {
  it("lists changed days, dated entries, names and settings in the save bar's words", () => {
    const base = readNodeSchedule(record);
    let draft = paintWeek(base, [0, 1], 1080, 1140, "Standby");
    draft = renameName(draft, 2, "Cleaning");
    draft = { ...draft, dated: [], enabled: false };
    expect(changedParts(base, draft)).toEqual(["Mon, Tue", "dated entries", "names", "settings"]);
    expect(changedParts(base, base)).toEqual([]);
  });
});

describe("reapplyEdits", () => {
  it("puts my changed days and dated edits on top of their version, keeping theirs elsewhere", () => {
    const base = readNodeSchedule(record);
    const mine = {
      ...paintWeek(base, [0], 1080, 1140, "Standby"),
      dated: [{ id: "n1", kind: "holiday" as const, label: "Cup", date: "2026-11-03" }],
    };
    const theirs = { ...paintWeek(base, [4], 0, 60, "Occupied"), rev: 2 };
    const { doc, applied } = reapplyEdits(base, mine, theirs);
    expect(doc.rev).toBe(2);
    expect(doc.week[0]).toEqual(mine.week[0]);
    expect(doc.week[4]).toEqual(theirs.week[4]);
    // My removal of Testing and my new Cup both carried over.
    expect(doc.dated.map((e) => e.label)).toEqual(["Cup"]);
    expect(applied).toEqual(["Mon", "dated entries"]);
  });

  it("carries my rename onto the days they changed, so the save is not refused", () => {
    const base = readNodeSchedule(record);
    const mine = renameName(paintWeek(base, [0], 1080, 1140, "Standby"), 2, "Cleaning");
    const theirs = { ...paintWeek(base, [5], 480, 600, "Standby"), rev: 2 };
    const { doc } = reapplyEdits(base, mine, theirs);
    expect(doc.names.map((n) => n.name)).toEqual(["Off", "Occupied", "Cleaning"]);
    expect(doc.week[5]).toEqual([{ start: 480, end: 599, name: "Cleaning" }]);
    expect(doc.week[0].some((s) => s.name === "Cleaning")).toBe(true);
    const names = writeNodeSchedule(doc).schedule.config?.names ?? [];
    for (const e of Object.values(writeNodeSchedule(doc).schedule.schedules.weekly ?? {}))
      expect(names).toContain(e.name);
  });

  it("keeps the names they added beside mine, and drops my removed name from their days", () => {
    const base = readNodeSchedule(record);
    const mine = renameName(addName(base), 3, "Cleaning");
    const theirs0 = renameName(addName(base), 3, "Night");
    const theirs = { ...paintWeek(theirs0, [6], 0, 60, "Night"), rev: 2 };
    const { doc } = reapplyEdits(base, mine, theirs);
    expect(doc.names.map((n) => n.name)).toEqual(["Off", "Occupied", "Standby", "Cleaning", "Night"]);
    expect(doc.week[6]).toEqual([{ start: 0, end: 59, name: "Night" }]);

    const dropped = removeName(base, 2);
    const theirs2 = { ...paintWeek(base, [5], 480, 600, "Standby"), rev: 2 };
    const out = reapplyEdits(base, dropped, theirs2).doc;
    expect(out.names.map((n) => n.name)).toEqual(["Off", "Occupied"]);
    expect(out.week[5]).toEqual([]);
  });
});
