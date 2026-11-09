// The editor's Settings tab: name, description, the schedule's own colour (marks the schedule only, never
// its names), time zone, Schedule on (with the design's exact copy), Box output (used, min, max, default
// value), the permanent id, and Delete. Every field edits the draft; the save bar sends it.
//
// The default value is Off's value (`names[0]`), the same number the names sheet shows for Off.
//
// One responsibility: the settings tab.

import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/cn";
import { Input } from "./input";
import { Select } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";

import { setNameValue } from "../lib/schedule/editNodeSchedule";
import type { NodeSchedule } from "../lib/schedule/nodeSchedule";
import { SCHEDULE_COLOURS } from "../lib/schedule/scheduleColour";

import { nameValue } from "./node-schedule-editor-words";

interface Props {
  doc: NodeSchedule;
  canEdit: boolean;
  onChange: (doc: NodeSchedule) => void;
  onDelete?: () => void;
}

/** The engine's zones, with the schedule's own kept even when the engine does not list it. */
function zones(current: string): string[] {
  const list = (Intl as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
  return [...new Set([current, "UTC", ...list].filter(Boolean))];
}

export function SettingsTab({ doc, canEdit, onChange, onDelete }: Props) {
  const ro = !canEdit;
  const set = (patch: Partial<NodeSchedule>) => onChange({ ...doc, ...patch });
  const num = (text: string, fallback: number) =>
    text === "" || !Number.isFinite(Number(text)) ? fallback : Number(text);
  const outOff = ro || !doc.output.used;

  return (
    <section className="grid max-w-2xl gap-5">
      <div className="grid gap-4">
        <Field label="Name">
          <Input aria-label="Name" value={doc.name} disabled={ro} onChange={(e) => set({ name: e.target.value })} />
        </Field>
        <Field label="Description">
          <Textarea
            aria-label="Description"
            rows={2}
            value={doc.description}
            disabled={ro}
            onChange={(e) => set({ description: e.target.value })}
          />
        </Field>
        <Field
          label="Colour"
          hint="Marks this schedule in lists, pickers and legends. Names keep their own colours, set under Weekly hours → Names."
        >
          <div className="flex flex-wrap gap-2">
            {SCHEDULE_COLOURS.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-label={`Colour ${c.label}`}
                aria-pressed={doc.color === c.value}
                disabled={ro}
                className={cn(
                  "size-6 rounded-full border-2 border-surface-card ring-2",
                  c.bg,
                  doc.color === c.value ? "ring-ink-strong" : "ring-transparent",
                )}
                onClick={() => set({ color: c.value })}
              />
            ))}
          </div>
        </Field>
        <Field
          label="Time zone"
          hint="Every time in this schedule is in this zone, on every box and dashboard, wherever the viewer is."
        >
          <Select
            aria-label="Time zone"
            value={doc.timezone}
            disabled={ro}
            onChange={(e) => set({ timezone: e.target.value })}
          >
            {zones(doc.timezone).map((z) => (
              <option key={z} value={z}>
                {z.replace(/_/g, " ")}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="flex items-start gap-4 border-t border-line pt-4">
        <div className="grid flex-1 gap-1">
          <span className="text-sm font-semibold text-ink-strong">Schedule on</span>
          <span className="text-xs text-ink-muted">
            Switching it off affects dashboards and flows only: they read {nameValue(doc.names[0])} until it's back on.
            Boxes keep running the hours they already have.
          </span>
        </div>
        <Switch
          aria-label="Schedule on"
          checked={doc.enabled}
          disabled={ro}
          onCheckedChange={(enabled) => set({ enabled })}
        />
      </div>

      <div className="grid gap-3 border-t border-line pt-4">
        <div className="grid gap-1">
          <span className="text-sm font-semibold text-ink-strong">Box output</span>
          <span className="text-xs text-ink-muted">What boxes running this schedule write to their output.</span>
        </div>
        <label className="flex items-center justify-between gap-3 text-xs text-ink">
          Output used
          <Switch
            aria-label="Output used"
            checked={doc.output.used}
            disabled={ro}
            onCheckedChange={(used) => set({ output: { ...doc.output, used } })}
          />
        </label>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Min">
            <Input
              type="number"
              aria-label="Min"
              value={doc.output.min}
              disabled={outOff}
              onChange={(e) => set({ output: { ...doc.output, min: num(e.target.value, doc.output.min) } })}
            />
          </Field>
          <Field label="Max">
            <Input
              type="number"
              aria-label="Max"
              value={doc.output.max}
              disabled={outOff}
              onChange={(e) => set({ output: { ...doc.output, max: num(e.target.value, doc.output.max) } })}
            />
          </Field>
          <Field label="Default value">
            <Input
              type="number"
              aria-label="Default value"
              value={doc.names[0].value}
              disabled={outOff}
              onChange={(e) => onChange(setNameValue(doc, 0, num(e.target.value, doc.names[0].value)))}
            />
          </Field>
        </div>
        <span className="text-caption text-ink-faint">
          Default value is written when nothing runs. Every name's value must sit between min and max.
        </span>
      </div>

      <div className="grid gap-1 border-t border-line pt-4">
        <span className="text-xs font-medium text-ink">Id</span>
        <code className="justify-self-start rounded-md bg-surface-inset px-2 py-1 font-mono text-xs text-ink-strong">
          {doc.id}
        </code>
        <span className="text-caption text-ink-faint">The permanent id dashboards, flows and boxes use. It never changes.</span>
      </div>

      {canEdit && onDelete && (
        <div>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 />
            Delete schedule
          </Button>
        </div>
      )}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-xs font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="text-caption text-ink-faint">{hint}</span>}
    </div>
  );
}
