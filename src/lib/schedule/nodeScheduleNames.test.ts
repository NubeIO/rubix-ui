// Renaming and removing names where lb checks them all: disabled weekly entries and a box's own dated
// entries, which the editor writes back as read, and the stored `default_name`.

import { describe, expect, it } from "vitest";

import { removeBlocker, removeName, renameName } from "./editNodeSchedule";
import { OFF } from "./nodeSchedule";
import { readNodeSchedule } from "./readNodeSchedule";
import { buildingHours, dated, WEEKDAYS } from "./scheduleRecord.fixtures";
import type { ScheduleRecord } from "./scheduleRecord";
import { writeNodeSchedule } from "./writeNodeSchedule";

/** Building Hours with Standby used only where the editor does not draw it. */
function withHiddenStandby(): ScheduleRecord {
  const own = dated("2026-11-10T06:30", "2026-11-10T10:00", { name: "Standby", label: "Box's own" });
  delete own.kind;
  return buildingHours({
    weekly: {
      w1: { name: "Occupied", days: WEEKDAYS, start: "08:00", end: "17:59", value: 1 },
      w2: { name: "Standby", days: ["sunday"], start: "01:00", end: "02:00", value: 2, enable: false },
    },
    events: { box1: own },
  });
}

/** Every entry name lb would check against `config.names`. */
function unknownNames(record: ScheduleRecord): string[] {
  const names = record.schedule.config?.names ?? [];
  const s = record.schedule.schedules;
  return [...Object.values(s.weekly ?? {}), ...Object.values(s.events ?? {}), ...Object.values(s.exception ?? {})]
    .map((e) => e.name ?? "")
    .filter((n) => !names.includes(n));
}

describe("renameName", () => {
  it("renames disabled weekly entries and a box's own dated entries too", () => {
    const doc = renameName(readNodeSchedule(withHiddenStandby()), 2, "Cleaning");
    const record = writeNodeSchedule(doc);
    expect(unknownNames(record)).toEqual([]);
    expect(record.schedule.schedules.weekly?.w2).toMatchObject({ name: "Cleaning", enable: false });
    expect(record.schedule.schedules.events?.box1).toMatchObject({ name: "Cleaning", label: "Box's own" });
    expect(doc.dated[0].name).toBe("Cleaning");
  });
});

describe("removeName", () => {
  it("refuses a name a box's own entry or a disabled entry still uses, and says why", () => {
    const doc = readNodeSchedule(withHiddenStandby());
    expect(removeName(doc, 2)).toBe(doc);
    expect(removeBlocker(doc, 2)).toBe(
      "Standby can't be removed: a box's own dated entry and a switched-off weekly entry still use it.",
    );
    expect(removeBlocker(readNodeSchedule(buildingHours()), 2)).toBeNull();
  });
});

describe("default_name", () => {
  const record = buildingHours(
    {},
    {
      schedule: {
        config: { names: ["Occupied", "Standby", "Cleaning"], default_name: "Standby" },
        schedules: { weekly: { w1: { name: "Occupied", days: WEEKDAYS, start: "08:00", end: "17:59", value: 1 } } },
      },
    },
  );

  it("is written back as stored while it is a name, and dated entries run it", () => {
    let doc = readNodeSchedule(record);
    doc = { ...doc, dated: [{ id: "c1", kind: "extra", label: "Late", date: "2026-11-10", start: 1080, end: 1199 }] };
    const out = writeNodeSchedule(doc);
    expect(out.schedule.config?.default_name).toBe("Standby");
    expect(out.schedule.schedules.events?.["c1-e"]).toMatchObject({ name: "Standby" });
  });

  it("follows a rename, and falls back to the first name when removed", () => {
    const doc = readNodeSchedule(record);
    expect(writeNodeSchedule(renameName(doc, 2, "Night")).schedule.config?.default_name).toBe("Night");
    const removed = removeName(doc, 2);
    expect(removed.names.map((n) => n.name)).toEqual([OFF, "Occupied", "Cleaning"]);
    expect(writeNodeSchedule(removed).schedule.config?.default_name).toBe("Occupied");
  });

  it("falls back to the first name when the stored one is not a name", () => {
    const odd = { ...record, schedule: { ...record.schedule, config: { names: ["Occupied"], default_name: "Gone" } } };
    expect(writeNodeSchedule(readNodeSchedule(odd)).schedule.config?.default_name).toBe("Occupied");
  });
});
