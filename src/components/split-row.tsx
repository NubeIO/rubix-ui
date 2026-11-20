// Two cards side by side on a `SplitCard`'s lines (the UART Overview's Sites under Fleet health and
// Issues under Operating mode): the gap between them centred under the card's divider, stacked at the
// same width the card stacks. The card is 3 : 2 inside its 20px padding with a 28px gap and the
// divider on the right half's edge; with a 16px gap here, a first column of 60% - 1px puts this gap's
// middle exactly under it.
//
// One responsibility: lay out two cards on a split card's lines.

import { useRef, type ReactNode } from "react";

import { cn } from "../lib/cn";
import { useElementWidth } from "../lib/element-width";
import { SPLIT_STACK_BELOW } from "./split-card";

export interface SplitRowProps {
  left: ReactNode;
  right: ReactNode;
  /** As the `SplitCard` above it (`SPLIT_STACK_BELOW`). */
  stackBelow?: number;
  /** Fill classes, e.g. a least row height and `contain:size` for cards that scroll inside. */
  className?: string;
}

export function SplitRow({ left, right, stackBelow = SPLIT_STACK_BELOW, className }: SplitRowProps) {
  const box = useRef<HTMLDivElement>(null);
  const width = useElementWidth(box);
  const side = width === null || width >= stackBelow;
  return (
    <div
      ref={box}
      data-split={side ? "side" : "stack"}
      className={cn("grid gap-4", side ? "[grid-template-columns:calc(60%-1px)_minmax(0,1fr)]" : "grid-cols-1", className)}
    >
      {left}
      {right}
    </div>
  );
}
