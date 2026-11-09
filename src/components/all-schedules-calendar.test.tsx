// The all-schedules calendar: a week row per schedule with what runs now, closures labelled, a shared
// holiday listed once with every schedule that has it, chips that hide a schedule, the month view.

import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

import { readNodeSchedule } from "../lib/schedule/readNodeSchedule";
import { buildingHours, dated } from "../lib/schedule/scheduleRecord.fixtures";

import { AllSchedulesCalendar } from "./all-schedules-calendar";

// Fri 6 Nov 2026, 14:20 in Sydney (the viewer's zone in tests may differ; dates here are mid-day).
const NOW = Date.parse("2026-11-06T03:20:00Z");
const cup = { h1: dated("2026-11-03T00:00", "2026-11-04T00:00", { kind: "holiday", label: "Melbourne Cup" }) };
const office = readNodeSchedule(buildingHours({ exception: cup }, { id: "office", name: "Office hours" }));
const retail = readNodeSchedule(buildingHours({ exception: cup }, { id: "retail", name: "Retail hours" }));

describe("AllSchedulesCalendar", () => {
  it("draws a row per schedule and lists a shared holiday once with both schedules", () => {
    const onOpen = vi.fn();
    render(<AllSchedulesCalendar schedules={[office, retail]} now={NOW} onOpen={onOpen} />);
    const table = screen.getByRole("table", { name: "Schedules this week" });
    expect(within(table).getAllByText("Now: Occupied = 1")).toHaveLength(2);
    expect(within(table).getAllByText("Melbourne Cup")).toHaveLength(2);
    const list = screen.getByRole("list", { name: "Dated entries in this period" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(1);
    expect(within(list).getByText("Office hours")).toBeTruthy();
    expect(within(list).getByText("Retail hours")).toBeTruthy();
    fireEvent.click(within(table).getByRole("button", { name: "Retail hours" }));
    expect(onOpen).toHaveBeenCalledWith("retail");
  });

  it("hides a schedule when its chip is turned off", () => {
    render(<AllSchedulesCalendar schedules={[office, retail]} now={NOW} />);
    fireEvent.click(screen.getByRole("button", { name: "Retail hours", pressed: true }));
    const table = screen.getByRole("table", { name: "Schedules this week" });
    expect(within(table).queryByText("Retail hours")).toBeNull();
  });

  it("shows the month's dated entries on their days", () => {
    render(<AllSchedulesCalendar schedules={[office, retail]} now={NOW} />);
    fireEvent.click(screen.getByRole("tab", { name: "Month" }));
    const grid = screen.getByRole("grid", { name: "Dated entries this month" });
    expect(within(grid).getByText("Melbourne Cup · 2")).toBeTruthy();
    expect(screen.getByText("Dated entries in November")).toBeTruthy();
  });
});
