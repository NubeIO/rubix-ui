// Rows of label, bar and count (the UART Overview's Operating mode): each bar as long as its share of
// the largest value, in its own colour, with an optional icon before the label. Given `onPick`, every
// row is a `CountToggle` that narrows a view to it; without, the rows are plain.
//
// Plain data in: the app orders the rows (busiest first, or its own order).
//
// One responsibility: compare a few counts at a glance.

import type { ReactNode } from "react";

import { tone } from "../lib/tone";
import { CountToggle } from "./count-toggle";

export interface BarRow {
  key: string;
  label: string;
  value: number;
  /** The bar's colour (and the icon's): a token without `--`. */
  tone: string;
  icon?: ReactNode;
  /** The row's tooltip at rest, before "Show only these" when it toggles. */
  title?: string;
}

export interface BarListProps {
  rows: BarRow[];
  /** The pressed row's key, when the rows toggle. */
  picked?: string;
  /** Makes each row a toggle: the row's key on press, `undefined` on letting go. */
  onPick?: (key: string | undefined) => void;
  /** The label column's width in px (88). */
  labelWidth?: number;
  /** The tooltip while a row is pressed ("Show all"). */
  pressedTitle?: string;
}

/** Inline: an extension's own Tailwind 3 `text-sm` (a fixed 1.25rem) loads after this package's CSS
 *  and would win over a `leading-*` class on the same element. */
const LINE = { lineHeight: 1.5 };

export function BarList({ rows, picked, onPick, labelWidth = 88, pressedTitle }: BarListProps) {
  const most = Math.max(1, ...rows.map((r) => r.value));
  // The type sits on the cells: a toggle's button inherits its font from the row around it.
  const grid = "grid w-full items-center gap-3 px-2 py-0.5";
  const cols = { gridTemplateColumns: `${labelWidth}px minmax(0,1fr) 28px` };
  const body = (r: BarRow) => (
    <>
      <span className="flex min-w-0 items-center gap-1.5 text-sm text-ink" style={LINE}>
        {r.icon ? <span aria-hidden className="flex flex-none [&_svg]:size-3.5" style={{ color: tone(r.tone) }}>{r.icon}</span> : null}
        <span className="truncate">{r.label}</span>
      </span>
      <span className="h-2 overflow-hidden rounded-full bg-surface-inset" aria-hidden>
        <span data-bar-fill className="block h-full rounded-full" style={{ width: `${(r.value / most) * 100}%`, background: tone(r.tone) }} />
      </span>
      <span className="text-right text-sm font-semibold tabular-nums text-ink-strong" style={LINE}>
        {r.value.toLocaleString()}
      </span>
    </>
  );
  return (
    <div className="grid gap-0.5">
      {rows.map((r) =>
        onPick ? (
          <CountToggle
            key={r.key}
            pressed={picked === r.key}
            count={r.value}
            onToggle={(on) => onPick(on ? r.key : undefined)}
            title={r.title ? `${r.title} Show only these` : undefined}
            pressedTitle={pressedTitle}
            className={grid}
            style={cols}
          >
            {body(r)}
          </CountToggle>
        ) : (
          <div key={r.key} className={grid} style={cols} title={r.title}>
            {body(r)}
          </div>
        ),
      )}
    </div>
  );
}
