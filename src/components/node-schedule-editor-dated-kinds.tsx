// The four dated-entry kinds as the editor shows them: their words, icons and the kind chip (handoff,
// "Dated kind chip"): extra hours in the name's colour with a dashed edge, changed hours in the name's
// colour with a solid edge, closed and holiday hatched in `--ink-muted` with a `--line-strong` edge and
// a ban or flag icon. The hatch is also what the calendar lays over a closed day.
//
// One responsibility: kind → words, icon and chip.

import type { CSSProperties } from "react";
import { Ban, Clock, Flag, Plus, type LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";

import { nameColour } from "../lib/schedule/nameColour";
import type { DatedKind } from "../lib/schedule/nodeSchedule";

export const KINDS: Record<DatedKind, { label: string; filter: string; icon: LucideIcon; hint: string }> = {
  extra: {
    label: "Extra hours",
    filter: "Extra hours",
    icon: Plus,
    hint: "Open on this date at these hours, on top of the week (for example a late flight).",
  },
  changed: {
    label: "Changed hours",
    filter: "Changed",
    icon: Clock,
    hint: "Open only at these hours on this date; the week's hours for that day are replaced.",
  },
  closed: {
    label: "Closed",
    filter: "Closed",
    icon: Ban,
    hint: "Closed all day. Wins over the week, extra hours and changed hours.",
  },
  holiday: {
    label: "Holiday",
    filter: "Holidays",
    icon: Flag,
    hint: "A public holiday. Closed all day, like Closed, and listed as a holiday.",
  },
};

/** The hatch over closed time, from tokens. */
export const HATCH: CSSProperties = {
  backgroundImage: "repeating-linear-gradient(135deg, hsl(var(--ink-muted) / 0.3) 0 3px, transparent 3px 7px)",
};

/** The kind chip. `nameIndex` colours extra and changed hours. */
export function KindChip({ kind, nameIndex, className }: { kind: DatedKind; nameIndex: number; className?: string }) {
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
        className,
      )}
      style={off ? HATCH : undefined}
    >
      <Icon className="size-3" />
      {meta.label}
    </span>
  );
}
