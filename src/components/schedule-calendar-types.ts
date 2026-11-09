// The plain data the schedule calendars draw. The app works out what a day runs (its own schedule
// logic) and hands the result here; nothing in these types knows lb, a record or a schedule rule.
//
// Minutes are minutes of the day (0 to 1439). A span's `end` is its LAST minute, inclusive: a block that
// runs to midnight ends at 1439 and reads "until 24:00".
//
// One responsibility: the calendar primitives' data shapes.

/** The four kinds of dated entry. */
export type ScheduleEntryKind = "extra" | "changed" | "closed" | "holiday";

/** One block of a day. */
export interface ScheduleSpan {
  /** First minute, 0 to 1439. */
  start: number;
  /** Last minute, inclusive. */
  end: number;
  /** The name's position, for its colour (`nameColour`): 1 to 5; 0 is the default (Off). */
  nameIndex: number;
  /** The name it runs ("Occupied"). */
  name: string;
  /** The words in the block when not the name (a dated entry's label). */
  label?: string;
  /** Extra hours draw a dashed edge, changed hours a solid one. */
  kind?: "extra" | "changed";
  /** The block's tooltip. Omitted: the label and its times. */
  title?: string;
}

/** A dated entry as a day names it. An empty label falls back to the kind's words ("Holiday"). */
export interface ScheduleNote {
  kind: ScheduleEntryKind;
  label: string;
}

/** One day of one schedule, already resolved. */
export interface ScheduleDay {
  /** `YYYY-MM-DD`. */
  date: string;
  spans: ScheduleSpan[];
  /** Closed all day (a closure or holiday): hatched, with its label. */
  closed?: ScheduleNote;
  /** The dated entries touching the day; the first is named when the day is not closed. */
  entries?: ScheduleNote[];
}

/** "Now": a wall date and minute (in the schedule's zone). */
export interface ScheduleMoment {
  date: string;
  minute: number;
}

/** A schedule as the calendars name it. */
export interface ScheduleRef {
  id: string;
  name: string;
  /** The schedule's own colour, a token value from `SCHEDULE_COLOURS` ("chart-8"). Unknown draws blue. */
  colour?: string;
}

/** One schedule's row in the all-schedules week. */
export interface ScheduleWeekRow extends ScheduleRef {
  /** Under the name: "Now: Occupied = 1", "Switched off". */
  status: string;
  /** Now in the schedule's zone; omitted (switched off), no now line and no ring. */
  now?: ScheduleMoment;
  /** The row's days, the same dates as the header, in order. */
  days: ScheduleDay[];
}

/** One dated entry on a day of the month, with every schedule that has it. */
export interface ScheduleChip extends ScheduleNote {
  schedules: ScheduleRef[];
}

/** One day of the month grid. */
export interface ScheduleMonthDay {
  date: string;
  chips: ScheduleChip[];
}

/** One row of "Dated entries this week / in <month>". */
export interface ScheduleListEntry extends ScheduleChip {
  /** The first day of the period it touches. */
  date: string;
  /** Its hours, written after the label. Same minutes as a span (`end` inclusive). */
  hours?: { start: number; end: number }[];
  /** The name position that colours an extra or changed chip. Default 1. */
  nameIndex?: number;
}

/** A legend entry: a name colour and what holds it. */
export interface ScheduleLegendItem {
  nameIndex: number;
  /** "Occupied", or "1st name". */
  label: string;
  /** After the label, muted: "Occupied · Trading". */
  detail?: string;
}
