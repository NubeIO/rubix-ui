// The React affordance over the clipboard core (used by `CopyButton`, the JSON popout, and any surface
// that needs a copy affordance). Owns ONLY the transient `copied` flag that self-resets and the `error`
// when a copy is refused — the actual write, and the secure/insecure-context strategy behind it, lives
// in `writeText.ts`. One responsibility per file (FILE-LAYOUT): this file is state, not clipboard
// mechanics. Callers keep the text selectable for a manual copy rather than pretending it worked.
//
// `copy` resolves to whether it succeeded and never throws, so `void copy(text)` from an onClick is
// safe. Call it directly in the gesture handler — see the ordering note on `writeText`.

import { useCallback, useEffect, useRef, useState } from "react";

import { writeText } from "./writeText";

export interface Clipboard {
  /** True for ~`resetMs` after a successful copy (drives the "Copied" affordance). */
  copied: boolean;
  /** Set when the last copy failed (denied / no clipboard); cleared on the next attempt. */
  error: string | null;
  /** Copy `text`; resolves to whether it succeeded. Never throws. */
  copy: (text: string) => Promise<boolean>;
}

export function useClipboard(resetMs = 1500): Clipboard {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Guards the post-await setState: the write is async, so a component can unmount mid-copy.
  const alive = useRef(true);

  // Clear the pending reset on unmount so we never setState on a gone component.
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      const ok = await writeText(text);
      if (!alive.current) return ok;

      if (!ok) {
        setCopied(false);
        setError("Copy failed");
        return false;
      }
      setError(null);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetMs);
      return true;
    },
    [resetMs],
  );

  return { copied, error, copy };
}
