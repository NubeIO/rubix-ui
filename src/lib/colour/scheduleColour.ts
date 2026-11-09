// A schedule's OWN colour: its identity dot in lists, pickers and legends, never its names (those go
// by `nameColour`). Stored on the record's `color` as a chart token name ("chart-8"), so it follows
// light and dark like every other token. A value this list does not know (an older `#rrggbb`) draws
// blue, the schedule series colour.
//
// One responsibility: the schedule colour choices and their classes.

export interface ScheduleColour {
  value: string;
  label: string;
  /** Tailwind fill class, written out whole so Tailwind generates it. */
  bg: string;
}

export const SCHEDULE_COLOURS: ScheduleColour[] = [
  { value: "chart-1", label: "Violet", bg: "bg-chart-1" },
  { value: "chart-2", label: "Teal", bg: "bg-chart-2" },
  { value: "chart-3", label: "Orange", bg: "bg-chart-3" },
  { value: "chart-4", label: "Sky", bg: "bg-chart-4" },
  { value: "chart-5", label: "Pink", bg: "bg-chart-5" },
  { value: "chart-7", label: "Amber", bg: "bg-chart-7" },
  { value: "chart-8", label: "Blue", bg: "bg-chart-8" },
];

/** The fill class for a stored colour; unknown values draw blue. */
export function scheduleColourClass(value: string | undefined): string {
  return SCHEDULE_COLOURS.find((c) => c.value === value)?.bg ?? "bg-chart-8";
}
