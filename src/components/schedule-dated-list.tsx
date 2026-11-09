// The "Dated entries this week / in <month>" list under the all-schedules calendar: one row per entry,
// date | label and hours | the schedules that have it | kind chip, so a holiday several schedules share
// lists once.
//
// One responsibility: draw the period's dated entries.

import { cn } from "../lib/cn";

import { scheduleColourClass } from "../lib/colour/scheduleColour";
import type { ScheduleListEntry } from "./schedule-calendar-types";
import { dateText, spanText } from "./schedule-calendar-words";
import { KindChip } from "./schedule-kinds";

export function ScheduleDatedList({
  title,
  entries,
  today,
}: {
  title: string;
  entries: ScheduleListEntry[];
  today: string;
}) {
  return (
    <div className="grid gap-2">
      <h3 className="text-sm font-semibold text-ink-strong">{title}</h3>
      <ul
        aria-label="Dated entries in this period"
        className="divide-y divide-line overflow-hidden rounded-lg border border-line"
      >
        {entries.length === 0 && <li className="p-4 text-center text-xs text-ink-faint">No dated entries.</li>}
        {entries.map((e) => (
          <li
            key={`${e.kind}|${e.label}`}
            className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,1.2fr)_auto] items-center gap-3 px-3.5 py-2.5"
          >
            <span className="text-xs font-semibold text-ink-strong">{dateText(e.date, today)}</span>
            <span className="truncate text-xs text-ink">
              {e.label}
              {(e.hours ?? []).map((h) => ` · ${spanText(h.start, h.end)}`).join("")}
            </span>
            <span className="flex min-w-0 flex-wrap gap-x-3 gap-y-1">
              {e.schedules.map((s) => (
                <span key={s.id} className="flex items-center gap-1.5 whitespace-nowrap text-caption text-ink-muted">
                  <span aria-hidden className={cn("size-1.5 rounded-full", scheduleColourClass(s.colour))} />
                  {s.name}
                </span>
              ))}
            </span>
            <KindChip kind={e.kind} nameIndex={e.nameIndex ?? 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}
