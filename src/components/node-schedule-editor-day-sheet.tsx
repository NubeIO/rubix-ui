// One weekday to the minute (the editor's day sheet): its blocks as Name / From / Until rows, add and
// remove, and "Copy <day> to" other days. Until is shown as the stop time and stored inclusive: until
// 18:00 is stored 17:59, until 00:00 is the end of the day (23:59). Each edit goes straight into the
// draft; a row whose Until is not after its From waits, unsaved, until it is.
//
// One responsibility: the day sheet of the weekly hours.

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/cn";
import { Input } from "./input";
import { Select } from "./select";

import { hhmm, parseHHMM, type NodeSchedule, type Seg } from "../lib/schedule/nodeSchedule";

import { DAY_NAMES, untilInput } from "./node-schedule-editor-words";
import { EditorSheet } from "./node-schedule-editor-sheet";

interface Row {
  name: string;
  from: string;
  until: string;
}

interface Props {
  day: number | null;
  doc: NodeSchedule;
  canEdit: boolean;
  onClose: () => void;
  onChange: (day: number, segs: Seg[]) => void;
  onCopy: (day: number, to: number[]) => void;
}

/** A row as a block, or null while Until is not after From. Until 00:00 is the end of the day. */
export function rowToSeg(row: Row): Seg | null {
  const start = parseHHMM(row.from);
  const stop = parseHHMM(row.until);
  if (start === null || stop === null) return null;
  const end = stop === 0 ? 1439 : stop - 1;
  return end >= start ? { start, end, name: row.name } : null;
}

const toRow = (s: Seg): Row => ({ name: s.name, from: hhmm(s.start), until: untilInput(s.end) });

export function DaySheet({ day, doc, canEdit, onClose, onChange, onCopy }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [copyTo, setCopyTo] = useState<number[]>([]);
  useEffect(() => {
    if (day === null) return;
    setRows(doc.week[day].map(toRow));
    setCopyTo([]);
  }, [day]); // eslint-disable-line react-hooks/exhaustive-deps -- only on open

  const write = (next: Row[]) => {
    setRows(next);
    if (day !== null) onChange(day, next.map(rowToSeg).filter((s): s is Seg => s !== null));
  };
  const set = (i: number, patch: Partial<Row>) => write(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = () => {
    const last = rows.length ? rowToSeg(rows[rows.length - 1]) : null;
    const start = last ? Math.min(1380, last.end + 1) : 540;
    write([...rows, { name: doc.names[1]?.name ?? "", from: hhmm(start), until: untilInput(Math.min(1439, start + 59)) }]);
  };
  const names = doc.names.slice(1);

  return (
    <EditorSheet
      open={day !== null}
      onClose={onClose}
      scheduleName={doc.name}
      title={day === null ? "" : `${DAY_NAMES[day]}: exact times`}
      description="Each block runs one name from its start until its end. Changes stay unsaved until you save the schedule."
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          {canEdit && copyTo.length > 0 && day !== null && (
            <Button
              variant="solid"
              size="sm"
              onClick={() => {
                onCopy(day, copyTo);
                setCopyTo([]);
              }}
            >
              Copy to {copyTo.length} {copyTo.length === 1 ? "day" : "days"}
            </Button>
          )}
        </>
      }
    >
      {day !== null && (
        <>
          {rows.length === 0 && (
            <p className="rounded-lg border border-dashed border-line-strong p-4 text-center text-xs text-ink-muted">
              Nothing runs this day: it is {doc.names[0].name} = {doc.names[0].value} all day.
            </p>
          )}
          {rows.map((r, i) => {
            const bad = !rowToSeg(r);
            return (
              <div key={i} className="grid grid-cols-[minmax(0,1fr)_6.5rem_6.5rem_2rem] items-end gap-2">
                <label className="grid gap-1 text-caption text-ink-muted">
                  Name
                  <Select
                    size="sm"
                    aria-label={`Block ${i + 1} name`}
                    value={r.name}
                    disabled={!canEdit}
                    onChange={(e) => set(i, { name: e.target.value })}
                  >
                    {names.map((n) => (
                      <option key={n.name} value={n.name}>
                        {n.name} = {n.value}
                      </option>
                    ))}
                  </Select>
                </label>
                <label className="grid gap-1 text-caption text-ink-muted">
                  From
                  <Input
                    type="time"
                    aria-label={`Block ${i + 1} from`}
                    value={r.from}
                    disabled={!canEdit}
                    className="h-8 text-xs"
                    onChange={(e) => set(i, { from: e.target.value })}
                  />
                </label>
                <label className="grid gap-1 text-caption text-ink-muted">
                  Until
                  <Input
                    type="time"
                    aria-label={`Block ${i + 1} until`}
                    aria-invalid={bad || undefined}
                    value={r.until}
                    disabled={!canEdit}
                    className={cn("h-8 text-xs", bad && "border-destructive")}
                    onChange={(e) => set(i, { until: e.target.value })}
                  />
                </label>
                {canEdit ? (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove block ${i + 1}`}
                    onClick={() => write(rows.filter((_, j) => j !== i))}
                  >
                    <Trash2 />
                  </Button>
                ) : (
                  <span />
                )}
              </div>
            );
          })}
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="justify-self-start"
              disabled={names.length === 0}
              onClick={add}
            >
              <Plus />
              Add a block
            </Button>
          )}
          <p className="text-caption text-ink-muted">
            Until is when the block stops: 07:00 until 18:00 is stored as 07:00–17:59, the last minute it runs.
            Until 00:00 means the end of the day.
          </p>
          {canEdit && (
            <div className="grid gap-1.5 border-t border-line pt-3">
              <span className="text-caption text-ink-muted">Copy {DAY_NAMES[day]} to</span>
              <div className="flex flex-wrap gap-1.5">
                {DAY_NAMES.map((d, j) =>
                  j === day ? null : (
                    <Button
                      key={d}
                      variant="outline"
                      size="sm"
                      aria-pressed={copyTo.includes(j)}
                      className={cn(
                        "h-7 px-2.5 text-caption",
                        copyTo.includes(j) && "border-accent/50 bg-accent/10 text-accent hover:bg-accent/15",
                      )}
                      onClick={() => setCopyTo((c) => (c.includes(j) ? c.filter((x) => x !== j) : [...c, j]))}
                    >
                      {d}
                    </Button>
                  ),
                )}
              </div>
            </div>
          )}
        </>
      )}
    </EditorSheet>
  );
}
