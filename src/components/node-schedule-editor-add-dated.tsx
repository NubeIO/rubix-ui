// "Add dated entry": quick picks kept from the extension (Closed all day, Late start, Close early, Open
// late, Staff training, Community event, Storm closure), the kind tabs that decide the fields, a label,
// the date (and an optional last day for a closure), the hours for extra or changed hours, and "Every
// year on this date" for a closure or holiday. Stored the Schedule Groups extension's way: extra and
// changed hours run the default name, changed hours never repeat, a holiday is one day and one per
// date. A label is required and Until must be after From (Until 00:00 is the end of the day). The
// entry joins the draft; the schedule's Save sends it.
//
// One responsibility: collect one new dated entry.

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

import { parseHHMM, type DatedItem, type DatedKind, type NodeSchedule } from "../lib/schedule/nodeSchedule";

import { nameValue } from "./node-schedule-editor-words";
import { EditorSheet } from "./node-schedule-editor-sheet";
import { KINDS } from "./node-schedule-editor-dated-kinds";

interface Entry {
  kind: DatedKind;
  label: string;
  date: string;
  to: string;
  from: string;
  until: string;
  yearly: boolean;
  pick: string | null;
}

const PICKS: [string, Partial<Entry>][] = [
  ["Closed all day", { kind: "closed", label: "Closed" }],
  ["Late start", { kind: "changed", label: "Late start", from: "10:00", until: "18:00" }],
  ["Close early", { kind: "changed", label: "Close early", from: "07:00", until: "15:00" }],
  ["Open late", { kind: "extra", label: "Open late", from: "18:00", until: "21:00" }],
  ["Staff training", { kind: "changed", label: "Staff training", from: "12:00", until: "18:00" }],
  ["Community event", { kind: "extra", label: "Community event", from: "18:00", until: "22:00" }],
  ["Storm closure", { kind: "closed", label: "Storm closure" }],
];
const KIND_ORDER: DatedKind[] = ["extra", "changed", "closed", "holiday"];

interface Props {
  open: boolean;
  doc: NodeSchedule;
  /** Today in the schedule's zone: the date a new entry starts on. */
  today: string;
  onClose: () => void;
  onAdd: (item: DatedItem) => void;
}

/** What is wrong with the entry, in the design's words, or "". */
export function entryProblem(
  e: Pick<Entry, "kind" | "label" | "date" | "to" | "from" | "until">,
  dated: DatedItem[] = [],
): string {
  if (!e.label.trim()) return "Give it a label people will recognise.";
  if (!e.date) return "Pick a date.";
  if (e.kind === "holiday" && dated.some((x) => x.kind === "holiday" && x.date === e.date))
    return "That date already has a holiday in this schedule. Remove it first.";
  if (e.kind === "extra" || e.kind === "changed") {
    const a = parseHHMM(e.from);
    const b = parseHHMM(e.until);
    if (a === null || b === null || (b !== 0 && b <= a)) return "Until must be after From.";
  } else if (e.to && e.to < e.date) return "To must be on or after the date.";
  return "";
}

let added = 0;
/** A new entry's key stem, as the extension mints them: `c<ms><seq>`. */
const newStem = () => `c${Date.now()}${String(++added % 10_000).padStart(4, "0")}`;

export function AddDatedSheet({ open, doc, today, onClose, onAdd }: Props) {
  const blank = (): Entry => ({
    kind: "closed",
    label: "",
    date: today,
    to: "",
    from: "09:00",
    until: "17:00",
    yearly: false,
    pick: null,
  });
  const [e, setE] = useState<Entry>(blank);
  const [tried, setTried] = useState(false);
  useEffect(() => {
    if (!open) return;
    setE(blank());
    setTried(false);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps -- only on open

  const set = (patch: Partial<Entry>) => setE((x) => ({ ...x, ...patch }));
  const timed = e.kind === "extra" || e.kind === "changed";
  const problem = entryProblem(e, doc.dated);

  const add = () => {
    if (problem) return setTried(true);
    const base = { id: newStem(), kind: e.kind, label: e.label.trim(), date: e.date };
    const start = parseHHMM(e.from) ?? 0;
    const end = (parseHHMM(e.until) || 1440) - 1;
    if (e.kind === "extra") onAdd({ ...base, start, end });
    else if (e.kind === "changed") onAdd({ ...base, hours: [{ start, end }] });
    else
      onAdd({
        ...base,
        ...(e.kind === "closed" && e.to && e.to > e.date ? { to: e.to } : {}),
        ...(e.yearly ? { yearly: true } : {}),
      });
    onClose();
  };

  return (
    <EditorSheet
      open={open}
      onClose={onClose}
      scheduleName={doc.name}
      title="Add dated entry"
      description="A date that differs from the week. After the date, the normal week carries on by itself."
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" size="sm" onClick={add}>
            Add
          </Button>
        </>
      }
    >
      <div className="grid gap-1.5">
        <span className="text-caption text-ink-muted">Quick picks</span>
        <div className="flex flex-wrap gap-1.5">
          {PICKS.map(([label, patch]) => (
            <Button
              key={label}
              variant={e.pick === label ? "solid" : "outline"}
              size="sm"
              onClick={() => set({ ...patch, pick: label })}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-1.5">
        <span className="text-caption text-ink-muted">Kind</span>
        <Tabs value={e.kind} onValueChange={(k) => set({ kind: k as DatedKind, pick: null })} className="gap-0">
          <TabsList aria-label="Kind of entry">
            {KIND_ORDER.map((k) => (
              <TabsTrigger key={k} value={k}>
                {KINDS[k].label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <span className="text-caption text-ink-faint">{KINDS[e.kind].hint}</span>
      </div>
      <Field label="Label">
        <Input
          aria-label="Label"
          value={e.label}
          placeholder="e.g. Staff training"
          onChange={(ev) => set({ label: ev.target.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Date">
          <Input type="date" aria-label="Date" value={e.date} onChange={(ev) => set({ date: ev.target.value })} />
        </Field>
        {e.kind === "closed" && (
          <Field label="To (optional)">
            <Input type="date" aria-label="To" value={e.to} onChange={(ev) => set({ to: ev.target.value })} />
          </Field>
        )}
      </div>
      {timed && (
        <div className="grid grid-cols-[6.5rem_6.5rem_minmax(0,1fr)] items-end gap-2">
          <Field label="From">
            <Input type="time" aria-label="From" value={e.from} onChange={(ev) => set({ from: ev.target.value })} />
          </Field>
          <Field label="Until">
            <Input type="time" aria-label="Until" value={e.until} onChange={(ev) => set({ until: ev.target.value })} />
          </Field>
          <span className="pb-2 text-caption text-ink-muted">Runs {nameValue(doc.names[1] ?? doc.names[0])}</span>
        </div>
      )}
      {!timed && (
        <label className="flex items-center gap-2 text-xs text-ink">
          <Checkbox checked={e.yearly} onChange={(ev) => set({ yearly: ev.target.checked })} />
          Every year on this date
        </label>
      )}
      {tried && problem && (
        <span role="alert" className="text-xs text-destructive">
          {problem}
        </span>
      )}
    </EditorSheet>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid min-w-0 content-start gap-1">
      <span className="text-caption text-ink-muted">{label}</span>
      {children}
    </div>
  );
}
