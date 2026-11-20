// A count as a pill tinted in its tone (the UART Sites table's Issues): a faint 0 with none, "—" when it
// can't be known.
//
// One responsibility: show a count that should catch the eye when it isn't zero.

import { tone } from "../lib/tone";

export interface CountPillProps {
  count: number | null;
  /** A token without `--`: "destructive" for a fault, "warning", "ink-muted" for an offline site. */
  tone: string;
}

export function CountPill({ count, tone: t }: CountPillProps) {
  if (count === null) return <span className="text-ink-muted">—</span>;
  if (!count) return <span className="tabular-nums text-ink-faint">0</span>;
  return (
    <span
      className="inline-block min-w-[28px] rounded-full px-2 py-0.5 text-center text-caption font-semibold tabular-nums"
      style={{ color: tone(t), background: tone(t, 0.14) }}
    >
      {count.toLocaleString()}
    </span>
  );
}
