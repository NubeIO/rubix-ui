// The save bar at the foot of the editor while there are edits: "Changed: Mon, Tue · dated entries",
// Discard, Save. Saving shows "Saving…"; on a node whose backend needs upgrading Save is off and the
// bar says why. After a save it says "Saved" for a moment.
//
// One responsibility: draw the save bar.

import { Check } from "lucide-react";
import { Button } from "./button";
import { Spinner } from "./spinner";

interface Props {
  parts: string[];
  saving: boolean;
  saved: boolean;
  needsUpgrade: boolean;
  /** "Save", or the page's own ("Save and send to 12 boxes"). */
  saveLabel: string;
  onSave: () => void;
  onDiscard: () => void;
}

export function SaveBar({ parts, saving, saved, needsUpgrade, saveLabel, onSave, onDiscard }: Props) {
  if (parts.length === 0 && !saving)
    return saved ? (
      <div role="status" className="flex items-center gap-2 border-t border-line px-4 py-2.5 text-xs text-ink">
        <Check className="size-3.5 text-success" />
        Saved
      </div>
    ) : null;
  const changed = `Changed: ${parts.join(" · ")}`;
  const text = saving ? "Saving…" : needsUpgrade ? `${changed}. Can't save until the node is upgraded.` : changed;
  return (
    <div
      role="region"
      aria-label="Unsaved changes"
      className="flex items-center gap-2 border-t border-line bg-surface-card px-4 py-2.5"
    >
      <span aria-hidden className="size-1.5 flex-none rounded-full bg-accent" />
      <span className="min-w-0 flex-1 truncate text-xs text-ink">{text}</span>
      <Button variant="ghost" size="sm" disabled={saving} onClick={onDiscard}>
        Discard
      </Button>
      <Button variant="solid" size="sm" disabled={saving || needsUpgrade} onClick={onSave}>
        {saving && <Spinner />}
        {saving ? "Saving" : needsUpgrade ? "Can't save" : saveLabel}
      </Button>
    </div>
  );
}
