// A card of two halves, 3 : 2, with a divider between them (the UART Overview's fleet status: Fleet
// health beside Operating mode), stacked with the divider across where the card is narrower than
// `stackBelow`. Measured on the card itself, so it follows the room the page has, not the window.
// `SplitRow` puts two cards under it on the same lines.
//
// One responsibility: lay out two halves side by side or stacked.

import { useRef, type ReactNode } from "react";

import { cn } from "../lib/cn";
import { useElementWidth } from "../lib/element-width";
import { tone } from "../lib/tone";

/** The card's least width for its halves side by side: a 420px and a 300px half, the 28px gap and
 *  divider padding between them, and the card's 20px padding and 1px border each side, as
 *  `useElementWidth` measures the border box. */
export const SPLIT_STACK_BELOW = 420 + 300 + 56 + 2 * 20 + 2;

export interface SplitCardProps {
  /** The card's accessible name ("Fleet status"). */
  label: string;
  left: ReactNode;
  right: ReactNode;
  /** The width, in px, below which the halves stack (`SPLIT_STACK_BELOW`). */
  stackBelow?: number;
  className?: string;
}

export function SplitCard({ label, left, right, stackBelow = SPLIT_STACK_BELOW, className }: SplitCardProps) {
  const box = useRef<HTMLElement>(null);
  const width = useElementWidth(box);
  // Unmeasured (the first paint, jsdom): side by side, as on most screens.
  const side = width === null || width >= stackBelow;
  return (
    <section
      ref={box}
      aria-label={label}
      data-split={side ? "side" : "stack"}
      className={cn(
        "grid gap-7 rounded-[var(--radius-card,12px)] border border-line bg-surface-card p-5",
        side && "grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
        className,
      )}
    >
      <div className="min-w-0">{left}</div>
      {/* The divider inline: as classes, `border-0` sorts after `border-l` here and would wipe it out. */}
      <div
        data-split-divider={side ? "left" : "top"}
        className={cn("min-w-0", side ? "pl-7" : "pt-5")}
        style={side ? { borderLeft: `1px solid ${tone("line")}` } : { borderTop: `1px solid ${tone("line")}` }}
      >
        {right}
      </div>
    </section>
  );
}
