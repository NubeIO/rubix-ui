// The four dated-entry kinds as the calendars draw them: their words, icons and the kind chip (handoff,
// "Dated kind chip"): extra hours in the name's colour with a dashed edge, changed hours in the name's
// colour with a solid edge, closed and holiday hatched in `--ink-muted` with a `--line-strong` edge and
// a ban or flag icon. The hatch is also what a calendar lays over a closed day.
//
// One responsibility: kind → words, icon and chip.

import type { CSSProperties } from "react";
import { Ban, Clock, Flag, Plus, type LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";

import { nameColour } from "../lib/colour/nameColour";
import type { ScheduleEntryKind, ScheduleNote } from "./schedule-calendar-types";

export const KINDS: Record<ScheduleEntryKind, { label: string; icon: LucideIcon }> = {
  extra: { label: "Extra hours", icon: Plus },
  changed: { label: "Changed hours", icon: Clock },
  closed: { label: "Closed", icon: Ban },
  holiday: { label: "Holiday", icon: Flag },
};

/** A note's own label, or its kind's words. */
export const noteText = (n: ScheduleNote) => n.label || KINDS[n.kind].label;

/** The hatch over closed time, from tokens. */
export const HATCH: CSSProperties = {
  backgroundImage: "repeating-linear-gradient(135deg, hsl(var(--ink-muted) / 0.3) 0 3px, transparent 3px 7px)",
};

/** The kind chip. `nameIndex` colours extra and changed hours. */
export function KindChip({ kind, nameIndex }: { kind: ScheduleEntryKind; nameIndex: number }) {
  const meta = KINDS[kind];
  const Icon = meta.icon;
  const off = kind === "closed" || kind === "holiday";
  const tone = nameColour(nameIndex);
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-md border px-2 text-caption font-medium",
        off ? "border-line-strong text-ink-strong" : cn(tone.bg, tone.text),
        kind === "extra" && "border-dashed border-ink-strong",
        kind === "changed" && tone.border,
      )}
      style={off ? HATCH : undefined}
    >
      <Icon className="size-3" />
      {meta.label}
    </span>
  );
}
