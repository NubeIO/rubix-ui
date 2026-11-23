// Rows that break a total into a few groups (the UART Overview's Fleet health: Healthy, Needs attention,
// Offline): each row its count in its colour, its title with its share at the title line's right end,
// and a line of words under them, which can hold `CountToggle`s for the group's parts. A hairline parts
// the rows.
//
// One responsibility: lay out a total's groups.

import type { ReactNode } from "react";

import { tone } from "../lib/tone";

export function BreakdownList({ children }: { children: ReactNode }) {
  return <div className="grid min-w-0 [&>*+*]:border-0 [&>*+*]:border-t [&>*+*]:border-solid [&>*+*]:border-line">{children}</div>;
}

export interface BreakdownRowProps {
  value: number;
  /** The count's colour: a token without `--`. */
  tone: string;
  title: string;
  /** At the title line's right end: "67%". */
  share?: string;
  /** The words under the title: the group's parts. */
  children: ReactNode;
}

export function BreakdownRow({ value, tone: t, title, share, children }: BreakdownRowProps) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 px-3 py-3">
      <span className="text-xl font-semibold tabular-nums" style={{ color: tone(t) }}>
        {value.toLocaleString()}
      </span>
      <span className="grid min-w-0 gap-1">
        <span className="flex items-baseline justify-between gap-3">
          {/* Line height inline: an extension's own Tailwind 3 `text-sm` (a fixed 1.25rem) loads after this
              package's CSS and would win over a `leading-*` class on the same element. */}
          <span className="text-sm font-semibold text-ink-strong" style={{ lineHeight: 1.25 }}>
            {title}
          </span>
          {share ? (
            <span className="text-sm tabular-nums text-ink-muted" style={{ lineHeight: 1.45 }}>
              {share}
            </span>
          ) : null}
        </span>
        <span className="flex flex-wrap items-center gap-x-1 text-detail leading-[1.45] text-ink-muted">{children}</span>
      </span>
    </div>
  );
}
