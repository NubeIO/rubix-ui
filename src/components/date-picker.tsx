// A date field whose calendar opens as a popover instead of the browser's own date picker: the field
// shows "31 Oct 2026", the popover a month (Monday first unless `weekStart` says otherwise) with today
// ringed and the chosen day filled. Days outside `min`/`max` cannot be picked. The value is "YYYY-MM-DD",
// or "" for none.
//
// Keyboard: the arrows move a day or a week, PageUp/PageDown a month, Home/End to the week's ends,
// Enter picks, Escape closes (and only the popover: a drawer around the field stays open).
// One component per file.

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../lib/cn";
import {
  addDays,
  addMonths,
  formatDay,
  localToday,
  monthGrid,
  monthLabel,
  weekdayOf,
} from "../lib/date";
import { useOverlayContainer } from "../lib/overlay";
import { Button } from "./button";
import { useDialogSurface } from "./dialog";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface DatePickerProps {
  /** "YYYY-MM-DD", or "" for none. */
  value: string;
  onChange: (value: string) => void;
  /** The first day that can be picked ("YYYY-MM-DD"). */
  min?: string;
  /** The last day that can be picked ("YYYY-MM-DD"). */
  max?: string;
  placeholder?: string;
  /** The week's first day: 1 = Monday (default), 0 = Sunday. */
  weekStart?: number;
  /** How the field shows a picked day; "31 Oct 2026" by default. */
  format?: (iso: string) => string;
  /** `md` (36px) matches `Input`; `sm` (32px) is the dense size for a toolbar or a row. */
  size?: "md" | "sm";
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

function DatePicker({
  value,
  onChange,
  min,
  max,
  placeholder = "Pick a date",
  weekStart = 1,
  format = formatDay,
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  className,
}: DatePickerProps) {
  const today = localToday();
  const [open, setOpen] = React.useState(false);
  /** The day the keyboard is on; its month is the one on show. */
  const [focus, setFocus] = React.useState(value || today);
  const grid = React.useRef<HTMLDivElement>(null);
  const blocked = (iso: string) => (!!min && iso < min) || (!!max && iso > max);
  // Inside a Dialog or Sheet the list renders into it (one focus scope); in an extension, into its root.
  const dialogSurface = useDialogSurface();
  const overlayContainer = useOverlayContainer();
  const container = dialogSurface ?? overlayContainer;

  const onOpenChange = (next: boolean) => {
    if (next) setFocus(value || (min && today < min ? min : max && today > max ? max : today));
    setOpen(next);
  };
  const pick = (iso: string) => {
    if (blocked(iso)) return;
    onChange(iso);
    setOpen(false);
  };

  // Keep the keyboard's day focused as it moves.
  React.useLayoutEffect(() => {
    if (open) grid.current?.querySelector<HTMLElement>(`[data-day="${focus}"]`)?.focus();
  }, [open, focus]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const lead = (weekdayOf(focus) - weekStart + 7) % 7;
    const moves: Record<string, () => string> = {
      ArrowLeft: () => addDays(focus, -1),
      ArrowRight: () => addDays(focus, 1),
      ArrowUp: () => addDays(focus, -7),
      ArrowDown: () => addDays(focus, 7),
      PageUp: () => addMonths(focus, -1),
      PageDown: () => addMonths(focus, 1),
      Home: () => addDays(focus, -lead),
      End: () => addDays(focus, 6 - lead),
    };
    if (moves[e.key]) {
      e.preventDefault();
      setFocus(moves[e.key]());
    }
  };

  const days = monthGrid(focus, weekStart);
  const month = focus.slice(0, 7);
  const heads = Array.from({ length: 7 }, (_, i) => WEEKDAYS[(i + weekStart) % 7]);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-label={ariaLabel ? `${ariaLabel}${value ? `: ${format(value)}` : ""}` : undefined}
          data-slot="date-picker-trigger"
          className={cn(
            "inline-flex min-w-[9.5rem] items-center gap-2 rounded-md border border-border bg-bg px-2.5 text-left text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60 data-[state=open]:border-accent data-[state=open]:ring-2 data-[state=open]:ring-accent/20",
            size === "sm" ? "h-8 text-xs" : "h-9 text-sm",
            className,
          )}
        >
          <CalendarDays size={14} className="shrink-0 text-muted" aria-hidden />
          <span className={cn("truncate", !value && "text-muted/60")}>
            {value ? format(value) : placeholder}
          </span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal container={container ?? undefined}>
        <PopoverPrimitive.Content
          data-slot="date-picker"
          role="dialog"
          aria-label={ariaLabel ?? "Choose a date"}
          align="start"
          sideOffset={4}
          collisionPadding={8}
          // Focus goes to the keyboard's day, not the first button. Radix mounts the content a render
          // after `open` turns on, so the layout effect above cannot reach it the first time.
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            grid.current?.querySelector<HTMLElement>(`[data-day="${focus}"]`)?.focus();
          }}
          onKeyDown={onKeyDown}
          style={{ zIndex: "var(--z-popover)" }}
          className="grid w-[264px] gap-2 rounded-md border border-border bg-panel p-3 text-xs shadow-(--elev-popover)"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Previous month"
              onClick={() => setFocus(addMonths(focus, -1))}
            >
              <ChevronLeft aria-hidden />
            </Button>
            <span className="text-sm font-semibold text-fg">{monthLabel(focus)}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Next month"
              onClick={() => setFocus(addMonths(focus, 1))}
            >
              <ChevronRight aria-hidden />
            </Button>
          </div>
          <div ref={grid} role="grid" className="grid grid-cols-7 gap-0.5">
            {heads.map((w) => (
              <span
                key={w}
                role="columnheader"
                className="grid h-7 place-items-center text-caption font-semibold text-muted"
              >
                {w}
              </span>
            ))}
            {days.map((iso) => {
              const chosen = iso === value;
              const off = blocked(iso);
              const outside = iso.slice(0, 7) !== month;
              return (
                // eslint-disable-next-line no-restricted-syntax -- a calendar cell, not a Button
                <button
                  key={iso}
                  type="button"
                  role="gridcell"
                  data-day={iso}
                  tabIndex={iso === focus ? 0 : -1}
                  aria-selected={chosen}
                  aria-disabled={off || undefined}
                  aria-label={formatDay(iso)}
                  onClick={() => pick(iso)}
                  className={cn(
                    "grid h-8 place-items-center rounded-md tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    chosen
                      ? "bg-accent font-semibold text-on-solid"
                      : off
                        ? "cursor-not-allowed text-faint opacity-50"
                        : "hover:bg-(--hover-wash)",
                    !chosen && !off && (outside ? "text-faint" : "text-fg"),
                    !chosen && iso === today && "ring-1 ring-inset ring-accent",
                  )}
                >
                  {Number(iso.slice(8))}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <Button variant="ghost" size="sm" disabled={blocked(today)} onClick={() => pick(today)}>
              Today
            </Button>
            {value && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { DatePicker };
