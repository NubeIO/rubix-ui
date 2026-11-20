// A row of pill chips that narrow one list, each with its count (the UART Overview's Issues: All,
// Faults, Comms, Stale, Offline). One at a time. The first chip is the whole list and always shows; the
// rest only where they count anything. The app keeps the pick and should let it go when its chip's rows
// are all gone.
//
// One responsibility: pick one slice of a list.

import { cn } from "../lib/cn";

export interface CountChip {
  key: string;
  label: string;
  count: number;
}

export interface CountChipsProps {
  /** The first is the whole list. */
  chips: CountChip[];
  value: string;
  onChange: (key: string) => void;
  /** The row's accessible name ("Filter Issues"). */
  label: string;
}

export function CountChips({ chips, value, onChange, label }: CountChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1">
      {chips
        .filter((c, i) => i === 0 || c.count > 0)
        .map((c) => {
          const on = value === c.key;
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(c.key)}
              className={cn(
                "flex h-7 cursor-pointer items-center gap-1 rounded-full border border-solid px-2 text-caption leading-[1.4]",
                on ? "border-accent/45 bg-accent/10 text-ink-strong" : "border-line bg-transparent text-ink-muted hover:text-ink-strong",
              )}
            >
              <span className="font-semibold">{c.label}</span>
              <span className="tabular-nums opacity-75">{c.count.toLocaleString()}</span>
            </button>
          );
        })}
    </div>
  );
}
