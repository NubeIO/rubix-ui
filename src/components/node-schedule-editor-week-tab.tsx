// The editor's Weekly hours tab: the brush (one button per name with its value, and Clear, which paints
// the default), Names, the snap (1, 5, 15, 30, 60 minutes), "Make Tue–Fri the same as Monday", the
// grid, its legend with values, and the day and names sheets. With no hours yet the grid says so.
//
// One responsibility: the weekly hours tab.

import { useState } from "react";
import { Copy, Pencil } from "lucide-react";
import { Button } from "./button";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

import { copyDay, paintWeek, sameAsMonday, setDay } from "../lib/schedule/editNodeSchedule";
import { MAX_NAMES, type NodeSchedule } from "../lib/schedule/nodeSchedule";

import { nameValue } from "./node-schedule-editor-words";
import { NameSwatch } from "./name-swatch";
import { DaySheet } from "./node-schedule-editor-day-sheet";
import { NamesSheet } from "./node-schedule-editor-names-sheet";
import { PaintGrid } from "./node-schedule-editor-paint-grid";

const SNAPS: [number, string][] = [
  [1, "1 min"],
  [5, "5 min"],
  [15, "15 min"],
  [30, "30 min"],
  [60, "1 h"],
];
const CLEAR = "\u0000clear";

interface Props {
  doc: NodeSchedule;
  canEdit: boolean;
  /** The names can't be changed here (a box's own week takes the schedule's names). */
  namesFixed?: boolean;
  changed: ReadonlySet<number>;
  today: number | null;
  onChange: (doc: NodeSchedule) => void;
}

export function WeekTab({ doc, canEdit, namesFixed = false, changed, today, onChange }: Props) {
  const [brush, setBrush] = useState<string>(doc.names[1]?.name ?? CLEAR);
  const [snap, setSnap] = useState(15);
  const [day, setDayOpen] = useState<number | null>(null);
  const [namesOpen, setNamesOpen] = useState(false);
  // A brush whose name was renamed or removed falls back to the first name.
  const known = doc.names.some((n, i) => i > 0 && n.name === brush);
  const brushName = brush === CLEAR ? null : known ? brush : (doc.names[1]?.name ?? null);
  const empty = doc.week.every((d) => d.length === 0);

  return (
    <section className="grid gap-3">
      {canEdit && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-muted">Brush</span>
            <Tabs value={brushName ?? CLEAR} onValueChange={setBrush} className="gap-0">
              <TabsList aria-label="Brush">
                {doc.names.slice(1).map((n, i) => (
                  <TabsTrigger key={n.name} value={n.name} title={`Paint ${nameValue(n)}`} className="gap-1.5">
                    <NameSwatch index={i + 1} />
                    {n.name}
                    <span className="text-ink-faint">{n.value}</span>
                  </TabsTrigger>
                ))}
                <TabsTrigger value={CLEAR} title={`Paint the default, ${nameValue(doc.names[0])}`} className="gap-1.5">
                  <NameSwatch index={0} className="bg-transparent" />
                  Clear
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {!namesFixed && (
              <Button variant="ghost" size="sm" onClick={() => setNamesOpen(true)}>
                <Pencil />
                Names {doc.names.length}/{MAX_NAMES}
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-muted">Snap</span>
            <Tabs value={String(snap)} onValueChange={(v) => setSnap(Number(v))} className="gap-0">
              <TabsList aria-label="Snap">
                {SNAPS.map(([v, l]) => (
                  <TabsTrigger key={v} value={String(v)}>
                    {l}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => onChange(sameAsMonday(doc))}>
            <Copy />
            Make Tue–Fri the same as Monday
          </Button>
        </div>
      )}

      <div className="relative">
        <PaintGrid
          doc={doc}
          snap={snap}
          brush={brushName}
          canEdit={canEdit}
          changed={changed}
          today={today}
          onPaint={(days, from, to) => onChange(paintWeek(doc, days, from, to, brushName))}
          onOpenDay={setDayOpen}
        />
        {empty && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-6 ml-14 grid place-items-center">
            <div className="grid gap-1 rounded-lg border border-line bg-surface-card px-4 py-3 text-center">
              <span className="text-sm font-semibold text-ink-strong">No weekly hours yet</span>
              <span className="text-xs text-ink-muted">
                Pick a name above and drag across the days. Until then it runs {nameValue(doc.names[0])} all week.
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-caption text-ink-muted">
        {doc.names.slice(1).map((n, i) => (
          <span key={n.name} className="flex items-center gap-1.5">
            <NameSwatch index={i + 1} />
            <span className="text-ink">{n.name}</span>= {n.value}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <NameSwatch index={0} />
          <span className="text-ink">{doc.names[0].name} (default)</span>= {doc.names[0].value}
        </span>
      </div>
      {canEdit && (
        <span className="text-caption text-ink-faint">
          Drag to paint in {snap === 60 ? "1-hour" : `${snap}-minute`} steps; drag down to paint several days. Hover for
          exact times. Click a day's name to type exact minutes or copy that day to others.
        </span>
      )}

      <DaySheet
        day={day}
        doc={doc}
        canEdit={canEdit}
        onClose={() => setDayOpen(null)}
        onChange={(d, segs) => onChange(setDay(doc, d, segs))}
        onCopy={(d, to) => onChange(copyDay(doc, d, to))}
      />
      <NamesSheet open={namesOpen} doc={doc} canEdit={canEdit} onClose={() => setNamesOpen(false)} onChange={onChange} />
    </section>
  );
}
