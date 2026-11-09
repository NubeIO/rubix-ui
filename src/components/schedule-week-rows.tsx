// Every schedule's week at once: one row per schedule, a 24-hour bar per day with blocks in their name's
// colour. A closed or holiday day is hatched with its label under the bar; extra hours have a dashed
// edge, changed hours an outline; the block running now is ringed and now is a red line on that
// schedule's today. The row label says what runs now ("Now: Occupied = 1").
//
// Plain data in, events out: the app resolves each schedule's days into `rows`.
//
// One responsibility: draw the week rows.

import { cn } from "../lib/cn";

import { nameColour } from "../lib/colour/nameColour";
import { scheduleColourClass } from "../lib/colour/scheduleColour";
import type { ScheduleWeekRow } from "./schedule-calendar-types";
import { columnText, spanText } from "./schedule-calendar-words";
import { HATCH, KINDS, noteText } from "./schedule-kinds";

export interface ScheduleWeekRowsProps {
  /** The seven dates, Monday first, for the column heads. */
  dates: string[];
  rows: ScheduleWeekRow[];
  /** Today in the viewer's zone, for the column heads. */
  today: string;
  /** Open a schedule: its name becomes a button. */
  onOpen?: (id: string) => void;
}

const pct = (m: number) => `${(m / 1440) * 100}%`;

export function ScheduleWeekRows({ dates, rows, today, onOpen }: ScheduleWeekRowsProps) {
  return (
    <div
      role="table"
      aria-label="Schedules this week"
      className="grid grid-cols-[minmax(9rem,13rem)_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line"
    >
      <span className="border-b border-line bg-surface-raised" />
      {dates.map((d, i) => (
        <div
          key={d}
          className={cn(
            "grid gap-0.5 border-b border-l border-line px-2 py-1.5",
            d === today ? "bg-accent/8" : "bg-surface-raised",
          )}
        >
          <span className={cn("truncate text-xs font-semibold", d === today ? "text-accent" : "text-ink")}>
            {columnText(d, i === 0)}
          </span>
          <span className="flex justify-between font-mono text-caption text-ink-faint">
            <span>00</span>
            <span>12</span>
            <span>24</span>
          </span>
        </div>
      ))}
      {rows.map((s) => (
        <div key={s.id} role="row" className="contents">
          <div className="grid content-center gap-0.5 border-b border-line px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-2">
              <span aria-hidden className={cn("size-2 flex-none rounded-full", scheduleColourClass(s.colour))} />
              {onOpen ? (
                <button
                  type="button"
                  className="truncate text-left text-xs font-semibold text-ink-strong hover:text-accent"
                  onClick={() => onOpen(s.id)}
                >
                  {s.name}
                </button>
              ) : (
                <span className="truncate text-xs font-semibold text-ink-strong">{s.name}</span>
              )}
            </span>
            <span className="truncate text-caption text-ink-muted">{s.status}</span>
          </div>
          {s.days.map((day) => {
            const at = s.now?.date === day.date ? s.now.minute : undefined;
            const note = day.closed ?? day.entries?.[0];
            const Icon = note ? KINDS[note.kind].icon : null;
            const words = day.closed
              ? `${day.closed.label || "Closed"}, closed all day`
              : day.spans.length
                ? day.spans.map((x) => `${x.name} ${spanText(x.start, x.end)}`).join(", ")
                : "Off all day";
            return (
              <div
                key={day.date}
                title={`${s.name}, ${columnText(day.date, true)}: ${words}`}
                className={cn(
                  "grid content-center gap-1 border-b border-l border-line px-2 py-2.5",
                  day.date === today && "bg-accent/3",
                )}
              >
                <div className="relative h-6 rounded-sm bg-surface-inset" style={day.closed ? HATCH : undefined}>
                  {!day.closed &&
                    day.spans.map((x) => {
                      const ring = at !== undefined && x.start <= at && at <= x.end;
                      return (
                        <span
                          key={x.start}
                          data-running={ring || undefined}
                          className={cn(
                            "absolute inset-y-0 rounded-xs",
                            nameColour(x.nameIndex).bg,
                            x.kind === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                            x.kind === "changed" && "border border-ink-strong/50",
                            ring && "ring-2 ring-inset ring-ink-strong",
                          )}
                          style={{ left: pct(x.start), width: pct(x.end + 1 - x.start) }}
                        />
                      );
                    })}
                  {at !== undefined && (
                    <span className="absolute inset-y-0 z-10 w-0.5 bg-destructive" style={{ left: pct(at) }} />
                  )}
                </div>
                {note && Icon && (
                  <span className="flex min-w-0 items-center gap-1 text-caption text-ink-muted">
                    <Icon className="size-3 flex-none" />
                    <span className="truncate">{noteText(note)}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
