// A ring of parts (the UART Overview's Fleet health): each part an arc of its share of the total, in
// its own colour and the given order, with a hair gap between neighbours, and a value and caption in
// the middle ("67%" · "healthy"). Decorative: the rows beside it should carry every count in words; a
// part's `label` is only its hover tooltip ("20 running, no issues · 48%").
//
// Plain data in: the app counts and picks the colours (a part the middle counts should share its hue,
// so the arcs read as the middle's share).
//
// One responsibility: draw the parts as a ring.

import { tone } from "../lib/tone";

export interface RingSegment {
  key: string;
  value: number;
  /** A colour token without `--`. */
  tone: string;
  /** The tone's alpha, 0–1 (a lighter shade of a neighbour's hue). */
  alpha?: number;
  /** The arc's hover tooltip: what the part is and how many ("20 running, no issues · 48%"). */
  label?: string;
}

export interface SegmentRingProps {
  segments: RingSegment[];
  /** What the arcs are shares of; the segments usually add up to it. */
  total: number;
  /** In the middle, large: "67%". "—" when `total` is 0. */
  value: string;
  /** Under it, small: "healthy". */
  caption?: string;
  /** Outer size in px (148). */
  size?: number;
  /** Ring thickness in px (14). */
  thickness?: number;
}

/** A hair between arcs, so neighbours read as two. */
const GAP = 2;

export function SegmentRing({ segments, total, value, caption, size = 148, thickness = 14 }: SegmentRingProps) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let at = 0;
  const arcs = segments
    .filter((s) => s.value > 0 && total > 0)
    .map((s) => {
      const len = (s.value / total) * c;
      // The gap comes out of the arc's own slot; a sliver too short to spare it is drawn whole, never
      // stretched past its slot into the next arc.
      const arc = { key: s.key, label: s.label, color: tone(s.tone, s.alpha), len: len > 2 * GAP ? len - GAP : len, at };
      at += len;
      return arc;
    });
  const mid = size / 2;
  return (
    <div className="relative flex-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="-rotate-90">
        <circle cx={mid} cy={mid} r={r} fill="none" strokeWidth={thickness} style={{ stroke: tone("surface-inset") }} />
        {arcs.map((a) => (
          <circle
            key={a.key}
            data-arc={a.key}
            cx={mid}
            cy={mid}
            r={r}
            fill="none"
            strokeWidth={thickness}
            // A lone part closes the ring; between two or more, the hair gap shows.
            strokeDasharray={arcs.length === 1 ? undefined : `${a.len} ${c - a.len}`}
            strokeDashoffset={arcs.length === 1 ? undefined : -a.at}
            style={{ stroke: a.color }}
          >
            {a.label ? <title>{a.label}</title> : null}
          </circle>
        ))}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-value-lg leading-none font-semibold tracking-tight tabular-nums text-ink-strong">{total > 0 ? value : "—"}</span>
        {caption ? <span className="text-caption text-ink-muted">{caption}</span> : null}
      </div>
    </div>
  );
}
