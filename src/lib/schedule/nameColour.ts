// The colour of a schedule NAME, by its position (node schedule handoff, "Colour per name"): the
// default (0) has none; 1 blue `--chart-8`, 2 amber `--chart-7`, 3 teal `--chart-2`, 4 violet
// `--chart-1`, 5 pink `--chart-5`, solid, with `--on-solid` ink. Independent of the schedule's own
// colour, so Occupied looks the same in every schedule. The editor, the calendars and (later) the
// dashboard week view and chart shading all draw names through this one function.
//
// Classes are written out whole so Tailwind generates them.
//
// One responsibility: name position → colour.

export interface NameTone {
  /** The CSS custom property, or null for the default. */
  token: string | null;
  /** A CSS colour for inline styles and SVG. */
  css: string;
  /** Tailwind classes: fill, border, ink. */
  bg: string;
  border: string;
  text: string;
}

const DEFAULT_TONE: NameTone = {
  token: null,
  css: "hsl(var(--surface-inset))",
  bg: "bg-surface-inset",
  border: "border-line-strong",
  text: "text-ink-muted",
};

const TONES: NameTone[] = [
  { token: "--chart-8", css: "hsl(var(--chart-8))", bg: "bg-chart-8", border: "border-chart-8", text: "text-on-solid" },
  { token: "--chart-7", css: "hsl(var(--chart-7))", bg: "bg-chart-7", border: "border-chart-7", text: "text-on-solid" },
  { token: "--chart-2", css: "hsl(var(--chart-2))", bg: "bg-chart-2", border: "border-chart-2", text: "text-on-solid" },
  { token: "--chart-1", css: "hsl(var(--chart-1))", bg: "bg-chart-1", border: "border-chart-1", text: "text-on-solid" },
  { token: "--chart-5", css: "hsl(var(--chart-5))", bg: "bg-chart-5", border: "border-chart-5", text: "text-on-solid" },
];

/** The tone of the name at `index` (0 = the default). Past the fifth name it stays pink. */
export function nameColour(index: number): NameTone {
  if (index <= 0) return DEFAULT_TONE;
  return TONES[Math.min(index, TONES.length) - 1];
}
