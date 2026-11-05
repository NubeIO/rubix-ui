// A Combobox drawn as a filter chip: "⊕ Site" (dashed) while nothing is chosen, then "Site · Adelaide
// Depot" (accent) with a clear button that empties it again.
//
// One responsibility: the chip trigger. The list and the state are the Combobox's.

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CirclePlus, X } from "lucide-react";

import { cn } from "../lib/cn";

interface ComboboxChipProps {
  /** The filter's name: "Site". */
  chip: string;
  ariaLabel: string;
  open: boolean;
  listId: string;
  disabled: boolean;
  /** Whether a value is chosen. */
  on: boolean;
  /** What follows the dot once chosen: the caller's `renderValue`, else the option's label. */
  label: React.ReactNode;
  onClear: () => void;
  className?: string;
  /** The open list (rendered beside the trigger so it can portal from here). */
  children: React.ReactNode;
}

function ComboboxChip({
  chip,
  ariaLabel,
  open,
  listId,
  disabled,
  on,
  label,
  onClear,
  className,
  children,
}: ComboboxChipProps) {
  return (
    <span
      data-slot="combobox-chip"
      className={cn(
        "inline-flex h-8 items-center rounded-md border text-xs transition-colors",
        on
          ? "border-accent/45 bg-accent/10"
          : "border-dashed border-border bg-bg hover:bg-(--hover-wash)",
        className,
      )}
    >
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={ariaLabel}
          disabled={disabled}
          data-slot="combobox-trigger"
          className="inline-flex h-full items-center gap-1.5 rounded-md px-2.5 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 disabled:opacity-50"
        >
          {on ? (
            <>
              {chip}
              <span className="max-w-[180px] truncate font-medium text-accent">· {label}</span>
            </>
          ) : (
            <>
              <CirclePlus size={14} className="shrink-0 opacity-70" aria-hidden />
              {chip}
            </>
          )}
        </button>
      </PopoverPrimitive.Trigger>
      {on && !disabled && (
        // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
        <button
          type="button"
          aria-label={`clear ${ariaLabel}`}
          className="mr-1 grid size-5 place-items-center rounded-[4px] text-muted hover:bg-(--hover-wash) hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
          onClick={onClear}
        >
          <X size={12} aria-hidden />
        </button>
      )}
      {children}
    </span>
  );
}

export { ComboboxChip };
