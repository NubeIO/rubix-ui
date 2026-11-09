// The keys every schedule calendar legend ends with: extra hours (dashed edge), closed or holiday
// (hatched) and now (the red line).
//
// One responsibility: draw the fixed legend keys.

import { HATCH } from "./schedule-kinds";

export function ScheduleLegendKeys() {
  return (
    <>
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
    </>
  );
}
