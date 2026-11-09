// The all-schedules calendar's month: the dated entries on their days, one chip per entry with a dot
// for each schedule that has it (a holiday several schedules share shows once). Closures and holidays
// are hatched, extra hours have a dashed edge, changed hours a solid one. Days outside the month are
// dimmed; today is in the accent.
//
// One responsibility: draw the month grid.

import { cn } from "../lib/cn";

import { scheduleColourClass } from "../lib/schedule/scheduleColour";
import type { NodeSchedule } from "../lib/schedule/nodeSchedule";

import { HATCH, KINDS } from "./node-schedule-editor-dated-kinds";
import { DAY_NAMES } from "./node-schedule-editor-words";
import { entriesOn, type DayTable } from "./all-schedules-calendar-entries";

interface Props {
  schedules: NodeSchedule[];
  /** Every day the grid shows, Monday first, whole weeks. */
  days: string[];
  /** `YYYY-MM` of the month. */
  month: string;
  table: DayTable;
  today: string;
}

const MAX_CHIPS = 3;

export function CalendarMonth({ schedules, days, month, table, today }: Props) {
  return (
    <div
      role="grid"
      aria-label="Dated entries this month"
      className="grid grid-cols-7 overflow-hidden rounded-lg border border-line"
    >
      {DAY_NAMES.map((d) => (
        <span
          key={d}
          className="border-b border-line bg-surface-raised px-2 py-1.5 text-caption font-semibold text-ink-muted"
        >
          {d}
        </span>
      ))}
      {days.map((d, i) => {
        const entries = entriesOn(schedules, table, d);
        const inMonth = d.startsWith(month);
        return (
          <div
            key={d}
            role="gridcell"
            className={cn(
              "grid min-h-24 content-start gap-1 p-1.5",
              i >= 7 && "border-t border-line",
              i % 7 && "border-l border-line",
              !inMonth && "bg-surface-raised/40",
            )}
          >
            <span
              className={cn(
                "text-xs",
                d === today ? "font-bold text-accent" : inMonth ? "text-ink" : "text-ink-faint",
              )}
            >
              {Number(d.slice(8))}
            </span>
            {entries.slice(0, MAX_CHIPS).map(({ item, schedules: who }) => {
              const off = item.kind === "closed" || item.kind === "holiday";
              return (
                <span
                  key={`${item.kind}|${item.label}`}
                  title={`${KINDS[item.kind].label}: ${item.label} · ${who.map((s) => s.name).join(", ")}`}
                  className={cn(
                    "flex min-w-0 items-center gap-1 rounded-sm border px-1.5 py-0.5 text-caption text-ink-strong",
                    off ? "border-line-strong" : "bg-surface-raised",
                    item.kind === "extra" && "border-dashed border-ink-strong",
                    item.kind === "changed" && "border-ink-strong/50",
                  )}
                  style={off ? HATCH : undefined}
                >
                  {who.map((s) => (
                    <span
                      key={s.id}
                      aria-hidden
                      className={cn("size-1.5 flex-none rounded-full", scheduleColourClass(s.color))}
                    />
                  ))}
                  <span className="truncate">
                    {item.label || KINDS[item.kind].label}
                    {who.length > 1 ? ` · ${who.length}` : ""}
                  </span>
                </span>
              );
            })}
            {entries.length > MAX_CHIPS && (
              <span className="text-caption text-ink-faint">+{entries.length - MAX_CHIPS} more</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
