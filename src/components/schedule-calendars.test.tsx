// The schedule calendar primitives, fed plain resolved data: the week calendar's blocks, closed day,
// now line and controls; the week rows' status, labels and ring; the month's shared chip; the frame's
// chips, short month words and the dated list's columns; the week strip.

import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";

import type { ScheduleDay, ScheduleRef } from "./schedule-calendar-types";
import { ScheduleWeekCalendar } from "./schedule-week-calendar";
import { ScheduleWeekRows } from "./schedule-week-rows";
import { ScheduleMonthGrid } from "./schedule-month-grid";
import { AllSchedulesView } from "./all-schedules-view";
import { WeekStrip } from "./week-strip";

const DATES = ["2026-11-02", "2026-11-03", "2026-11-04", "2026-11-05", "2026-11-06", "2026-11-07", "2026-11-08"];
const cup = { kind: "holiday" as const, label: "Melbourne Cup" };
const occupied = { start: 480, end: 1079, nameIndex: 1, name: "Occupied" };
const week: ScheduleDay[] = DATES.map((date) =>
  date === "2026-11-03"
    ? { date, spans: [], closed: cup, entries: [cup] }
    : { date, spans: date < "2026-11-07" ? [occupied] : [] },
);
const NOW = { date: "2026-11-06", minute: 860 };
const office: ScheduleRef = { id: "office", name: "Office hours", colour: "chart-2" };
const retail: ScheduleRef = { id: "retail", name: "Retail hours" };

describe("ScheduleWeekCalendar", () => {
  it("draws blocks, the closed day, now and the running block, and moves the week", () => {
    const onPrev = vi.fn();
    render(
      <ScheduleWeekCalendar
        days={week}
        now={NOW}
        onPrev={onPrev}
        onNext={() => {}}
        onToday={() => {}}
        atToday
        legend={[{ nameIndex: 1, label: "Occupied" }]}
      />,
    );
    expect(screen.getByText("2 Nov – 8 Nov 2026")).toBeTruthy();
    expect(within(screen.getByTestId("cal-2026-11-03")).getByText("Melbourne Cup")).toBeTruthy();
    const fri = screen.getByTestId("cal-2026-11-06");
    expect(within(fri).getByLabelText("Now")).toBeTruthy();
    expect(fri.querySelector("[data-running]")?.textContent).toBe("Occupied08:00–18:00");
    expect(screen.getByTestId("cal-2026-11-05").querySelector("[data-running]")).toBeNull();
    expect((screen.getByRole("button", { name: "Today" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Previous week" }));
    expect(onPrev).toHaveBeenCalled();
  });
});

describe("ScheduleWeekRows", () => {
  it("draws a row per schedule with its status, labels and the running block", () => {
    const onOpen = vi.fn();
    const rows = [office, retail].map((s) => ({ ...s, status: "Now: Occupied = 1", now: NOW, days: week }));
    render(<ScheduleWeekRows dates={DATES} rows={rows} today="2026-11-06" onOpen={onOpen} />);
    const table = screen.getByRole("table", { name: "Schedules this week" });
    expect(within(table).getAllByText("Now: Occupied = 1")).toHaveLength(2);
    expect(within(table).getAllByText("Melbourne Cup")).toHaveLength(2);
    expect(table.querySelectorAll("[data-running]")).toHaveLength(2);
    fireEvent.click(within(table).getByRole("button", { name: "Retail hours" }));
    expect(onOpen).toHaveBeenCalledWith("retail");
  });
});

describe("ScheduleMonthGrid", () => {
  it("shows a shared entry once with its count", () => {
    const days = DATES.map((date) => ({
      date,
      chips: date === "2026-11-03" ? [{ ...cup, schedules: [office, retail] }] : [],
    }));
    render(<ScheduleMonthGrid days={days} month="2026-11" today="2026-11-06" />);
    const grid = screen.getByRole("grid", { name: "Dated entries this month" });
    expect(within(grid).getByText("Melbourne Cup · 2")).toBeTruthy();
  });
});

describe("AllSchedulesView", () => {
  const base = {
    onViewChange: () => {},
    onPrev: () => {},
    onNext: () => {},
    onToday: () => {},
    atToday: true,
    schedules: [office, retail],
    hidden: ["retail"],
    legend: [{ nameIndex: 1, label: "1st name", detail: "Occupied" }],
    entries: [{ ...cup, date: "2026-11-03", schedules: [office, retail] }],
    today: "2026-11-06",
  };

  it("toggles a schedule by its chip and lists an entry as date, label, schedules, kind", () => {
    const onToggle = vi.fn();
    render(
      <AllSchedulesView {...base} view="week" start="2026-11-02" onToggle={onToggle}>
        body
      </AllSchedulesView>,
    );
    expect(screen.getByRole("button", { name: "Retail hours", pressed: false })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Office hours", pressed: true }));
    expect(onToggle).toHaveBeenCalledWith("office");
    expect(screen.getByText("Dated entries this week")).toBeTruthy();
    const row = within(screen.getByRole("list", { name: "Dated entries in this period" })).getByRole("listitem");
    expect([...row.children].map((c) => c.textContent)).toEqual([
      "Tue 3 Nov",
      "Melbourne Cup",
      "Office hoursRetail hours",
      "Holiday",
    ]);
  });

  it("names the month short", () => {
    render(
      <AllSchedulesView {...base} view="month" start="2026-11-01" onToggle={() => {}}>
        body
      </AllSchedulesView>,
    );
    expect(screen.getByText("Nov 2026")).toBeTruthy();
    expect(screen.getByText("Dated entries in Nov")).toBeTruthy();
  });
});

describe("WeekStrip", () => {
  it("draws a row per day and a segment per stretch", () => {
    const { container } = render(<WeekStrip week={[[{ start: 0, end: 719, nameIndex: 1 }], [], [], [], [], [], []]} />);
    const rows = container.firstElementChild!.children;
    expect(rows).toHaveLength(7);
    expect((rows[0].firstElementChild as HTMLElement).style.width).toBe("50%");
  });
});
