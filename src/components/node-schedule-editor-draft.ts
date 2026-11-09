// The node schedule editor's draft: the schedule it was opened at (`base`), the edits on top (`draft`),
// and the save with its conflict flow (node schedule brief, decision 2).
//
//   - Save hands the draft to the page's `onSave`, which sends it with the rev it was read at. On
//     success the draft becomes the new base at the answered rev.
//   - Changed elsewhere: the draft is KEPT and the conflict warning shows. "Reload, keep my edit" asks
//     the page for the latest version (`onReload`), puts the draft's changes back on top of it
//     (`reapplyEdits`) and says what was reapplied. The person saves or discards from there.
//   - Backend needs upgrading: editing goes on, Save stays off with the reason.
//   - Any other refusal is shown in its own words; the draft stays.
//
// A new schedule from the page replaces the draft only when it is another schedule or the draft has no
// edits, so a background refresh never drops someone's work.
//
// One responsibility: the draft and its save, as a hook.

import { useEffect, useMemo, useRef, useState } from "react";

import type { NodeSchedule } from "../lib/schedule/nodeSchedule";
import { BackendNeedsUpgrade, ChangedElsewhere, toSaveError, Unreadable } from "../lib/schedule/saveErrors";
import { changedParts, reapplyEdits } from "../lib/schedule/scheduleEdits";

export type Conflict = { kind: "conflict" } | { kind: "reloaded"; applied: string[] } | null;

export interface DraftOptions {
  onSave?: (doc: NodeSchedule) => Promise<{ rev: number } | void>;
  onReload?: () => Promise<NodeSchedule>;
  backendNeedsUpgrade?: boolean;
  onDirtyChange?: (dirty: boolean) => void;
}

export function useEditorDraft(schedule: NodeSchedule | null, opts: DraftOptions) {
  const [base, setBase] = useState(schedule);
  const [draft, setDraft] = useState(schedule);
  const [saving, setSaving] = useState(false);
  const [conflict, setConflict] = useState<Conflict>(null);
  const [error, setError] = useState<string | null>(null);
  const [upgrade, setUpgrade] = useState(false);
  const [unreadable, setUnreadable] = useState(false);
  const [saved, setSaved] = useState(false);

  const parts = useMemo(() => (base && draft ? changedParts(base, draft) : []), [base, draft]);
  const dirty = parts.length > 0;
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;

  useEffect(() => {
    if (!schedule) return;
    if (!base || base.id !== schedule.id || (!dirtyRef.current && base.rev !== schedule.rev)) {
      setBase(schedule);
      setDraft(schedule);
      setConflict(null);
      setError(null);
    }
  }, [schedule]); // eslint-disable-line react-hooks/exhaustive-deps -- `base` is read, not tracked

  const onDirtyChange = opts.onDirtyChange;
  useEffect(() => {
    onDirtyChange?.(dirty);
  }, [dirty, onDirtyChange]);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(t);
  }, [saved]);

  const save = async () => {
    if (!draft || !opts.onSave) return;
    setSaving(true);
    setError(null);
    try {
      const answer = await opts.onSave(draft);
      const next = { ...draft, rev: answer?.rev ?? draft.rev };
      setBase(next);
      setDraft(next);
      setConflict(null);
      setSaved(true);
    } catch (e) {
      const err = toSaveError(e);
      if (err instanceof ChangedElsewhere) setConflict({ kind: "conflict" });
      else if (err instanceof BackendNeedsUpgrade) setUpgrade(true);
      else if (err instanceof Unreadable) setUnreadable(true);
      else setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const reload = async () => {
    if (!base || !draft || !opts.onReload) return;
    setError(null);
    try {
      const latest = await opts.onReload();
      const { doc, applied } = reapplyEdits(base, draft, latest);
      setBase(latest);
      setDraft(doc);
      setConflict({ kind: "reloaded", applied });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const discard = () => {
    setDraft(base);
    setConflict(null);
    setError(null);
  };

  return {
    base,
    draft,
    setDraft: (next: NodeSchedule) => setDraft(next),
    parts,
    dirty,
    saving,
    saved,
    conflict,
    error,
    needsUpgrade: upgrade || !!opts.backendNeedsUpgrade,
    unreadable,
    save,
    reload,
    discard,
  };
}
