// The node schedule editor (Rubix Node Schedule Editor, handoff "Shared"): one component for the
// Schedules page and, later, the Schedule Groups extension. Data in, events out (brief, decision 4): it
// takes the schedule as a `NodeSchedule` and hands edits back through callbacks; the page owns the API.
// It imports no API client, router or app component, only React, this package's primitives and the pure
// helpers in `lib/schedule`; the rubix-ai Schedules page and the extension wire the API.
//
// Header and Now card; tabs Weekly hours · Dated entries (n) · Calendar · Settings · the page's own tab;
// the save bar while there are edits; the conflict flow; the states (loading, unreadable, saving,
// changed elsewhere, after reload, backend needs upgrading, switched off). Below md it is view only.
//
// One responsibility: compose the editor and own which tab and sheet are open.

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

import type { DatedItem, NodeSchedule } from "../lib/schedule/nodeSchedule";
import { nowAndNext } from "../lib/schedule/nowAndNext";
import { changedDays } from "../lib/schedule/scheduleEdits";

import { CalendarTab } from "./node-schedule-editor-calendar-tab";
import { AddDatedSheet } from "./node-schedule-editor-add-dated";
import { DatedTab } from "./node-schedule-editor-dated-tab";
import { EditorBanner } from "./node-schedule-editor-banner";
import { EditorHeader } from "./node-schedule-editor-header";
import { EditorSkeleton, UnreadableState } from "./node-schedule-editor-states";
import { nameValue } from "./node-schedule-editor-words";
import { PhoneView } from "./node-schedule-editor-phone";
import { SaveBar } from "./node-schedule-editor-save-bar";
import { SettingsTab } from "./node-schedule-editor-settings-tab";
import { useEditorDraft } from "./node-schedule-editor-draft";
import { WeekTab } from "./node-schedule-editor-week-tab";

export interface NodeScheduleEditorProps {
  /** The schedule, read with `readNodeSchedule`. Null while it loads. */
  schedule: NodeSchedule | null;
  /** The record can't be read (old format): no editor, Recreate keeps the name and id. */
  unreadable?: { id: string; name: string };
  /** The node's backend predates the new record: editing works, Save is off with the reason. */
  backendNeedsUpgrade?: boolean;
  /** Save the draft (send it with `writeNodeSchedule`; it carries the rev it was read at). Resolve
   *  with the stored rev; reject with the save error (`toSaveError` sorts it). */
  onSave?: (doc: NodeSchedule) => Promise<{ rev: number } | void>;
  /** Fetch the latest saved version, for "Reload, keep my edit". */
  onReload?: () => Promise<NodeSchedule>;
  /** Delete was asked for (the page confirms). */
  onDelete?: () => void;
  /** Recreate an unreadable schedule under the same id and name. */
  onRecreate?: (id: string, name: string) => void;
  /** Close button in the header; omitted, there is none. */
  onClose?: () => void;
  /** Told whenever the draft gains or loses unsaved edits (a page's leave guard). */
  onDirtyChange?: (dirty: boolean) => void;
  host?: "schedules" | "groups";
  /** The page's own last tab: Used by, Boxes. */
  extraTab?: { label: string; render: () => ReactNode };
  readOnly?: boolean;
  hideSettings?: boolean;
  title?: string;
  subtitle?: string;
  /** The Save button's words; Groups says "Save and send to 12 boxes". */
  saveLabel?: string;
  /** The current instant (epoch ms). Omitted, the editor follows the clock minute by minute. */
  now?: number;
}

type Tab = "hours" | "dated" | "cal" | "set" | "extra";

function useClock(fixed: number | undefined): number {
  const [now, setNow] = useState(() => fixed ?? Date.now());
  useEffect(() => {
    if (fixed !== undefined) return setNow(fixed);
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [fixed]);
  return fixed ?? now;
}

export function NodeScheduleEditor(props: NodeScheduleEditorProps) {
  const { schedule, unreadable: unreadableProp, readOnly = false, hideSettings = false, extraTab } = props;
  const instant = useClock(props.now);
  const d = useEditorDraft(schedule, props);
  const [tab, setTab] = useState<Tab>("hours");
  const [adding, setAdding] = useState(false);
  const draft = d.draft;
  const state = useMemo(() => (draft ? nowAndNext(draft, instant) : null), [draft, instant]);
  const changed = useMemo(() => new Set(d.base && draft ? changedDays(d.base, draft) : []), [d.base, draft]);

  const unreadable = unreadableProp ?? (d.unreadable && draft ? { id: draft.id, name: draft.name } : undefined);
  if (unreadable)
    return (
      <div className="flex h-full min-h-0 flex-col">
        <EditorHeader
          doc={null}
          fallback={unreadable}
          state={null}
          title={props.title}
          subtitle={props.subtitle}
          onClose={props.onClose}
        />
        <UnreadableState
          id={unreadable.id}
          canEdit={!readOnly}
          onDelete={props.onDelete}
          onRecreate={props.onRecreate && (() => props.onRecreate?.(unreadable.id, unreadable.name))}
        />
      </div>
    );
  if (!draft || !state) return <EditorSkeleton />;

  const canEdit = !readOnly;
  const edit = (next: NodeSchedule) => canEdit && d.setDraft(next);
  const tabs: [Tab, string][] = [
    ["hours", "Weekly hours"],
    ["dated", `Dated entries (${draft.dated.length})`],
    ["cal", "Calendar"],
    ...(hideSettings ? [] : ([["set", "Settings"]] as [Tab, string][])),
    ...(extraTab ? ([["extra", extraTab.label]] as [Tab, string][]) : []),
  ];
  const open = tabs.some(([t]) => t === tab) ? tab : "hours";
  const weekday = (new Date(`${state.at.date}T00:00:00Z`).getUTCDay() + 6) % 7;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <EditorHeader doc={draft} state={state} title={props.title} subtitle={props.subtitle} onClose={props.onClose} />
      <div className="hidden min-h-0 flex-1 flex-col md:flex" data-testid="node-schedule-editor">
        <EditorBanner
          conflict={d.conflict}
          needsUpgrade={d.needsUpgrade}
          error={d.error}
          enabled={draft.enabled}
          offText={nameValue(draft.names[0])}
          canEdit={canEdit}
          onReload={props.onReload && (() => void d.reload())}
          onSwitchOn={() => edit({ ...draft, enabled: true })}
        />
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-3">
          <Tabs value={open} onValueChange={(v) => setTab(v as Tab)} className="gap-3">
            <TabsList aria-label="Schedule sections" className="self-start">
              {tabs.map(([t, label]) => (
                <TabsTrigger key={t} value={t}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {open === "hours" && (
              <WeekTab doc={draft} canEdit={canEdit} changed={changed} today={weekday} onChange={edit} />
            )}
            {open === "dated" && (
              <DatedTab
                doc={draft}
                canEdit={canEdit}
                today={state.at.date}
                onAdd={() => setAdding(true)}
                onChange={edit}
              />
            )}
            {open === "cal" && (
              <CalendarTab doc={draft} at={state.at} canEdit={canEdit} onAdd={() => setAdding(true)} />
            )}
            {open === "set" && (
              <SettingsTab doc={draft} canEdit={canEdit} onChange={edit} onDelete={props.onDelete} />
            )}
            {open === "extra" && extraTab?.render()}
          </Tabs>
        </div>
        {canEdit && (
          <SaveBar
            parts={d.parts}
            saving={d.saving}
            saved={d.saved}
            needsUpgrade={d.needsUpgrade}
            saveLabel={props.saveLabel ?? "Save"}
            onSave={() => void d.save()}
            onDiscard={d.discard}
          />
        )}
      </div>
      <div className="md:hidden">
        <PhoneView doc={draft} state={state} />
      </div>
      <AddDatedSheet
        open={adding}
        doc={draft}
        today={state.at.date}
        onClose={() => setAdding(false)}
        onAdd={(item: DatedItem) => edit({ ...draft, dated: [...draft.dated, item] })}
      />
    </div>
  );
}
