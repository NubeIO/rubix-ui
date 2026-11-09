// The all-schedules calendar's week: one row per schedule, a 24-hour bar per day coloured by name
// position. A closed or holiday day is hatched with its label under the bar; extra hours have a dashed
// edge, changed hours an outline; the block running now is ringed and now is a red line on today. The
// row label says what runs now ("Now: Occupied = 1").
//
// One responsibility: draw the week rows.

import { cn } from "../lib/cn";

import { nameColour } from "../lib/schedule/nameColour";
import { DAY_MINUTES, hhmm, nameIndex, type NodeSchedule } from "../lib/schedule/nodeSchedule";
import type { NowAndNext } from "../lib/schedule/nowAndNext";
import { scheduleColourClass } from "../lib/schedule/scheduleColour";

import { HATCH, KINDS } from "./node-schedule-editor-dated-kinds";
import { columnText, untilText } from "./node-schedule-editor-words";
import type { DayTable } from "./all-schedules-calendar-entries";

interface Props {
  schedules: NodeSchedule[];
  days: string[];
  table: DayTable;
  /** Today in the viewer's zone, for the column heads. */
  today: string;
  now: Map<string, NowAndNext>;
  onOpen?: (id: string) => void;
}

const pct = (m: number) => `${(m / DAY_MINUTES) * 100}%`;

export function CalendarWeekRows({ schedules, days, table, today, now, onOpen }: Props) {
  return (
    <div
      role="table"
      aria-label="Schedules this week"
      className="grid grid-cols-[minmax(9rem,13rem)_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line"
    >
      <span className="border-b border-line bg-surface-raised" />
      {days.map((d, i) => (
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
      {schedules.map((s) => {
        const state = now.get(s.id);
        const running = state?.enabled ? `Now: ${state.now.name} = ${state.now.value}` : "Switched off";
        return (
          <div key={s.id} role="row" className="contents">
            <div className="grid content-center gap-0.5 border-b border-line px-3 py-2.5">
              <span className="flex min-w-0 items-center gap-2">
                <span aria-hidden className={cn("size-2 flex-none rounded-full", scheduleColourClass(s.color))} />
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
              <span className="truncate text-caption text-ink-muted">{running}</span>
            </div>
            {days.map((d) => {
              const day = table.get(s.id)?.get(d);
              const isNow = state?.at.date === d;
              const note = day?.closed ?? day?.items[0];
              const Icon = note ? KINDS[note.kind].icon : null;
              const words = day?.closed
                ? `${day.closed.label || "Closed"}, closed all day`
                : day?.spans.length
                  ? day.spans.map((x) => `${x.name} ${hhmm(x.start)}–${untilText(x.end)}`).join(", ")
                  : "Off all day";
              return (
                <div
                  key={d}
                  title={`${s.name}, ${columnText(d, true)}: ${words}`}
                  className={cn(
                    "grid content-center gap-1 border-b border-l border-line px-2 py-2.5",
                    d === today && "bg-accent/3",
                  )}
                >
                  <div className="relative h-6 rounded-sm bg-surface-inset" style={day?.closed ? HATCH : undefined}>
                    {!day?.closed &&
                      day?.spans.map((x) => {
                        const tone = nameColour(nameIndex(s, x.name));
                        const ring = isNow && x.start <= (state?.at.minute ?? -1) && (state?.at.minute ?? -1) <= x.end;
                        return (
                          <span
                            key={x.start}
                            data-running={ring || undefined}
                            className={cn(
                              "absolute inset-y-0 rounded-xs",
                              tone.bg,
                              x.item?.kind === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                              x.item?.kind === "changed" && "border border-ink-strong/50",
                              ring && "ring-2 ring-inset ring-ink-strong",
                            )}
                            style={{ left: pct(x.start), width: pct(x.end + 1 - x.start) }}
                          />
                        );
                      })}
                    {isNow && state?.enabled && (
                      <span
                        className="absolute inset-y-0 z-10 w-0.5 bg-destructive"
                        style={{ left: pct(state.at.minute) }}
                      />
                    )}
                  </div>
                  {note && Icon && (
                    <span className="flex min-w-0 items-center gap-1 text-caption text-ink-muted">
                      <Icon className="size-3 flex-none" />
                      <span className="truncate">{note.label || KINDS[note.kind].label}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
