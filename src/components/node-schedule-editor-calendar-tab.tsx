// The editor's Calendar tab: the real week, Monday to Sunday, with previous / next / Today. Each day is
// `resolveDay`, so it shows exactly what runs: blocks in their name's colour, extra hours with a dashed
// edge, changed hours with a solid edge, a closed or holiday day hatched with its label, the running
// block ringed and now as a red line on today. Times are the schedule's own.
//
// One responsibility: draw one real week of the schedule.

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/cn";

import { nameColour } from "../lib/schedule/nameColour";
import { DAY_MINUTES, hhmm, nameIndex, type NodeSchedule } from "../lib/schedule/nodeSchedule";
import type { Moment } from "../lib/schedule/nowAndNext";
import { addDays } from "../lib/date";
import { resolveDay } from "../lib/schedule/resolveDay";

import { columnText, mondayOf, nameText, untilText, weekText } from "./node-schedule-editor-words";
import { NameSwatch } from "./name-swatch";
import { HATCH, KINDS } from "./node-schedule-editor-dated-kinds";

interface Props {
  doc: NodeSchedule;
  /** Now in the schedule's zone. */
  at: Moment;
  canEdit: boolean;
  onAdd: () => void;
}

const pct = (m: number) => `${(m / DAY_MINUTES) * 100}%`;
const HOURS = [0, 3, 6, 9, 12, 15, 18, 21];

export function CalendarTab({ doc, at, canEdit, onAdd }: Props) {
  const [offset, setOffset] = useState(0);
  const monday = addDays(mondayOf(at.date), offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => resolveDay(doc, addDays(monday, i)));

  return (
    <section className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="icon-sm" aria-label="Previous week" onClick={() => setOffset((o) => o - 1)}>
          <ChevronLeft />
        </Button>
        <span className="min-w-36 text-center text-sm font-semibold text-ink-strong">{weekText(monday)}</span>
        <Button variant="ghost" size="icon-sm" aria-label="Next week" onClick={() => setOffset((o) => o + 1)}>
          <ChevronRight />
        </Button>
        <Button variant="outline" size="sm" disabled={offset === 0} onClick={() => setOffset(0)}>
          Today
        </Button>
        {canEdit && (
          <Button variant="outline" size="sm" className="ml-auto" onClick={onAdd}>
            <Plus />
            Add dated entry
          </Button>
        )}
      </div>

      <div className="grid grid-cols-[2.5rem_repeat(7,minmax(0,1fr))] overflow-hidden rounded-lg border border-line">
        <span className="border-b border-line" />
        {days.map((d, i) => {
          const isToday = d.date === at.date;
          const note = d.closed
            ? KINDS[d.closed.kind].label
            : d.items.length
              ? KINDS[d.items[0].kind].label
              : "";
          return (
            <div
              key={d.date}
              className={cn("grid min-w-0 gap-0.5 border-b border-l border-line px-2 py-1.5", isToday && "bg-accent/8")}
            >
              <span className={cn("truncate text-xs font-semibold", isToday ? "text-accent" : "text-ink")}>
                {columnText(d.date, i === 0)}
              </span>
              <span className="truncate text-caption text-ink-muted" title={note}>
                {note || " "}
              </span>
            </div>
          );
        })}
        <div className="relative h-120">
          {HOURS.map((h) =>
            h ? (
              <span
                key={h}
                className="absolute right-1.5 -translate-y-1/2 font-mono text-caption text-ink-faint"
                style={{ top: pct(h * 60) }}
              >
                {String(h).padStart(2, "0")}
              </span>
            ) : null,
          )}
        </div>
        {days.map((d) => {
          const isToday = d.date === at.date;
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
                const tone = nameColour(nameIndex(doc, s.name));
                const running = isToday && s.start <= at.minute && at.minute <= s.end;
                const label = s.item?.label || s.name;
                return (
                  <div
                    key={s.start}
                    data-running={running || undefined}
                    title={`${s.item ? `${s.item.label} · ` : ""}${nameText(doc, s.name)} · ${hhmm(s.start)} until ${untilText(s.end)}`}
                    className={cn(
                      "absolute inset-x-1 min-h-3.5 overflow-hidden rounded-sm px-1.5 py-1 font-mono text-caption leading-tight",
                      tone.bg,
                      tone.text,
                      s.item?.kind === "extra" && "border-[1.5px] border-dashed border-ink-strong",
                      s.item?.kind === "changed" && "border-[1.5px] border-ink-strong/50",
                      running && "ring-2 ring-ink-strong ring-offset-2 ring-offset-surface-card",
                    )}
                    style={{ top: pct(s.start), height: pct(s.end + 1 - s.start) }}
                  >
                    <span className="block truncate font-sans font-semibold">{label}</span>
                    <span className="block truncate">
                      {hhmm(s.start)}–{untilText(s.end)}
                    </span>
                  </div>
                );
              })}
              {d.closed && (
                <span className="absolute inset-x-1 top-2 flex items-center gap-1 truncate rounded-md border border-line-strong bg-surface-card px-1.5 py-0.5 text-caption text-ink-strong">
                  {(() => {
                    const Icon = KINDS[d.closed.kind].icon;
                    return <Icon className="size-3 flex-none" />;
                  })()}
                  {d.closed.label || KINDS[d.closed.kind].label}
                </span>
              )}
              {isToday && (
                <span
                  aria-label="Now"
                  className="absolute inset-x-0 z-10 h-0.5 bg-destructive"
                  style={{ top: pct(at.minute) }}
                >
                  <span className="absolute -left-1 -top-1 size-2 rounded-full bg-destructive" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-caption text-ink-muted">
        {doc.names.slice(1).map((n, i) => (
          <span key={n.name} className="flex items-center gap-1.5">
            <NameSwatch index={i + 1} />
            {n.name}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-xs border border-dashed border-ink-strong" />
          Extra hours
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-xs border border-line-strong" style={HATCH} />
          Closed or holiday
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-0.5 bg-destructive" />
          Now
        </span>
      </div>
    </section>
  );
}
