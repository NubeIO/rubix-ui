// The editor's whole-body states: loading (a skeleton of the header, Now card, tabs and seven rows) and
// can't be read (an old-format record: no editor, Recreate keeps the name and id, or Delete).
//
// One responsibility: draw the loading and unreadable states.

import { FileX, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

export function EditorSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading schedule" className="grid gap-3 p-4">
      <div className="grid gap-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-8 w-96 max-w-full" />
      {Array.from({ length: 7 }, (_, i) => (
        <Skeleton key={i} className="h-7 w-full" />
      ))}
    </div>
  );
}

interface UnreadableProps {
  id: string;
  canEdit: boolean;
  onRecreate?: () => void;
  onDelete?: () => void;
}

export function UnreadableState({ id, canEdit, onRecreate, onDelete }: UnreadableProps) {
  return (
    <div className="grid place-items-center p-8">
      <div className="grid max-w-md justify-items-center gap-2 text-center">
        <FileX className="size-8 text-ink-faint" />
        <span className="text-sm font-semibold text-ink-strong">This schedule can't be read</span>
        <span className="text-xs text-ink-muted">
          It was saved in an older format that this editor doesn't understand, so its hours can't be shown or
          changed. Recreate it with the same name and id: dashboards and flows that use it keep working.
        </span>
        <code className="rounded-md bg-surface-inset px-2 py-1 font-mono text-xs text-ink-strong">{id}</code>
        {canEdit && (
          <div className="mt-2 flex gap-2">
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 />
                Delete
              </Button>
            )}
            {onRecreate && (
              <Button variant="solid" size="sm" onClick={onRecreate}>
                <RefreshCw />
                Recreate schedule
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
