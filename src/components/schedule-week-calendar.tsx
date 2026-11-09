// One schedule's real week, Monday to Sunday, as a vertical calendar (the node schedule editor's
// Calendar tab): a column per day on an hour axis, blocks in their name's colour, extra hours with a
// dashed edge, changed hours with a solid edge, a closed or holiday day hatched with its label, the
// running block ringed and now as a red line on today, with previous / next / Today above.
//
// Plain data in, events out: the app resolves each day (its own schedule logic) into `days` and moves
// the week on `onPrev` / `onNext` / `onToday`.
//
// One responsibility: draw one week of one schedule.

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { hhmm } from "../lib/time";

import { nameColour } from "../lib/colour/nameColour";
import type { ScheduleDay, ScheduleLegendItem, ScheduleMoment } from "./schedule-calendar-types";
import { columnText, untilText, weekText } from "./schedule-calendar-words";
import { HATCH, KINDS, noteText } from "./schedule-kinds";
import { NameSwatch } from "./name-swatch";
import { ScheduleCalendarNav } from "./schedule-calendar-nav";
import { ScheduleLegendKeys } from "./schedule-legend-keys";

export interface ScheduleWeekCalendarProps {
  /** The seven days, Monday first. */
  days: ScheduleDay[];
  /** Now in the schedule's zone: today's column, the now line and the running block. */
  now?: ScheduleMoment;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  /** The week holds today: Today is off. */
  atToday: boolean;
  /** At the right of the controls ("Add dated entry"). */
  actions?: ReactNode;
  /** The names, in position order. */
  legend: ScheduleLegendItem[];
}

const pct = (m: number) => `${(m / 1440) * 100}%`;
const HOURS = [0, 3, 6, 9, 12, 15, 18, 21];

// How many text lines a block fits, from its length in minutes. A day column is `h-120` (30rem, 480px)
// for 24 hours, so 20px an hour; a line is `text-caption` (11px) at `leading-tight` (1.25), and the
// block's `py-1` takes 8px. Change these with those classes. A block that fits no line is a plain strip
// (its tooltip still names it), one line shows the label, two the label and its times.
const PX_PER_MIN = 480 / 1440;
const LINE_PX = 11 * 1.25;
const PAD_PX = 8;
const linesFor = (s: { start: number; end: number }) =>
  Math.floor(((s.end + 1 - s.start) * PX_PER_MIN - PAD_PX) / LINE_PX);

export function ScheduleWeekCalendar({ days, now, actions, legend, ...nav }: ScheduleWeekCalendarProps) {
  return (
    <section className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <ScheduleCalendarNav unit="week" label={days[0] ? weekText(days[0].date) : ""} {...nav} />
        {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
      </div>

      <div className="grid grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line">
        <span className="border-b border-line" />
        {days.map((d, i) => {
          const isToday = d.date === now?.date;
          const first = d.closed ?? d.entries?.[0];
          const note = first ? KINDS[first.kind].label : "";
          return (
            <div
              key={d.date}
              className={cn("grid min-w-0 gap-0.5 border-b border-l border-line px-2 py-1.5", isToday && "bg-accent/8")}
            >
              <span className={cn("truncate text-xs font-semibold", isToday ? "text-accent" : "text-ink")}>
                {columnText(d.date, i === 0)}
              </span>
              <span className="truncate text-caption text-ink-muted" title={note}>
                {note || " "}
              </span>
            </div>
          );
        })}
        <div className="relative h-120">
          {HOURS.map((h) =>
            h ? (
              <span
                key={h}
                className="absolute right-1.5 -translate-y-1/2 tabular-nums text-caption text-ink-faint"
                style={{ top: pct(h * 60) }}
              >
                {String(h).padStart(2, "0")}
              </span>
            ) : null,
          )}
        </div>
        {days.map((d) => {
          const isToday = !!now && d.date === now.date;
          const ClosedIcon = d.closed ? KINDS[d.closed.kind].icon : null;
          return (
            <div
              key={d.date}
              data-testid={`cal-${d.date}`}
              className={cn("relative h-120 border-l border-line", isToday && "bg-accent/3")}
              style={d.closed ? HATCH : undefined}
            >
              {HOURS.map((h) => (
                <span key={h} className="absolute inset-x-0 h-px bg-line/60" style={{ top: pct(h * 60) }} />
              ))}
              {d.spans.map((s) => {
                const tone = nameColour(s.nameIndex);
                const running = isToday && s.start <= now.minute && now.minute <= s.end;
                const label = s.label || s.name;
                const lines = linesFor(s);
                return (
                  <div
                    key={s.start}
                    data-running={running || undefined}
                    title={
                      s.title ??
                      `${s.label ? `${s.label} · ` : ""}${s.name} · ${hhmm(s.start)} until ${untilText(s.end)}`
                    }
                    className={cn(
                      "absolute inset-x-1 min-h-3.5 overflow-hidden rounded-sm px-1.5 py-1 tabular-nums text-caption leading-tight",
                      tone.bg,
                      tone.text,
                      s.kind === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                      s.kind === "changed" && "border-[1.5px] border-ink-strong/50",
                      running && "ring-2 ring-ink-strong ring-offset-2 ring-offset-surface-card",
                    )}
                    style={{ top: pct(s.start), height: pct(s.end + 1 - s.start) }}
                  >
                    {lines >= 1 && <span className="block truncate font-sans font-semibold">{label}</span>}
                    {lines >= 2 && (
                      <span className="block truncate">
                        {hhmm(s.start)}–{untilText(s.end)}
                      </span>
                    )}
                  </div>
                );
              })}
              {d.closed && ClosedIcon && (
                <span className="absolute inset-x-1 top-2 flex items-center gap-1 truncate rounded-md border border-line-strong bg-surface-card px-1.5 py-0.5 text-caption text-ink-strong">
                  <ClosedIcon className="size-3 flex-none" />
                  {noteText(d.closed)}
                </span>
              )}
              {isToday && (
                <span
                  aria-label="Now"
                  className="absolute inset-x-0 z-10 h-0.5 bg-destructive"
                  style={{ top: pct(now.minute) }}
                >
                  <span className="absolute -left-1 -top-1 size-2 rounded-full bg-destructive" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-caption text-ink-muted">
        {legend.map((n) => (
          <span key={`${n.nameIndex}|${n.label}`} className="flex items-center gap-1.5">
            <NameSwatch index={n.nameIndex} />
            {n.label}
            {n.detail && <span>{n.detail}</span>}
          </span>
        ))}
        <ScheduleLegendKeys />
      </div>
    </section>
  );
}
