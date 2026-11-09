// nowAndNext in the schedule's own zone: the running name, until when, and the next change of name.

import { describe, expect, it } from "vitest";

import { paintWeek } from "./editNodeSchedule";
import { nameColour } from "./nameColour";
import { nowAndNext } from "./nowAndNext";
import { readNodeSchedule } from "./readNodeSchedule";
import { buildingHours, dated } from "./scheduleRecord.fixtures";
import { BackendNeedsUpgrade, ChangedElsewhere, toSaveError, Unreadable } from "./saveErrors";

// Fri 6 Nov 2026, 14:20 in Sydney (UTC+11).
const FRI_1420 = Date.parse("2026-11-06T14:20:00+11:00");

describe("nowAndNext", () => {
  it("names what runs now, until when, and the next change, in the schedule's zone", () => {
    let doc = readNodeSchedule(buildingHours());
    doc = paintWeek(doc, [4], 1080, 1170, "Standby");
    const r = nowAndNext(doc, FRI_1420);
    expect(r.at).toEqual({ date: "2026-11-06", minute: 860 });
    expect(r.now).toMatchObject({ name: "Occupied", value: 1, until: { date: "2026-11-06", minute: 1080 } });
    expect(r.next).toMatchObject({
      name: "Standby",
      value: 2,
      from: { date: "2026-11-06", minute: 1080 },
      until: { date: "2026-11-06", minute: 1170 },
    });
  });

  it("runs a block stored until 23:59 to midnight, then the next day", () => {
    let doc = readNodeSchedule(buildingHours());
    doc = paintWeek(doc, [4], 1080, 1440, "Standby");
    const r = nowAndNext(doc, Date.parse("2026-11-06T20:00:00+11:00"));
    expect(r.now).toMatchObject({ name: "Standby", until: { date: "2026-11-07", minute: 0 } });
    // Saturday is off, Monday opens at 08:00.
    expect(r.next).toMatchObject({ name: "Off", until: { date: "2026-11-09", minute: 480 } });
  });

  it("says a closure is why it is Off", () => {
    const doc = readNodeSchedule(
      buildingHours({ exception: { x: dated("2026-11-06T00:00", "2026-11-07T00:00", { kind: "closed", label: "Testing" }) } }),
    );
    const r = nowAndNext(doc, FRI_1420);
    expect(r.now.name).toBe("Off");
    expect(r.now.closed?.label).toBe("Testing");
    expect(r.next?.from).toEqual({ date: "2026-11-09", minute: 480 });
  });

  it("reads Off with no next change while switched off", () => {
    const r = nowAndNext(readNodeSchedule(buildingHours({}, { enabled: false, default_payload: 0 })), FRI_1420);
    expect(r).toMatchObject({ enabled: false, now: { name: "Off", value: 0, until: null }, next: null });
  });
});

describe("nameColour", () => {
  it("maps positions to the chart tokens, the default to none", () => {
    expect([0, 1, 2, 3, 4, 5, 6].map((i) => nameColour(i).token)).toEqual([
      null,
      "--chart-8",
      "--chart-7",
      "--chart-2",
      "--chart-1",
      "--chart-5",
      "--chart-5",
    ]);
    expect(nameColour(1).text).toBe("text-on-solid");
  });
});

describe("toSaveError", () => {
  it("types lb's refusals and saveSchedule's words", () => {
    expect(toSaveError(new Error("bad input: schedule_stale: schedule `x` changed elsewhere, reload"))).toBeInstanceOf(
      ChangedElsewhere,
    );
    expect(toSaveError(new Error("Someone else changed this schedule after you opened it."))).toBeInstanceOf(
      ChangedElsewhere,
    );
    expect(toSaveError(new Error("Backend needs upgrading: schedules can't be changed on this node yet."))).toBeInstanceOf(
      BackendNeedsUpgrade,
    );
    expect(toSaveError(new Error("bad input: schedule_old_shape: schedule `x` is in the old shape"))).toBeInstanceOf(
      Unreadable,
    );
    const other = toSaveError(new Error("schedule `x`: value 9 is outside 0..=3"));
    expect(other.constructor).toBe(Error);
  });
});
