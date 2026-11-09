// A schedule name's colour square (the editor's brush, legend, names sheet and Now card; a schedule
// list's now column): filled in the name's position colour,
// or an outlined empty square for the default (Off), which has no colour.
//
// One responsibility: draw one name swatch.

import { cn } from "../lib/cn";

import { nameColour } from "../lib/schedule/nameColour";

export function NameSwatch({ index, className }: { index: number; className?: string }) {
  const tone = nameColour(index);
  return (
    <span
      aria-hidden
      className={cn("size-2.5 flex-none rounded-xs border", tone.bg, tone.border, className)}
    />
  );
}
