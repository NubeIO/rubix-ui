// The editor below md: view only (spec, "Below md"). Now and the next change, then the real week day by
// day, each a line of words and a bar in name colours with closures hatched and now marked on today.
// No painting: "Open on a larger screen to edit."
//
// One responsibility: the phone view of one schedule.

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/cn";

import { nameColour } from "../lib/schedule/nameColour";
import { DAY_MINUTES, hhmm, nameIndex, type NodeSchedule } from "../lib/schedule/nodeSchedule";
import type { NowAndNext } from "../lib/schedule/nowAndNext";
import { addDays } from "../lib/date";
import { resolveDay } from "../lib/schedule/resolveDay";

import { HATCH } from "./node-schedule-editor-dated-kinds";
import { columnText, momentText, mondayOf, untilText, weekText } from "./node-schedule-editor-words";
import { NameSwatch } from "./name-swatch";

const pct = (m: number) => `${(m / DAY_MINUTES) * 100}%`;

export function PhoneView({ doc, state }: { doc: NodeSchedule; state: NowAndNext }) {
  const [offset, setOffset] = useState(0);
  const monday = addDays(mondayOf(state.at.date), offset * 7);
  const today = state.at.date;
  const { now, next } = state;

  return (
    <div className="grid gap-3 p-4">
      <div className="grid gap-1 rounded-lg border border-line bg-surface-card p-3">
        <div className="flex items-center gap-2">
          <NameSwatch index={nameIndex(doc, now.name)} className="size-3" />
          <span className="text-base font-semibold text-ink-strong">{state.enabled ? now.name : "Switched off"}</span>
          <span className="text-xs text-ink-muted">= {now.value}</span>
        </div>
        {now.until && <span className="text-xs text-ink-muted">until {momentText(now.until, today)}</span>}
        {next && (
          <span className="text-xs text-ink-muted">
            Then {next.name} = {next.value} · from {momentText(next.from, today)}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" aria-label="Previous week" onClick={() => setOffset((o) => o - 1)}>
          <ChevronLeft />
        </Button>
        <span className="flex-1 text-center text-xs font-semibold text-ink-strong">{weekText(monday)}</span>
        <Button variant="ghost" size="icon-sm" aria-label="Next week" onClick={() => setOffset((o) => o + 1)}>
          <ChevronRight />
        </Button>
      </div>
      {Array.from({ length: 7 }, (_, i) => resolveDay(doc, addDays(monday, i))).map((d, i) => {
        const sum = d.closed
          ? `${d.closed.label || "Closed"}: closed all day`
          : d.spans.length
            ? d.spans.map((s) => `${s.name} ${hhmm(s.start)}–${untilText(s.end)}`).join(", ")
            : "Off all day";
        return (
          <div key={d.date} className="grid gap-1">
            <div className="flex items-baseline gap-2">
              <span className={cn("text-xs font-semibold", d.date === today ? "text-accent" : "text-ink")}>
                {columnText(d.date, i === 0)}
              </span>
              <span className="truncate text-caption text-ink-muted">{sum}</span>
            </div>
            <div className="relative h-2.5 overflow-hidden rounded-sm bg-surface-inset" style={d.closed ? HATCH : undefined}>
              {d.spans.map((s) => (
                <span
                  key={s.start}
                  className={cn("absolute inset-y-0", nameColour(nameIndex(doc, s.name)).bg)}
                  style={{ left: pct(s.start), width: pct(s.end + 1 - s.start) }}
                />
              ))}
              {d.date === today && (
                <span className="absolute inset-y-0 w-0.5 bg-destructive" style={{ left: pct(state.at.minute) }} />
              )}
            </div>
          </div>
        );
      })}
      <span className="text-caption text-ink-faint">View only on a phone. Open on a larger screen to edit.</span>
    </div>
  );
}
