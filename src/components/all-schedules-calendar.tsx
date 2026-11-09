// The all-schedules calendar (Rubix Node Schedule Calendar): every schedule at once, shared by the
// Schedules page's Calendar tab and, later, the Schedule Groups extension's Calendar tab. Data in,
// events out like the editor (brief, decision 4): schedules come in as `NodeSchedule`s, opening one is
// `onOpen(id)`; no API client, router or app component.
//
// Week (a row per schedule) or Month (dated entries on their days), previous / next / Today, schedule
// chips that hide or show a schedule, a legend of name positions, and "Dated entries this week / in
// <month>" with the schedules each applies to. Every day goes through `resolveDay`, every name colour
// through `nameColour`, the same as the editor.
//
// One responsibility: compose the calendar and own its view, period and hidden schedules.

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/cn";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

import { nameColour } from "../lib/schedule/nameColour";
import { hhmm, type NodeSchedule } from "../lib/schedule/nodeSchedule";
import { nowAndNext, wallAt } from "../lib/schedule/nowAndNext";
import { addDays } from "../lib/date";
import { scheduleColourClass } from "../lib/schedule/scheduleColour";

import { HATCH, KindChip } from "./node-schedule-editor-dated-kinds";
import { dateText, mondayOf, untilText, weekText } from "./node-schedule-editor-words";
import { CalendarMonth } from "./all-schedules-calendar-month";
import { CalendarWeekRows } from "./all-schedules-calendar-week-rows";
import { dayTable, periodEntries } from "./all-schedules-calendar-entries";

export interface AllSchedulesCalendarProps {
  schedules: NodeSchedule[];
  /** Open a schedule (its name in a week row). */
  onOpen?: (id: string) => void;
  /** The current instant (epoch ms). Omitted, the calendar follows the clock. */
  now?: number;
}

type View = "week" | "month";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const ORDINAL = ["1st", "2nd", "3rd", "4th", "5th"];

const viewerZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

/** The first of the month `offset` months from `date`'s, as `YYYY-MM`. */
function monthOf(date: string, offset: number): string {
  const d = new Date(Date.UTC(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1 + offset, 1));
  return d.toISOString().slice(0, 7);
}

const range = (from: string, to: string) => {
  const out = [from];
  while (out[out.length - 1] < to) out.push(addDays(out[out.length - 1], 1));
  return out;
};

function useClock(fixed: number | undefined): number {
  const [now, setNow] = useState(() => fixed ?? Date.now());
  useEffect(() => {
    if (fixed !== undefined) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [fixed]);
  return fixed ?? now;
}

export function AllSchedulesCalendar({ schedules, onOpen, now: fixed }: AllSchedulesCalendarProps) {
  const now = useClock(fixed);
  const [view, setView] = useState<View>("week");
  const [offset, setOffset] = useState(0);
  const [hidden, setHidden] = useState<string[]>([]);
  const today = wallAt(now, viewerZone()).date;
  const shown = schedules.filter((s) => !hidden.includes(s.id));

  const month = monthOf(today, offset);
  const monthEnd = addDays(monthOf(today, offset + 1) + "-01", -1);
  const days =
    view === "week"
      ? range(addDays(mondayOf(today), offset * 7), addDays(mondayOf(today), offset * 7 + 6))
      : range(mondayOf(`${month}-01`), addDays(mondayOf(monthEnd), 6));
  const period = view === "week" ? days : range(`${month}-01`, monthEnd);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- `shown` and `days` follow these keys
  const table = useMemo(() => dayTable(shown, days), [schedules, hidden, days.join()]);
  const states = useMemo(() => new Map(schedules.map((s) => [s.id, nowAndNext(s, now)])), [schedules, now]);
  const list = periodEntries(shown, table, period);
  const label = view === "week" ? weekText(days[0]) : `${MONTHS[Number(month.slice(5)) - 1]} ${month.slice(0, 4)}`;

  // The legend: each name position with the names that hold it in the shown schedules.
  const positions = ORDINAL.map((ord, i) => ({
    ord,
    index: i + 1,
    names: [...new Set(shown.map((s) => s.names[i + 1]?.name).filter(Boolean))],
  })).filter((p) => p.names.length > 0);

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tabs
          value={view}
          onValueChange={(v) => {
            setView(v as View);
            setOffset(0);
          }}
          className="gap-0"
        >
          <TabsList aria-label="Calendar view">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Previous ${view}`}
          onClick={() => setOffset((o) => o - 1)}
        >
          <ChevronLeft />
        </Button>
        <span className="min-w-36 text-center text-sm font-semibold text-ink-strong">{label}</span>
        <Button variant="ghost" size="icon-sm" aria-label={`Next ${view}`} onClick={() => setOffset((o) => o + 1)}>
          <ChevronRight />
        </Button>
        <Button variant="outline" size="sm" disabled={offset === 0} onClick={() => setOffset(0)}>
          Today
        </Button>
        <div className="ml-auto flex flex-wrap gap-1.5">
          {schedules.map((s) => {
            const on = !hidden.includes(s.id);
            return (
              <Button
                key={s.id}
                variant="outline"
                size="sm"
                aria-pressed={on}
                className={cn("rounded-full", !on && "text-ink-faint")}
                onClick={() => setHidden((h) => (on ? [...h, s.id] : h.filter((x) => x !== s.id)))}
              >
                <span
                  aria-hidden
                  className={cn("size-2 rounded-full", on ? scheduleColourClass(s.color) : "bg-ink-faint")}
                />
                {s.name}
              </Button>
            );
          })}
        </div>
      </div>

      {view === "week" ? (
        <CalendarWeekRows schedules={shown} days={days} table={table} today={today} now={states} onOpen={onOpen} />
      ) : (
        <CalendarMonth schedules={shown} days={days} month={month} table={table} today={today} />
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-ink-muted">
        {positions.map((p) => (
          <span key={p.index} className="flex items-center gap-1.5">
            <span aria-hidden className={cn("size-2.5 rounded-xs", nameColour(p.index).bg)} />
            <span className="text-ink">{p.ord} name</span>
            {p.names.join(" · ")}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-xs border border-dashed border-ink-strong" />
          Extra hours
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-xs border border-line-strong" style={HATCH} />
          Closed or holiday
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-0.5 bg-destructive" />
          Now
        </span>
      </div>

      <div className="grid gap-2">
        <h3 className="text-sm font-semibold text-ink-strong">
          {view === "week" ? "Dated entries this week" : `Dated entries in ${MONTHS[Number(month.slice(5)) - 1]}`}
        </h3>
        <ul aria-label="Dated entries in this period" className="divide-y divide-line overflow-hidden rounded-lg border border-line">
          {list.length === 0 && <li className="p-4 text-center text-xs text-ink-faint">No dated entries.</li>}
          {list.map(({ date, item, schedules: who }) => {
            const times =
              item.start !== undefined && item.end !== undefined
                ? ` · ${hhmm(item.start)}–${untilText(item.end)}`
                : (item.hours ?? []).map((h) => ` · ${hhmm(h.start)}–${untilText(h.end)}`).join("");
            return (
              <li
                key={`${item.kind}|${item.label}`}
                className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,auto)_auto] items-center gap-3 px-3.5 py-2.5"
              >
                <span className="text-xs font-semibold text-ink-strong">{dateText(date, today)}</span>
                <span className="truncate text-xs text-ink">
                  {item.label}
                  {times}
                </span>
                <span className="flex flex-wrap gap-x-3 gap-y-1">
                  {who.map((s) => (
                    <span key={s.id} className="flex items-center gap-1.5 text-caption text-ink-muted">
                      <span aria-hidden className={cn("size-1.5 rounded-full", scheduleColourClass(s.color))} />
                      {s.name}
                    </span>
                  ))}
                </span>
                <KindChip kind={item.kind} nameIndex={1} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
