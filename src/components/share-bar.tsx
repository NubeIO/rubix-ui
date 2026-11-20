// "10 of 14" over a bar of that share (the UART Sites table's Running), the share in its tooltip;
// "—" when it can't be known (`value` null or nothing to be a share of).
//
// One responsibility: show a part of a whole as words and a bar.

import { tone } from "../lib/tone";

export interface ShareBarProps {
  value: number | null;
  of: number | null;
  /** The bar's colour: a token without `--` ("success"). */
  tone?: string;
  /** What is counted, for the tooltip: "units running" → "10 of 14 units running (71%)". */
  noun?: string;
}

export function ShareBar({ value, of, tone: t = "success", noun }: ShareBarProps) {
  if (value === null || !of) return <span className="text-ink-muted">—</span>;
  const pct = Math.round((value / of) * 100);
  return (
    <span className="grid gap-1.5" title={`${value} of ${of}${noun ? ` ${noun}` : ""} (${pct}%)`}>
      {/* Line height inline: an extension's own Tailwind 3 `text-xs` (a fixed 1rem) would win over a class. */}
      <span className="text-xs tabular-nums" style={{ lineHeight: 1.45 }}>
        <span className="font-semibold text-ink-strong">{value.toLocaleString()}</span>
        <span className="text-ink-faint"> of {of.toLocaleString()}</span>
      </span>
      <span aria-hidden className="h-[5px] w-full overflow-hidden rounded-full bg-surface-inset">
        <span data-bar-fill className="block h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, background: tone(t) }} />
      </span>
    </span>
  );
}
