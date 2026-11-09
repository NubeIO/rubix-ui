// The week strip (handoff, "New components"): a schedule's weekly hours as seven 3px rows, Monday first,
// each block in its name's colour. For roster rows and group cards.
//
// One responsibility: draw one week in miniature.

import { cn } from "../lib/cn";

import { nameColour } from "../lib/schedule/nameColour";
import { DAY_MINUTES, nameIndex, type NodeSchedule } from "../lib/schedule/nodeSchedule";

const pct = (m: number) => `${(m / DAY_MINUTES) * 100}%`;

export function WeekStrip({ doc, className }: { doc: Pick<NodeSchedule, "week" | "names">; className?: string }) {
  return (
    <span aria-hidden className={cn("grid w-full gap-0.5", className)}>
      {doc.week.map((segs, d) => (
        <span key={d} className="relative block h-[3px] overflow-hidden rounded-xs bg-surface-inset">
          {segs.map((s) => (
            <span
              key={s.start}
              className={cn("absolute inset-y-0", nameColour(nameIndex(doc, s.name)).bg)}
              style={{ left: pct(s.start), width: pct(s.end + 1 - s.start) }}
            />
          ))}
        </span>
      ))}
    </span>
  );
}
