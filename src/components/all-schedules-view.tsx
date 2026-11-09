// The all-schedules calendar's frame (Rubix Node Schedule Calendar): Week / Month, previous / next /
// Today, a search over the schedules, a chip per matching schedule that hides or shows it (only while
// few match: past `CHIP_LIMIT` a site with hundreds of schedules gets a count instead), the body the
// app puts in (`ScheduleWeekRows` or `ScheduleMonthGrid`), a legend of name positions and "Closures &
// holidays this week / in Nov" (lb's dated entries: closures, holidays, changed and extra hours).
//
// Plain data in, events out: the app owns the view, the period and which schedules are hidden, and
// resolves what the body and the list show.
//
// One responsibility: draw the calendar's controls, legend and dated list around its body.

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "../lib/cn";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

import { nameColour } from "../lib/colour/nameColour";
import { scheduleColourClass } from "../lib/colour/scheduleColour";
import type { ScheduleLegendItem, ScheduleListEntry, ScheduleRef } from "./schedule-calendar-types";
import { MONTHS, weekText } from "./schedule-calendar-words";
import { ScheduleCalendarNav } from "./schedule-calendar-nav";
import { ScheduleDatedList } from "./schedule-dated-list";
import { ScheduleLegendKeys } from "./schedule-legend-keys";

export type AllSchedulesViewMode = "week" | "month";

/** More matching schedules than this and the chips give way to a count: search to narrow. */
export const CHIP_LIMIT = 12;

export interface AllSchedulesViewProps {
  view: AllSchedulesViewMode;
  onViewChange: (view: AllSchedulesViewMode) => void;
  /** The period's first day: the week's Monday, or the month's 1st (`YYYY-MM-01`). */
  start: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  /** The period holds today: Today is off. */
  atToday: boolean;
  /** The schedules the search matches (every schedule while it is empty), for the chips. */
  schedules: ScheduleRef[];
  /** The search over schedules; the app matches it and passes the matches as `schedules`. */
  search: string;
  onSearch: (q: string) => void;
  /** What the app calls a schedule, for the search and the count ("group", "groups"). */
  noun?: { one: string; many: string };
  /** Ids of the schedules switched off by their chip. */
  hidden: string[];
  onToggle: (id: string) => void;
  /** Name positions and the names that hold them ("1st name", "Occupied · Trading"). */
  legend: ScheduleLegendItem[];
  /** The period's dated entries. */
  entries: ScheduleListEntry[];
  /** Today in the viewer's zone. */
  today: string;
  /** The week rows or the month grid. */
  children: ReactNode;
}

export function AllSchedulesView({
  view,
  onViewChange,
  start,
  schedules,
  search,
  onSearch,
  noun = { one: "schedule", many: "schedules" },
  hidden,
  onToggle,
  legend,
  entries,
  today,
  children,
  ...nav
}: AllSchedulesViewProps) {
  const mon = MONTHS[Number(start.slice(5, 7)) - 1];
  const label = view === "week" ? weekText(start) : `${mon} ${start.slice(0, 4)}`;

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tabs value={view} onValueChange={(v) => onViewChange(v as AllSchedulesViewMode)} className="gap-0">
          <TabsList aria-label="Calendar view">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
        <ScheduleCalendarNav unit={view} label={label} {...nav} />
        <label className="relative ml-auto">
          <Search
            size={14}
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <Input
            aria-label={`Search ${noun.many}`}
            className="h-8 w-56 pl-8 text-xs"
            placeholder={`Search ${noun.many}…`}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </label>
      </div>
      {schedules.length > CHIP_LIMIT ? (
        <p className="text-caption text-ink-muted">
          Showing all {schedules.length.toLocaleString()} {search.trim() ? `matching ${noun.many}` : noun.many}. Search
          to pick fewer.
        </p>
      ) : schedules.length === 0 ? (
        search.trim() && (
          <p className="text-caption text-ink-muted">
            No {noun.one} matches “{search.trim()}”.
          </p>
        )
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {schedules.map((s) => {
            const on = !hidden.includes(s.id);
            return (
              <Button
                key={s.id}
                variant="outline"
                size="sm"
                aria-pressed={on}
                className={cn("rounded-full", !on && "text-ink-faint")}
                onClick={() => onToggle(s.id)}
              >
                <span
                  aria-hidden
                  className={cn("size-2 rounded-full", on ? scheduleColourClass(s.colour) : "bg-ink-faint")}
                />
                {s.name}
              </Button>
            );
          })}
        </div>
      )}

      {children}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted">
        {legend.map((p) => (
          <span key={`${p.nameIndex}|${p.label}`} className="flex items-center gap-1.5">
            <span aria-hidden className={cn("size-2.5 rounded-xs", nameColour(p.nameIndex).bg)} />
            <span className="text-ink">{p.label}</span>
            {p.detail}
          </span>
        ))}
        <ScheduleLegendKeys />
      </div>

      <ScheduleDatedList
        title={view === "week" ? "Closures & holidays this week" : `Closures & holidays in ${mon}`}
        entries={entries}
        today={today}
      />
    </section>
  );
}
