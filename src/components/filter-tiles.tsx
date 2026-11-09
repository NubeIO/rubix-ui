// A row of count tiles that filter a list (Rubix UART "Units" summary): an icon and title, the count,
// and a footer with a note and "Filter →" in the tile's tone. The first tile is the whole list; picking
// a tile filters, picking it again goes back to the first. The pressed tile has the accent edge.
//
// Plain data in: the app counts and filters.
//
// It follows rubix-ai's Insights `SummaryTile` (same design); keep the two alike.
//
// One responsibility: draw the tiles and report a pick.

import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export interface FilterTile {
  key: string;
  label: string;
  count: number;
  /** A colour token without `--` ("accent", "success", "destructive", "ink-muted", "chart-8"). */
  tone: string;
  icon: ReactNode;
  /** The footer's note ("69% of units", "Comms, stale data or a fault"). */
  note: string;
  /** A non-zero count reads in the alarm colour (Issues, Needs attention). */
  alarm?: boolean;
}

export interface FilterTilesProps {
  /** The first is the whole list: it has no "Filter →" and picking any pressed tile returns to it. */
  tiles: FilterTile[];
  active: string;
  onPick: (key: string) => void;
  /** The row's accessible name ("Schedule summary"). */
  label: string;
  /** Tile height in px: 120 by default, 96 for the design's phone row (under 720px wide). */
  height?: number;
}

export function FilterTiles({ tiles, active, onPick, label, height = 120 }: FilterTilesProps) {
  const all = tiles[0]?.key;
  return (
    <div
      role="group"
      aria-label={label}
      className="grid flex-none auto-cols-[minmax(148px,1fr)] grid-flow-col gap-[var(--grid-gutter,10px)] overflow-x-auto border-b border-line bg-surface-card px-4 py-3"
    >
      {tiles.map((t) => {
        const on = t.key === active;
        const tone = `hsl(var(--${t.tone}))`;
        // A grey tone would make "Filter →" read as disabled: the link takes the accent instead.
        const link = t.tone.startsWith("ink") ? "hsl(var(--accent))" : tone;
        return (
          <button
            key={t.key}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(on || t.key === all ? all : t.key)}
            // Height and shadow inline: an extension's own unlayered utilities beat this package's layered
            // ones, and a comma inside a class name trips the scoped-CSS guard.
            style={{
              height,
              boxShadow: on ? "0 0 0 1px hsl(var(--accent) / .4), var(--elev-panel)" : "var(--elev-panel)",
            }}
            className={cn(
              // Focus as an outline: the shadow is inline (above), so a ring utility would be overridden.
              "flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-panel border bg-surface-card p-0 text-left text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              on ? "border-accent/60" : "border-line",
            )}
          >
            <span className="flex h-8 flex-none items-center gap-[7px] px-2.5">
              <span aria-hidden className="flex size-4 [&_svg]:size-4" style={{ color: tone }}>
                {t.icon}
              </span>
              <span className="min-w-0 truncate text-sm font-semibold text-ink-strong">{t.label}</span>
            </span>
            <span
              className={cn(
                "flex flex-1 items-center justify-center text-value-lg leading-none font-semibold tabular-nums",
                t.alarm && t.count > 0 ? "text-destructive" : "text-ink-strong",
              )}
            >
              {t.count.toLocaleString()}
            </span>
            <span className="flex h-7 flex-none items-center gap-2 border-t border-line px-2.5 text-caption">
              <span className="min-w-0 flex-1 truncate text-ink-muted" title={t.note}>
                {t.note}
              </span>
              {t.key !== all && (
                <span aria-hidden className="flex-none whitespace-nowrap" style={{ color: link }}>
                  Filter →
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
