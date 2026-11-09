// The node schedule editor's behaviour through its props: paint a block, the day sheet's inclusive end,
// a name's value rewriting its blocks, the conflict flow (keep the draft, reload, reapply), the save
// payload, and the upgrade and unreadable states. The real model and helpers run; only the page's
// callbacks are stand-ins.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";

import { paintWeek } from "../lib/schedule/editNodeSchedule";
import type { NodeSchedule } from "../lib/schedule/nodeSchedule";
import { readNodeSchedule } from "../lib/schedule/readNodeSchedule";
import { buildingHours, hours } from "../lib/schedule/scheduleRecord.fixtures";
import { writeNodeSchedule } from "../lib/schedule/writeNodeSchedule";

import { NodeScheduleEditor } from "./node-schedule-editor";

// Fri 6 Nov 2026, 14:20 in Sydney.
const NOW = Date.parse("2026-11-06T14:20:00+11:00");

/** A pointer event that carries coordinates (jsdom's PointerEvent drops them). */
function pointer(el: Element, type: string, x: number) {
  const e = new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, button: 0 });
  Object.defineProperty(e, "type", { value: type });
  fireEvent(el, e);
}

/** Every row is 1440px wide from x = 0, so a pointer's x is its minute. */
beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    left: 0,
    top: 0,
    width: 1440,
    height: 30,
    right: 1440,
    bottom: 30,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
});
afterEach(() => vi.restoreAllMocks());

function mount(props: Partial<Parameters<typeof NodeScheduleEditor>[0]> = {}) {
  const onSave = vi.fn(async (doc: NodeSchedule) => ({ rev: doc.rev + 1 }));
  const utils = render(
    <NodeScheduleEditor schedule={readNodeSchedule(buildingHours())} now={NOW} onSave={onSave} {...props} />,
  );
  const editor = () => within(screen.getByTestId("node-schedule-editor"));
  return { ...utils, onSave, editor };
}

const saved = (onSave: ReturnType<typeof vi.fn>): NodeSchedule => onSave.mock.calls.at(-1)?.[0];

describe("NodeScheduleEditor", () => {
  it("shows what runs now and the next change in the schedule's zone", () => {
    mount();
    const card = screen.getByLabelText("Now");
    expect(within(card).getByText("Now · Fri 6 Nov, 14:20")).toBeTruthy();
    expect(within(card).getByText("until 18:00 today")).toBeTruthy();
    expect(within(card).getByText("from 18:00 today until 08:00 Mon 9 Nov")).toBeTruthy();
  });

  it("paints a block by dragging and saves it with the rev it was read at", async () => {
    const { onSave, editor } = mount();
    const sat = screen.getByTestId("week-row-5");
    pointer(sat, "pointerdown", 480);
    pointer(sat, "pointermove", 720);
    pointer(sat, "pointerup", 720);
    expect(editor().getByText("Changed: Sat")).toBeTruthy();
    fireEvent.click(editor().getByRole("button", { name: "Save" }));
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    const record = writeNodeSchedule(saved(onSave));
    expect(record.rev).toBe(1);
    expect(record.schedule.schedules.weekly?.w2).toEqual({
      name: "Occupied",
      days: ["saturday"],
      start: "08:00",
      end: "11:59",
      value: 1,
    });
    await waitFor(() => expect(editor().getByRole("status").textContent).toContain("Saved"));
  });

  it("opens the day sheet on a click, shows Until as the stop time and stores it inclusive", async () => {
    const { onSave, editor } = mount();
    const mon = screen.getByTestId("week-row-0");
    pointer(mon, "pointerdown", 600);
    pointer(mon, "pointerup", 600);
    const until = await screen.findByLabelText("Block 1 until");
    expect((until as HTMLInputElement).value).toBe("18:00");
    fireEvent.change(until, { target: { value: "00:00" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Close" })[0]);
    fireEvent.click(await editor().findByRole("button", { name: "Save" }));
    await waitFor(() => expect(onSave).toHaveBeenCalled());
    expect(saved(onSave).week[0]).toEqual([{ start: 480, end: 1439, name: "Occupied" }]);
  });

  it("labels a block that runs all day 00:00–24:00, in the grid and its tooltip", () => {
    const allDay = readNodeSchedule(buildingHours({ weekly: hours("00:00", "23:59", ["sunday"]) }));
    mount({ schedule: allDay });
    const sun = screen.getByTestId("week-row-6");
    expect(within(sun).getByText("00:00–24:00")).toBeTruthy();
    pointer(sun, "pointermove", 600);
    expect(within(sun).getByRole("tooltip").textContent).toContain("00:00 until 24:00");
  });

  it("rewrites the value on every block of a name", async () => {
    const { onSave, editor } = mount();
    fireEvent.click(editor().getByRole("button", { name: /Names 3\/6/ }));
    const value = await screen.findByLabelText("Occupied value");
    fireEvent.change(value, { target: { value: "5" } });
    fireEvent.blur(value);
    expect(editor().getByText("Changed: names")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Done" }));
    fireEvent.click(await editor().findByRole("button", { name: "Save" }));
    await waitFor(() => expect(onSave).toHaveBeenCalled());
    const weekly = Object.values(writeNodeSchedule(saved(onSave)).schedule.schedules.weekly ?? {});
    expect(weekly.map((w) => w.value)).toEqual([5]);
  });

  it("keeps the draft when the save is refused as stale, then reloads and reapplies it", async () => {
    const theirs = { ...paintWeek(readNodeSchedule(buildingHours()), [6], 600, 660, "Standby"), rev: 2 };
    const onSave = vi
      .fn()
      .mockRejectedValueOnce(new Error("bad input: schedule_stale: schedule `building-hours` changed elsewhere, reload"))
      .mockResolvedValueOnce({ rev: 3 });
    const onReload = vi.fn(async () => theirs);
    const { editor } = mount({ onSave, onReload });
    const sat = screen.getByTestId("week-row-5");
    pointer(sat, "pointerdown", 480);
    pointer(sat, "pointermove", 720);
    pointer(sat, "pointerup", 720);
    fireEvent.click(editor().getByRole("button", { name: "Save" }));

    expect(await editor().findByText("Not saved: changed elsewhere")).toBeTruthy();
    expect(editor().getByText("Changed: Sat")).toBeTruthy();
    fireEvent.click(editor().getByRole("button", { name: "Reload, keep my edit" }));
    expect(await editor().findByText("Loaded the latest version")).toBeTruthy();
    expect(editor().getByText(/applied on top of it: Sat\./)).toBeTruthy();

    fireEvent.click(editor().getByRole("button", { name: "Save" }));
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(2));
    const doc: NodeSchedule = onSave.mock.calls[1][0];
    expect(doc.rev).toBe(2);
    expect(doc.week[5]).toEqual([{ start: 480, end: 719, name: "Occupied" }]);
    expect(doc.week[6]).toEqual([{ start: 600, end: 659, name: "Standby" }]);
  });

  it("keeps Save off with the reason when the backend needs upgrading", () => {
    const { editor } = mount({ backendNeedsUpgrade: true });
    pointer(screen.getByTestId("week-row-5"), "pointerdown", 480);
    pointer(screen.getByTestId("week-row-5"), "pointermove", 540);
    pointer(screen.getByTestId("week-row-5"), "pointerup", 540);
    expect(editor().getByText("This node's backend needs upgrading")).toBeTruthy();
    expect(editor().getByText(/Can't save until the node is upgraded/)).toBeTruthy();
    expect((editor().getByRole("button", { name: "Can't save" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("adds a dated entry from a quick pick", async () => {
    const { editor } = mount();
    fireEvent.click(editor().getByRole("tab", { name: "Dated entries (0)" }));
    fireEvent.click(editor().getByRole("button", { name: "Add dated entry" }));
    fireEvent.click(await screen.findByRole("button", { name: "Late start" }));
    expect((screen.getByLabelText("Label") as HTMLInputElement).value).toBe("Late start");
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(await editor().findByText("Only 10:00 until 18:00 · Occupied = 1")).toBeTruthy();
    expect(editor().getByRole("tab", { name: "Dated entries (1)" })).toBeTruthy();
  });

  it("offers Recreate with the same id for a schedule that can't be read", () => {
    const onRecreate = vi.fn();
    render(<NodeScheduleEditor schedule={null} unreadable={{ id: "old-one", name: "Old one" }} onRecreate={onRecreate} />);
    expect(screen.getByText("This schedule can't be read")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Recreate schedule" }));
    expect(onRecreate).toHaveBeenCalledWith("old-one", "Old one");
  });

  it("shows a skeleton while loading", () => {
    render(<NodeScheduleEditor schedule={null} />);
    expect(screen.getByLabelText("Loading schedule")).toBeTruthy();
  });
});
