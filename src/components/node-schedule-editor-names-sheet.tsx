// The names sheet: each name with the value it sends, the default (Off) marked, add up to six names
// (Off included), remove. Off's name is the editor's own and is not stored, so only its value can change
// (that value is the box output default). The first real name is lb's default name and stays. A name is
// committed when its field loses focus; an empty or taken name snaps back. A name a box's own dated
// entry or a switched-off weekly entry still uses cannot be removed (lb would refuse the save), and the
// sheet says why under the list.
//
// One responsibility: edit the names and their values.

import { Plus, Trash2 } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

import {
  addName,
  removeBlocker,
  removeName,
  renameName,
  setNameValue,
} from "../lib/schedule/editNodeSchedule";
import { MAX_NAMES, type NodeSchedule } from "../lib/schedule/nodeSchedule";

import { EditorSheet } from "./node-schedule-editor-sheet";
import { NameSwatch } from "./name-swatch";

interface Props {
  open: boolean;
  doc: NodeSchedule;
  canEdit: boolean;
  onClose: () => void;
  onChange: (doc: NodeSchedule) => void;
}

export function NamesSheet({ open, doc, canEdit, onClose, onChange }: Props) {
  const blocked = doc.names.map((_, i) => (canEdit && i > 1 ? removeBlocker(doc, i) : null));
  return (
    <EditorSheet
      open={open}
      onClose={onClose}
      scheduleName={doc.name}
      title="Names and values"
      description="Each name sends its value to the boxes and dashboards, and has its own colour by position: the same in every schedule, calendar and chart."
      footer={
        <Button variant="ghost" size="sm" onClick={onClose}>
          Done
        </Button>
      }
    >
      <div className="grid grid-cols-[0.75rem_minmax(0,1fr)_5rem_4.5rem] items-center gap-2 text-caption text-ink-faint">
        <span />
        <span>Name</span>
        <span>Value</span>
        <span />
      </div>
      {doc.names.map((n, i) => (
        // Keyed by name so a rename re-mounts the field with the committed text.
        <div key={`${i}-${n.name}`} className="grid grid-cols-[0.75rem_minmax(0,1fr)_5rem_4.5rem] items-center gap-2">
          <NameSwatch index={i} />
          <Input
            aria-label={`Name ${i + 1}`}
            defaultValue={n.name}
            disabled={!canEdit || i === 0}
            className="h-8 text-xs"
            onBlur={(e) => {
              const next = renameName(doc, i, e.target.value);
              if (next === doc) e.target.value = n.name;
              else onChange(next);
            }}
          />
          <Input
            type="number"
            aria-label={`${n.name} value`}
            defaultValue={n.value}
            disabled={!canEdit}
            className="h-8 text-xs"
            onBlur={(e) => {
              const v = Number(e.target.value);
              if (e.target.value === "" || !Number.isFinite(v)) e.target.value = String(n.value);
              else if (v !== n.value) onChange(setNameValue(doc, i, v));
            }}
          />
          {i === 0 ? (
            <span title="Default: runs when nothing else does" className="text-caption text-ink-muted">
              Default
            </span>
          ) : canEdit && i > 1 ? (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${n.name}`}
              disabled={blocked[i] !== null}
              title={blocked[i] ?? undefined}
              onClick={() => onChange(removeName(doc, i))}
            >
              <Trash2 />
            </Button>
          ) : (
            <span />
          )}
        </div>
      ))}
      {canEdit && (
        <Button
          variant="ghost"
          size="sm"
          className="justify-self-start"
          disabled={doc.names.length >= MAX_NAMES}
          onClick={() => onChange(addName(doc))}
        >
          <Plus />
          Add a name
        </Button>
      )}
      {blocked.map((reason, i) =>
        reason ? (
          <p key={doc.names[i].name} className="text-caption text-ink-muted">
            {reason}
          </p>
        ) : null,
      )}
      <p className="text-caption text-ink-muted">
        Up to six names, the default included. Colours go by position: blue, amber, teal, violet, pink. The
        default runs whenever nothing else does and has no colour. Removing a name clears its blocks to the
        default.
      </p>
    </EditorSheet>
  );
}
