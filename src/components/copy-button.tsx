// The one shared "copy to clipboard" button (ui-standards): a `Button` that copies `text` and flips to a
// transient "Copied" state via the shared `useClipboard` hook. Replaces the one-off copy buttons scattered
// across features (CodeBlock/Answer/ApiKeys/OneTimeSecret…) — one affordance, one behavior, one a11y story.
// One primitive per file (FILE-LAYOUT). Label is optional so it works as an icon-only affordance too.

import { Check, Copy } from "lucide-react";

import { Button } from "./button";
import { cn } from "../lib/cn";
import { useClipboard } from "../lib/clipboard";

interface Props {
  /** The text to copy. Disabled when empty. */
  text: string;
  /** Optional label beside the icon (e.g. "Copy JSON"). Omit for an icon-only button. */
  label?: string;
  /** Label shown for ~1.5s after a successful copy. Defaults to "Copied". */
  copiedLabel?: string;
  variant?: "default" | "solid" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  className?: string;
  /** aria-label for the icon-only form (defaults to "copy to clipboard"). */
  ariaLabel?: string;
}

export function CopyButton({
  text,
  label,
  copiedLabel = "Copied",
  variant = "ghost",
  size = "sm",
  className,
  ariaLabel = "copy to clipboard",
}: Props) {
  const { copied, copy } = useClipboard();
  const iconOnly = !label && size === "icon";
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-label={label ? undefined : ariaLabel}
      title="Copy to the clipboard"
      disabled={text.length === 0}
      onClick={() => void copy(text)}
      className={cn(!iconOnly && "gap-1 text-xs", className)}
    >
      {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
      {label ? (copied ? copiedLabel : label) : null}
    </Button>
  );
}
