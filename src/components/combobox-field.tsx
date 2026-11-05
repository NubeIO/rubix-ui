// A Combobox drawn as a form field: the chosen option's label (or the placeholder), a chevron at the
// right, and an optional clear (×) between them. The field look `Input` and `Select` share (focus
// border + ring, disabled fade), so a Combobox and a Select line up in one form.
//
// One responsibility: the field trigger. The list and the state are the Combobox's.

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronDown, X } from "lucide-react";

import { cn } from "../lib/cn";
import type { ComboboxOption } from "./combobox-options";

interface ComboboxFieldProps {
  ariaLabel: string;
  open: boolean;
  listId: string;
  disabled: boolean;
  size: "md" | "sm";
  /** The option the value matches, if any. */
  current: ComboboxOption | undefined;
  /** What the field shows: the caller's `renderValue`, the option's label, or the placeholder. */
  label: React.ReactNode;
  showClear: boolean;
  onClear: () => void;
  className?: string;
  /** The open list (rendered beside the trigger so it can portal from here). */
  children: React.ReactNode;
}

function ComboboxField({
  ariaLabel,
  open,
  listId,
  disabled,
  size,
  current,
  label,
  showClear,
  onClear,
  className,
  children,
}: ComboboxFieldProps) {
  return (
    <div className={cn("relative", className)}>
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
          className={cn(
            // `pr-[9px]` plus the 1px border puts the chevron 10px from the field's OUTER right edge at
            // both heights (Rubix Chart Shading sheet §10, the combobox rule).
            "flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg py-0 pr-[9px] pl-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
            size === "sm" ? "h-8 text-xs" : "h-9 text-sm",
          )}
        >
          <span
            className={cn(
              "flex min-w-0 items-center gap-1.5 truncate",
              !current && "text-muted",
              // Room for the clear button, which sits between the label and the chevron. Reserved on
              // the LABEL rather than as trigger padding, so the chevron stays at the right edge
              // whether or not there is a value to clear. The text stops 8px before the clear button's
              // hit area: that area starts 43px (sm) or 45px (md) from the outer edge and this box
              // ends 26px from it.
              showClear && (size === "sm" ? "pr-[25px]" : "pr-[27px]"),
            )}
          >
            {current?.swatch && (
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ background: current.swatch }}
                aria-hidden
              />
            )}
            {label}
          </span>
          {/* The sheet's chevron: a single down chevron, 12px, `--faint` (strokeWidth 3 on the 24-unit
              lucide grid is the sheet's 1.5px at 12px). The Select draws the same one as a token. */}
          <ChevronDown size={12} strokeWidth={3} className="shrink-0 text-faint" aria-hidden />
        </button>
      </PopoverPrimitive.Trigger>
      {showClear && (
        // A sibling (not nested, the trigger is a <button>), absolutely positioned over the label's
        // reserved right pad, LEFT of the chevron. From the field's outer right edge: the chevron is at
        // 10 to 22px, this 12px icon is 5px left of it at 27 to 39px, and the hit area is centred on the
        // icon: 20 by 20 at 32px tall, 24 by 24 at 36px (Rubix Chart Shading sheet §10). Clears to ""
        // (none) without opening the list.
        // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
        <button
          type="button"
          aria-label={`clear ${ariaLabel}`}
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[4px] text-faint hover:bg-[hsl(var(--fg)/0.06)] hover:text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
            size === "sm" ? "right-[23px] h-5 w-5" : "right-[21px] h-6 w-6",
          )}
          onClick={onClear}
        >
          <X size={12} aria-hidden />
        </button>
      )}
      {children}
    </div>
  );
}

export { ComboboxField };
