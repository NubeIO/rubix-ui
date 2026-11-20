// A row of headline tiles (the UART Overview's): a label (with an optional dot in its tone), a big
// number with a muted word or "/ total" beside it, an optional share bar, and a note at the foot. A tile
// can be an alarm (a red tint and red label while it counts anything). Four across where there is room,
// else two by two, never three and one.
//
// Plain data in: the app counts. Not interactive (a tile that filters is `FilterTiles`).
//
// One responsibility: draw the headline numbers.

import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export interface StatTile {
  key: string;
  label: string;
  value: number;
  /** Beside the number, muted: "units", "/ 42". */
  suffix?: string;
  /** A dot before the label: a colour token without `--` ("success", "destructive", "line-strong"). */
  dot?: string;
  /** A share bar under the number, 0–100, in the accent. */
  bar?: number;
  /** At the tile's foot, under the bar where there is one; it wraps on a narrow tile. */
  note: ReactNode;
  /** The note's tooltip, where the note is short for more. */
  noteTitle?: string;
  /** Tinted as an alarm (a red tint, a red label) while `value` is above zero. */
  alarm?: boolean;
}

export interface StatTilesProps {
  tiles: StatTile[];
  /** The row's accessible name ("Summary"). */
  label: string;
}

// Four across from 642px (four 150px tiles and their 14px gaps), else two by two: the column's least
// width is a quarter of the row from 642px up and a half below it (the clamp's middle term is huge
// below 642px and negative above it, so it picks one end or the other).
const GRID =
  "grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(clamp(calc((100%-42px)/4),calc((642px-100%)*1000),calc((100%-14px)/2)),1fr))]";

export function StatTiles({ tiles, label }: StatTilesProps) {
  return (
    <div role="group" aria-label={label} className={GRID}>
      {tiles.map((t) => {
        const alarm = t.alarm && t.value > 0;
        return (
          <section
            key={t.key}
            className={cn(
              "flex min-w-0 flex-col gap-2.5 rounded-[var(--radius-card,12px)] border p-4",
              alarm ? "border-destructive/35 bg-destructive/[0.06]" : "border-line bg-surface-card",
            )}
          >
            <h2 className={cn("m-0 flex items-center gap-2 text-caption leading-[1.4] font-normal", alarm ? "text-destructive" : "text-ink-muted")}>
              {t.dot ? <span aria-hidden className="size-2 flex-none rounded-full" style={{ background: `hsl(var(--${t.dot}))` }} /> : null}
              {t.label}
            </h2>
            <div className="flex items-baseline gap-1.5">
              <span className="text-value-xl leading-none font-semibold tracking-tight tabular-nums text-ink-strong">{t.value.toLocaleString()}</span>
              {t.suffix ? <span className="text-ink-faint">{t.suffix}</span> : null}
            </div>
            {t.bar !== undefined ? (
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-inset" aria-hidden>
                <div data-bar-fill className="h-full rounded-full bg-accent" style={{ width: `${Math.max(0, Math.min(100, t.bar))}%` }} />
              </div>
            ) : null}
            <p className="mt-auto mb-0 text-caption leading-[1.4] text-ink-muted" title={t.noteTitle}>
              {t.note}
            </p>
          </section>
        );
      })}
    </div>
  );
}
