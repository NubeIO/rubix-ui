// The editor's Dated entries tab (design 2a, the list): filter by kind with counts, Add dated entry, and
// one row per entry sorted by its next occurrence. Yearly entries show their next date with "Every
// year"; one-off entries already past fade to the foot of the list; the entry running today is tinted.
//
// One responsibility: list, filter and remove dated entries.

import { useState } from "react";
import { Plus, Repeat, Trash2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/cn";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

import { isPast, nextWindow } from "../lib/schedule/datedWindows";
import {
  defaultName,
  hhmm,
  nameIndex,
  type DatedItem,
  type DatedKind,
  type NodeSchedule,
} from "../lib/schedule/nodeSchedule";
import { addDays } from "../lib/date";

import { dateText, nameText, untilText } from "./node-schedule-editor-words";
import { KindChip, KINDS } from "./node-schedule-editor-dated-kinds";

type Filter = "all" | DatedKind;
const FILTERS: Filter[] = ["all", "extra", "changed", "closed", "holiday"];

interface Props {
  doc: NodeSchedule;
  canEdit: boolean;
  /** Today in the schedule's zone, `YYYY-MM-DD`. */
  today: string;
  onAdd: () => void;
  onChange: (doc: NodeSchedule) => void;
}

/** "Wed 11 Nov", or "Thu 24 Dec – Fri 1 Jan 2027" for a range, at its next occurrence. */
export function whenText(item: DatedItem, today: string): string {
  const w = nextWindow(item, today);
  const first = w.start.slice(0, 10);
  const last = w.end.endsWith("T00:00") ? addDays(w.end.slice(0, 10), -1) : w.end.slice(0, 10);
  return last > first ? `${dateText(first, today)} – ${dateText(last, today)}` : dateText(first, today);
}

/** What the entry does: "Only 10:00 until 18:00 · Occupied = 1". */
export function detailText(item: DatedItem, doc: NodeSchedule, past: boolean): string {
  const span = (start: number, end: number) => `${hhmm(start)} until ${untilText(end)}`;
  const runs = nameText(doc, item.name ?? defaultName(doc));
  if (item.kind === "extra" && item.start !== undefined && item.end !== undefined)
    return `Open ${span(item.start, item.end)} · ${runs} on top of the week`;
  if (item.kind === "changed") {
    const hours = (item.hours ?? []).map((h) => span(h.start, h.end)).join(", ");
    return hours ? `Only ${hours} · ${runs}` : `Off all day · ${nameText(doc, null)}`;
  }
  const timed = item.start !== undefined && item.end !== undefined;
  const part = timed ? `Off ${span(item.start ?? 0, item.end ?? 0)}` : "Off all day";
  return `${past ? "Past · " : ""}${part} · ${nameText(doc, null)}`;
}

export function DatedTab({ doc, canEdit, today, onAdd, onChange }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const count = (f: Filter) => doc.dated.filter((e) => f === "all" || e.kind === f).length;
  const rows = doc.dated
    .filter((e) => filter === "all" || e.kind === filter)
    .map((e) => ({ e, past: isPast(e, today), next: nextWindow(e, today) }))
    .sort((a, b) => Number(a.past) - Number(b.past) || a.next.start.localeCompare(b.next.start));
  const dayStart = `${today}T00:00`;

  return (
    <section className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="gap-0">
          <TabsList aria-label="Kind">
            {FILTERS.map((f) => (
              <TabsTrigger key={f} value={f} className="gap-1.5">
                {f === "all" ? "All" : KINDS[f].filter}
                <span className="text-ink-faint">{count(f)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {canEdit && (
          <Button variant="outline" size="sm" className="ml-auto" onClick={onAdd}>
            <Plus />
            Add dated entry
          </Button>
        )}
      </div>
      <p className="text-xs text-ink-muted">
        Dates that differ from the week. Extra hours open on top of the week; changed hours replace that day's
        hours. Closed and holiday switch the schedule off for the day, over everything else.
      </p>
      <ul aria-label="Dated entries" className="divide-y divide-line overflow-hidden rounded-lg border border-line">
        {rows.length === 0 && (
          <li className="p-4 text-center text-xs text-ink-faint">
            {doc.dated.length ? "Nothing matches" : "No dated entries. The week runs as it is every week."}
          </li>
        )}
        {rows.map(({ e, past, next }) => (
          <li
            key={e.id}
            className={cn(
              "grid min-h-12 grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_auto_2rem] items-center gap-3 py-2 pl-3.5 pr-1.5",
              past && "opacity-55",
              next.start <= dayStart && next.end > dayStart && "bg-accent/6",
            )}
          >
            <div className="grid gap-0.5">
              <span className="text-xs font-semibold text-ink-strong">{whenText(e, today)}</span>
              {e.yearly && (
                <span className="flex items-center gap-1 text-caption text-ink-muted">
                  <Repeat className="size-3" />
                  Every year
                </span>
              )}
            </div>
            <div className="grid min-w-0 gap-0.5">
              <span className="truncate text-xs font-medium text-ink-strong">{e.label || KINDS[e.kind].label}</span>
              <span className="truncate text-caption text-ink-muted">{detailText(e, doc, past)}</span>
            </div>
            <KindChip kind={e.kind} nameIndex={nameIndex(doc, e.name ?? defaultName(doc))} />
            {canEdit ? (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${e.label || KINDS[e.kind].label}`}
                title="Remove"
                onClick={() => onChange({ ...doc, dated: doc.dated.filter((x) => x.id !== e.id) })}
              >
                <Trash2 />
              </Button>
            ) : (
              <span />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
