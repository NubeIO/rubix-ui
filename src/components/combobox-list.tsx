// A Combobox's open list: a Radix Popover with an optional search box over a listbox of options, in
// groups, with a check on the chosen one.
//
// Focus stays on ONE element while the arrow keys move a highlight: the search box, or the listbox
// itself when there is no search box. That element names the highlighted option through
// `aria-activedescendant`, so a screen reader reads each option as the highlight reaches it.
//
// The list is PORTALLED, the same seam `dropdown-menu.tsx`/`menubar.tsx`/`tooltip.tsx` ride. It used
// to render as an in-flow `absolute z-50` sibling, which any ancestor pairing `overflow-hidden` with
// `rounded-md` silently clipped. Radix owns the collision flip, scroll/resize reposition, outside-click
// and focus return; do NOT regress this to a bare absolutely-positioned div.
//
// One responsibility: draw the open list. The state is `combobox.tsx`'s.

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check } from "lucide-react";

import { cn } from "../lib/cn";
import type { OptionGroup } from "./combobox-options";

interface ComboboxListProps {
  /** Where the list renders: a dialog it sits in, the extension root, or (undefined) the body. */
  container: HTMLElement | undefined;
  listId: string;
  optionId: (idx: number) => string;
  ariaLabel: string;
  value: string;
  groups: OptionGroup[];
  /** How many options the search left. */
  count: number;
  active: number;
  setActive: (idx: number) => void;
  query: string;
  setQuery: (q: string) => void;
  searchable: boolean;
  allowCustom: boolean;
  /** A chip's list takes its longest option's width instead of the trigger's. */
  fitContent: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
  commit: (value: string) => void;
}

function ComboboxList({
  container,
  listId,
  optionId,
  ariaLabel,
  value,
  groups,
  count,
  active,
  setActive,
  query,
  setQuery,
  searchable,
  allowCustom,
  fitContent,
  onKeyDown,
  commit,
}: ComboboxListProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const activeId = count > 0 ? optionId(active) : undefined;

  // Keep the highlighted option in view as the arrow keys move it through a long list.
  React.useEffect(() => {
    if (!activeId) return;
    document.getElementById(activeId)?.scrollIntoView?.({ block: "nearest" });
  }, [activeId]);

  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        data-slot="combobox-list"
        side="bottom"
        align="start"
        sideOffset={4}
        // Flip above the trigger when there is no room below, and never touch the viewport edge.
        collisionPadding={8}
        // Radix copies this element's COMPUTED z-index onto the wrapper it positions. It must beat the
        // modal tier: `dialog.tsx`/`sheet.tsx` are `fixed z-50`, so a combobox opened inside a dialog
        // would be painted over at an equal 50. `--z-popover` (60) clears it and stays under toasts.
        // A chip is narrower than what it filters by ("Site" over "Adelaide Depot — 6 schedules"), so
        // its list takes the width of its longest option, never narrower than the chip.
        style={{
          width: fitContent ? "max-content" : "var(--radix-popover-trigger-width)",
          minWidth: fitContent ? "var(--radix-popover-trigger-width)" : undefined,
          zIndex: "var(--z-popover)",
        }}
        // Open on the search box, or the list itself without one (Radix's default would pick the
        // first focusable child, which is not always that).
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (searchable ? inputRef.current : listRef.current)?.focus();
        }}
        className={cn(
          "max-h-64 min-w-48 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-(--elev-popover)",
          fitContent && "max-w-[min(40rem,calc(100vw-16px))]",
        )}
      >
        {searchable && (
          <input
            ref={inputRef}
            aria-label={`${ariaLabel} search`}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            className="mb-1 h-7 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg focus-visible:outline-none"
            placeholder={allowCustom ? "search or type…" : "search…"}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
          />
        )}
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={`${ariaLabel} options`}
          // Without the search box the list itself takes focus and the arrow keys.
          tabIndex={searchable ? undefined : -1}
          aria-activedescendant={searchable ? undefined : activeId}
          onKeyDown={searchable ? undefined : onKeyDown}
          className="focus-visible:outline-none"
        >
          {count === 0 && !allowCustom && (
            <li role="presentation" className="px-2 py-1.5 text-sm text-muted">
              no matches
            </li>
          )}
          {count === 0 && allowCustom && query.trim() && (
            <li role="presentation">
              <button
                type="button"
                className="min-h-8 w-full rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)"
                onClick={() => commit(query.trim())}
              >
                Use “{query.trim()}”
              </button>
            </li>
          )}
          {groups.map((g) => (
            <React.Fragment key={g.name ?? "__ungrouped__"}>
              {g.name && (
                <li
                  role="presentation"
                  className="px-2 pb-0.5 pt-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-faint"
                  aria-hidden
                >
                  {g.name}
                </li>
              )}
              {g.items.map(({ o, idx }) => (
                <li key={o.value} role="presentation">
                  <button
                    type="button"
                    id={optionId(idx)}
                    role="option"
                    aria-selected={o.value === value}
                    // Not a tab stop: the search box (or the list) keeps focus and points here.
                    tabIndex={-1}
                    className={cn(
                      "flex min-h-8 w-full items-start gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-fg hover:bg-(--hover-wash)",
                      idx === active && "bg-bg",
                    )}
                    onClick={() => commit(o.value)}
                  >
                    {o.swatch && (
                      <span
                        className="mt-0.5 inline-block h-3 w-3 shrink-0 rounded-full"
                        style={{ background: o.swatch }}
                        aria-hidden
                      />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{o.label ?? o.value}</span>
                      {o.description && (
                        <span className="block truncate text-caption text-muted">
                          {o.description}
                        </span>
                      )}
                    </span>
                    {o.value === value && (
                      <Check size={12} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    )}
                  </button>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

export { ComboboxList };
export type { ComboboxListProps };
