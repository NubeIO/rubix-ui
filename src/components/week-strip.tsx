// The week strip (handoff, "New components"): a week's hours as seven 3px rows, Monday first, each
// segment in its name's colour. For roster rows and group cards.
//
// One responsibility: draw one week in miniature.

import { cn } from "../lib/cn";

import { nameColour } from "../lib/colour/nameColour";

/** One coloured stretch of a day. Minutes 0 to 1439, `end` inclusive. */
export interface WeekStripSegment {
  start: number;
  end: number;
  /** The name's position, for its colour (`nameColour`). */
  nameIndex: number;
}

const pct = (m: number) => `${(m / 1440) * 100}%`;

export function WeekStrip({ week, className }: { week: WeekStripSegment[][]; className?: string }) {
  return (
    <span aria-hidden className={cn("grid w-full gap-0.5", className)}>
      {week.map((segs, d) => (
        <span key={d} className="relative block h-[3px] overflow-hidden rounded-xs bg-surface-inset">
          {segs.map((s) => (
            <span
              key={s.start}
              className={cn("absolute inset-y-0", nameColour(s.nameIndex).bg)}
              style={{ left: pct(s.start), width: pct(s.end + 1 - s.start) }}
            />
          ))}
        </span>
      ))}
    </span>
  );
}
