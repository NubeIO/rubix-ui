// The weekly hours grid (Rubix Node Schedule Editor, Weekly hours): seven rows, Monday first, over a
// midnight-to-midnight axis, each block in its name's colour. Dragging along a row paints the brush in
// `snap`-minute steps; dragging down paints several days at once. A click without a drag opens that
// day's sheet, as does a day's name. Hovering reads out the minute and the block under it:
// "Tue 14:20 · Occupied = 1" over "07:00 until 18:00 · stored 07:00–17:59". A day with unsaved edits
// carries an accent dot.
//
// Adapted from the Schedules page's on/off `WeekGrid` (PR #577) for named blocks.
//
// One responsibility: draw and paint the week.

import { useRef, useState, type PointerEvent } from "react";
import { cn } from "../lib/cn";

import { nameColour } from "../lib/schedule/nameColour";
import { DAY_MINUTES, hhmm, nameIndex, OFF, valueOf, type NodeSchedule } from "../lib/schedule/nodeSchedule";

import { DAY_LONG, DAY_NAMES, untilText } from "./node-schedule-editor-words";

interface Drag {
  r0: number;
  m0: number;
  r1: number;
  m1: number;
}

interface Props {
  doc: Pick<NodeSchedule, "names" | "week">;
  snap: number;
  /** The name painted; null paints Off (Clear). */
  brush: string | null;
  canEdit: boolean;
  changed: ReadonlySet<number>;
  /** 0 = Monday, drawn in the accent; null when this week's today is not known. */
  today: number | null;
  onPaint: (days: number[], from: number, to: number) => void;
  onOpenDay: (day: number) => void;
}

const pct = (m: number) => `${(m / DAY_MINUTES) * 100}%`;
const AXIS = [0, 3, 6, 9, 12, 15, 18, 21, 24];
const LINES = [3, 6, 9, 12, 15, 18, 21];
/** A block narrower than this many minutes shows no times inside. */
const LABEL_MIN = 150;

export function PaintGrid({ doc, snap, brush, canEdit, changed, today, onPaint, onOpenDay }: Props) {
  const [drag, setDrag] = useState<Drag | null>(null);
  const [hover, setHover] = useState<{ r: number; m: number } | null>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  const fraction = (r: number, e: PointerEvent) => {
    const box = rows.current[r]?.getBoundingClientRect();
    return box && box.width > 0 ? (e.clientX - box.left) / box.width : 0;
  };
  const snapped = (r: number, e: PointerEvent) =>
    Math.max(0, Math.min(DAY_MINUTES, Math.round((fraction(r, e) * DAY_MINUTES) / snap) * snap));
  const raw = (r: number, e: PointerEvent) =>
    Math.max(0, Math.min(DAY_MINUTES - 1, Math.floor(fraction(r, e) * DAY_MINUTES)));

  const moved = !!drag && (drag.r0 !== drag.r1 || drag.m0 !== drag.m1);
  const lo = drag ? Math.min(drag.r0, drag.r1) : 0;
  const hi = drag ? Math.max(drag.r0, drag.r1) : 0;
  const from = drag ? Math.min(drag.m0, drag.m1) : 0;
  const to = drag ? Math.max(drag.m0, drag.m1) : 0;
  const label = (name: string | null) =>
    `${name ?? OFF} = ${valueOf(doc, name)}${name === null || name === OFF ? " (default)" : ""}`;

  const finish = () => {
    if (!drag) return;
    setDrag(null);
    if (!moved) onOpenDay(drag.r0);
    else if (to > from) onPaint(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i), from, to);
  };

  const tip = (r: number): { at: number; a: string; b: string } | null => {
    if (drag && moved && r === lo) {
      const days = hi > lo ? `${DAY_NAMES[lo]}–${DAY_NAMES[hi]}` : DAY_NAMES[lo];
      return {
        at: (from + to) / 2,
        a: brush === null ? `Clear to ${label(null)}` : label(brush),
        b: `${days} ${hhmm(from)} until ${to >= DAY_MINUTES ? "24:00" : hhmm(to)}`,
      };
    }
    if (drag || hover?.r !== r) return null;
    const segs = doc.week[r] ?? [];
    const seg = segs.find((s) => s.start <= hover.m && hover.m <= s.end);
    const start = seg?.start ?? Math.max(0, ...segs.filter((s) => s.end < hover.m).map((s) => s.end + 1));
    const end = seg?.end ?? Math.min(DAY_MINUTES, ...segs.filter((s) => s.start > hover.m).map((s) => s.start)) - 1;
    return {
      at: hover.m,
      a: `${DAY_NAMES[r]} ${hhmm(hover.m)} · ${label(seg?.name ?? null)}`,
      b: `${hhmm(start)} until ${untilText(end)}  ·  stored ${hhmm(start)}–${hhmm(end)}`,
    };
  };

  return (
    <div
      role="grid"
      aria-label="Weekly hours"
      className="grid select-none grid-cols-[3.5rem_minmax(0,1fr)] gap-y-1.5"
      onPointerUp={finish}
      onPointerLeave={finish}
    >
      <span />
      <div className="relative h-4">
        {AXIS.map((h, i) => (
          <span
            key={h}
            className={cn(
              "absolute top-0 font-mono text-caption text-ink-faint",
              i === 0 ? "" : i === AXIS.length - 1 ? "-translate-x-full" : "-translate-x-1/2",
            )}
            style={{ left: pct(h * 60) }}
          >
            {String(h).padStart(2, "0")}
          </span>
        ))}
      </div>
      {DAY_NAMES.map((day, r) => {
        const t = tip(r);
        const painting = moved && r >= lo && r <= hi && to > from;
        const brushTone = nameColour(brush === null ? 0 : nameIndex(doc, brush));
        return (
          <div key={day} role="row" className="contents">
            <button
              type="button"
              title={`Exact times for ${day}`}
              aria-label={`${DAY_LONG[r]}: exact times`}
              className={cn(
                "flex h-[30px] items-center gap-1.5 self-center text-left text-xs font-semibold hover:text-accent",
                r === today ? "text-accent" : "text-ink",
              )}
              onClick={() => onOpenDay(r)}
            >
              {day}
              {changed.has(r) && <span title="Unsaved change" className="size-1.5 rounded-full bg-accent" />}
            </button>
            <div
              ref={(el) => {
                rows.current[r] = el;
              }}
              data-testid={`week-row-${r}`}
              className={cn(
                "relative h-[30px] rounded-md bg-surface-inset",
                canEdit && "cursor-crosshair touch-none",
              )}
              onPointerDown={(e) => {
                if (!canEdit || e.button !== 0) return;
                e.preventDefault();
                const m = snapped(r, e);
                setDrag({ r0: r, m0: m, r1: r, m1: m });
                setHover(null);
              }}
              onPointerMove={(e) => {
                if (drag) {
                  const m = snapped(r, e);
                  if (m !== drag.m1 || r !== drag.r1) setDrag({ ...drag, r1: r, m1: m });
                } else setHover({ r, m: raw(r, e) });
              }}
              onPointerLeave={() => setHover(null)}
            >
              <div className="absolute inset-0 overflow-hidden rounded-md">
                {LINES.map((h) => (
                  <span
                    key={h}
                    className={cn("absolute inset-y-0 w-px", h % 6 === 0 ? "bg-line-strong" : "bg-line/60")}
                    style={{ left: pct(h * 60) }}
                  />
                ))}
                {(doc.week[r] ?? []).map((s) => {
                  const tone = nameColour(nameIndex(doc, s.name));
                  return (
                    <span
                      key={s.start}
                      data-block={s.name}
                      className={cn(
                        "pointer-events-none absolute inset-y-[3px] flex items-center overflow-hidden whitespace-nowrap rounded-sm px-1.5 font-mono text-caption",
                        tone.bg,
                        tone.text,
                      )}
                      style={{ left: pct(s.start), width: pct(s.end + 1 - s.start) }}
                    >
                      {s.end + 1 - s.start >= LABEL_MIN ? `${hhmm(s.start)}–${untilText(s.end)}` : ""}
                    </span>
                  );
                })}
                {painting && (
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-y-[3px] rounded-sm border border-dashed border-ink-strong",
                      brushTone.bg,
                    )}
                    style={{ left: pct(from), width: pct(to - from) }}
                  />
                )}
              </div>
              {t && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full z-10 mb-1 grid -translate-x-1/2 gap-0.5 whitespace-pre rounded-md border border-line bg-surface-card px-2.5 py-1.5 text-xs text-ink shadow-(--elev-popover)"
                  style={{ left: `clamp(7rem, ${pct(t.at)}, calc(100% - 7rem))` }}
                >
                  <span className="font-semibold text-ink-strong">{t.a}</span>
                  <span className="text-ink-muted">{t.b}</span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
