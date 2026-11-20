// A count that narrows a view to its part and, pressed again, lets it go (the UART Overview's counts in
// Fleet health and its mode bars). A part with nothing in it can't be picked, but a pressed one can
// always be let go, even when a refresh has emptied it. It takes its font from around it (`[font:inherit]`):
// set a size on its contents, not on the toggle. Pressed, it wears the host's selected facet
// chip: an accent wash and a faint accent edge, never the part's colour. `select-none`: a disabled
// button passes clicks to what is behind it, and a double-click there would select its words.
//
// One responsibility: toggle one filter from its count.

import type { CSSProperties, ReactNode } from "react";

import { cn } from "../lib/cn";

export interface CountToggleProps {
  pressed: boolean;
  /** How many the part holds: at 0 an unpressed toggle is off. */
  count: number;
  onToggle: (next: boolean) => void;
  /** The tooltip at rest ("Show only these"). */
  title?: string;
  /** The tooltip while pressed ("Show all"). */
  pressedTitle?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function CountToggle({ pressed, count, onToggle, title = "Show only these", pressedTitle = "Show all", className, style, children }: CountToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={!pressed && count === 0}
      title={pressed ? pressedTitle : title}
      onClick={() => onToggle(!pressed)}
      style={style}
      className={cn(
        "cursor-pointer select-none rounded-md border border-solid bg-transparent text-left text-inherit [font:inherit] disabled:cursor-default disabled:opacity-60",
        pressed ? "border-accent/45 bg-accent/10 hover:bg-accent/15" : "border-transparent enabled:hover:bg-(--hover-wash)",
        className,
      )}
    >
      {children}
    </button>
  );
}
