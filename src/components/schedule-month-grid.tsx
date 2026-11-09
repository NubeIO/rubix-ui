// A month of dated entries on their days, one chip per entry with a dot for each schedule that has it
// (a holiday several schedules share shows once; past `MAX_DOTS` the count after the label says how many). Closures and holidays are hatched, extra hours have a
// dashed edge, changed hours a solid one. Days outside the month are dimmed; today is in the accent.
//
// Plain data in: the app works out each day's chips.
//
// One responsibility: draw the month grid.

import { cn } from "../lib/cn";

import { scheduleColourClass } from "../lib/colour/scheduleColour";
import type { ScheduleMonthDay } from "./schedule-calendar-types";
import { namesText } from "./schedule-calendar-words";
import { DAY_NAMES } from "./schedule-calendar-words";
import { HATCH, KINDS, noteText } from "./schedule-kinds";

export interface ScheduleMonthGridProps {
  /** Every day the grid shows, Monday first, whole weeks. */
  days: ScheduleMonthDay[];
  /** `YYYY-MM` of the month; other days are dimmed. */
  month: string;
  today: string;
}

const MAX_CHIPS = 3;
/** Dots on one chip; a holiday shared by hundreds of schedules still fits its day. */
const MAX_DOTS = 3;

export function ScheduleMonthGrid({ days, month, today }: ScheduleMonthGridProps) {
  return (
    <div
      role="grid"
      aria-label="Closures & holidays this month"
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
      {days.map(({ date, chips }, i) => {
        const inMonth = date.startsWith(month);
        return (
          <div
            key={date}
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
                date === today ? "font-bold text-accent" : inMonth ? "text-ink" : "text-ink-faint",
              )}
            >
              {Number(date.slice(8))}
            </span>
            {chips.slice(0, MAX_CHIPS).map((c) => {
              const off = c.kind === "closed" || c.kind === "holiday";
              return (
                <span
                  key={`${c.kind}|${c.label}`}
                  title={`${KINDS[c.kind].label}: ${c.label} · ${namesText(c.schedules)}`}
                  className={cn(
                    "flex min-w-0 items-center gap-1 rounded-sm border px-1.5 py-0.5 text-caption text-ink-strong",
                    off ? "border-line-strong" : "bg-surface-raised",
                    c.kind === "extra" && "border-dashed border-ink-strong",
                    c.kind === "changed" && "border-ink-strong/50",
                  )}
                  style={off ? HATCH : undefined}
                >
                  {c.schedules.slice(0, MAX_DOTS).map((s) => (
                    <span
                      key={s.id}
                      aria-hidden
                      className={cn("size-1.5 flex-none rounded-full", scheduleColourClass(s.colour))}
                    />
                  ))}
                  <span className="min-w-0 truncate">{noteText(c)}</span>
                  {/* Outside the label, so a long label never hides how many schedules share it. */}
                  {c.schedules.length > 1 && (
                    <span className="flex-none tabular-nums">· {c.schedules.length.toLocaleString()}</span>
                  )}
                </span>
              );
            })}
            {chips.length > MAX_CHIPS && (
              <span className="text-caption text-ink-faint">+{chips.length - MAX_CHIPS} more</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
