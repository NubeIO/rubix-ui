// The editor model's round trip with lb's record: Off as a UI-only default, values per name, the week
// as the box runs it, dated entries of four kinds, and the save payload (rev, no legacy fields).

import { describe, expect, it } from "vitest";

import { paintWeek, removeName, setNameValue } from "./editNodeSchedule";
import { OFF } from "./nodeSchedule";
import { readNodeSchedule } from "./readNodeSchedule";
import { buildingHours, dated } from "./scheduleRecord.fixtures";
import { writeNodeSchedule } from "./writeNodeSchedule";

describe("readNodeSchedule", () => {
  it("puts Off first with the box output default, then config.names with their block values", () => {
    const doc = readNodeSchedule(buildingHours({}, { default_payload: 4 }));
    expect(doc.names).toEqual([
      { name: OFF, value: 4 },
      { name: "Occupied", value: 1 },
      // No blocks: read as its position.
      { name: "Standby", value: 2 },
    ]);
  });

  it("reads Off as 0 when the record has no default", () => {
    expect(readNodeSchedule(buildingHours()).names[0]).toEqual({ name: OFF, value: 0 });
  });

  it("reads the week Monday first, end inclusive, earliest start winning an overlap", () => {
    const doc = readNodeSchedule(
      buildingHours({
        weekly: {
          w2: { name: "Occupied", days: ["monday"], start: "07:00", end: "17:59", value: 1 },
          w1: { name: "Standby", days: ["monday"], start: "06:30", end: "07:29", value: 2 },
          off: { name: "Occupied", days: ["sunday"], start: "01:00", end: "02:00", enable: false },
        },
      }),
    );
    expect(doc.week[0]).toEqual([
      { start: 390, end: 449, name: "Standby" },
      { start: 450, end: 1079, name: "Occupied" },
    ]);
    expect(doc.week[6]).toEqual([]);
  });

  it("keeps a box's own dated entries (no kind) and writes them back as they were", () => {
    const own = dated("2026-11-10T06:30", "2026-11-10T10:00", { label: "Late start" });
    delete own.kind;
    const doc = readNodeSchedule(buildingHours({ exception: { box1: own } }));
    expect(doc.dated.map(({ id: _, ...e }) => e)).toEqual([
      {
        kind: "closed",
        label: "Late start",
        date: "2026-11-10",
        start: 390,
        end: 599,
        kept: { map: "exception", key: "box1" },
        windows: [{ start: "2026-11-10T06:30", end: "2026-11-10T10:00" }],
      },
    ]);
    expect(writeNodeSchedule(doc).schedule.schedules.exception).toEqual({ box1: own });
  });
});

describe("writeNodeSchedule", () => {
  it("sends the rev it read, Off's value as default_payload, and the real names only", () => {
    const record = writeNodeSchedule(readNodeSchedule(buildingHours({}, { rev: 7, default_payload: 0 })));
    expect(record.rev).toBe(7);
    expect(record.default_payload).toBe(0);
    expect(record.schedule.config).toEqual({ names: ["Occupied", "Standby"], default_name: "Occupied" });
    expect(record.schedule.schedules.weekly).toEqual({
      w1: {
        name: "Occupied",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        start: "08:00",
        end: "17:59",
        value: 1,
      },
    });
  });

  it("rewrites the value on every block of a name when the name's value changes", () => {
    let doc = readNodeSchedule(buildingHours());
    doc = paintWeek(doc, [5], 480, 720, "Occupied");
    doc = setNameValue(doc, 1, 5);
    const weekly = Object.values(writeNodeSchedule(doc).schedule.schedules.weekly ?? {});
    expect(weekly).toHaveLength(2);
    expect(weekly.every((w) => w.value === 5)).toBe(true);
  });

  it("writes a block until 00:00 as 23:59", () => {
    let doc = readNodeSchedule(buildingHours({ weekly: {} }));
    doc = paintWeek(doc, [0], 1080, 1440, "Standby");
    expect(writeNodeSchedule(doc).schedule.schedules.weekly?.w1).toMatchObject({
      start: "18:00",
      end: "23:59",
      name: "Standby",
      value: 2,
    });
  });

  it("keeps disabled weekly entries and drops the legacy top-level fields", () => {
    const source = buildingHours({
      weekly: { off: { name: "Occupied", days: ["sunday"], start: "01:00", end: "02:00", enable: false } },
    });
    const record = writeNodeSchedule(
      readNodeSchedule({ ...source, weekly: [], exceptions: [] } as unknown as typeof source),
    ) as unknown as Record<string, unknown> & typeof source;
    expect(record.weekly).toBeUndefined();
    expect(record.exceptions).toBeUndefined();
    expect(record.schedule.schedules.weekly?.off).toMatchObject({ enable: false });
  });

  it("a save with no edit changes nothing, however often: a disabled entry's value is not read", () => {
    const first = buildingHours({
      weekly: {
        w1: { name: "Occupied", days: ["monday"], start: "08:00", end: "17:59", value: 1 },
        w2: { name: "Occupied", days: ["sunday"], start: "01:00", end: "02:00", value: 9, enable: false },
      },
    });
    const once = writeNodeSchedule(readNodeSchedule(first));
    const twice = writeNodeSchedule(readNodeSchedule(once));
    expect(readNodeSchedule(first).names[1]).toEqual({ name: "Occupied", value: 1 });
    // The disabled entry keeps its key; the new block takes the next free one.
    expect(Object.keys(once.schedule.schedules.weekly ?? {}).sort()).toEqual(["w1", "w2"]);
    expect(once.schedule.schedules.weekly?.w1).toMatchObject({ value: 1, start: "08:00" });
    expect(twice.schedule).toEqual(once.schedule);
  });

  it("new blocks skip the key a disabled entry holds", () => {
    const record = buildingHours({
      weekly: {
        w1: { name: "Occupied", days: ["monday"], start: "08:00", end: "17:59", value: 1, enable: false },
        w9: { name: "Standby", days: ["monday"], start: "18:00", end: "18:59", value: 2 },
      },
    });
    const weekly = writeNodeSchedule(readNodeSchedule(record)).schedule.schedules.weekly ?? {};
    expect(weekly.w1).toEqual(record.schedule.schedules.weekly?.w1);
    expect(weekly.w2).toMatchObject({ name: "Standby", start: "18:00" });
  });

  it("removing a name turns its blocks Off", () => {
    let doc = readNodeSchedule(buildingHours());
    doc = paintWeek(doc, [0], 0, 60, "Standby");
    doc = removeName(doc, 2);
    expect(doc.names.map((n) => n.name)).toEqual([OFF, "Occupied"]);
    expect(doc.week[0].some((s) => s.name === "Standby")).toBe(false);
  });
});
