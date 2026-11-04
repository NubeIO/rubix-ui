// The searchable Select primitive (editor-parity scope, step 1) — the shadcn-combobox pattern bound to
// the Lazybones tokens: a trigger button that opens a type-to-filter listbox. Supports grouped options,
// one-line descriptions, an optional color swatch per option, and `allowCustom` (the typed text commits
// as the value — the degrade path for a field picker with no preview frames yet). One primitive per
// file (FILE-LAYOUT).
//
// The list is a Radix Popover — PORTALLED to the body, the same seam `dropdown-menu.tsx`/`menubar.tsx`/
// `tooltip.tsx` ride. It used to render as an in-flow `absolute z-50` sibling, which any ancestor
// pairing `overflow-hidden` with `rounded-md` silently clipped (the option-row groups in
// `OptionGroupsForm`/`OptionSurface`/`StatComposer` all do). `z-50` only orders WITHIN the nearest
// stacking context, so it could not win against a clipping ancestor — only leaving the subtree does.
// Radix also owns the collision flip, scroll/resize reposition, outside-click, and focus return; do
// NOT regress this to a bare absolutely-positioned div. `cmdk` is still not a dependency — the
// filter/group/keyboard logic below stays ours.

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, ChevronDown, CirclePlus, X } from "lucide-react";

import { cn } from "../lib/cn";
import { useOverlayContainer } from "../lib/overlay";

import { useDialogSurface } from "./dialog";

export interface ComboboxOption {
  value: string;
  /** Display label (defaults to the value). */
  label?: string;
  /** Optional group header this option renders under. */
  group?: string;
  /** Optional one-line description rendered under the label. */
  description?: string;
  /** Optional CSS color rendered as a swatch dot before the label. */
  swatch?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** The accessible name of the trigger (and `<name> search` for the filter input). */
  "aria-label": string;
  /** Commit free-typed text as the value on Enter (the labeled escape hatch, e.g. no frames yet). */
  allowCustom?: boolean;
  /** Show an inline clear (×) on the trigger when a value is set; clicking it commits `""` (— none —). */
  clearable?: boolean;
  disabled?: boolean;
  /** `md` (36px, 14px text) matches `Input` and `Select` in a form; `sm` (32px, 12px) is the chrome
   *  size for a toolbar or a dense row. */
  size?: "md" | "sm";
  /** Draw the trigger's VALUE yourself: a tag beside a variable, a name with its id. Called only
   *  while a value is set, with the option it matches when there is one. Return nothing to keep the
   *  default text. */
  renderValue?: (value: string, option: ComboboxOption | undefined) => React.ReactNode;
  /** Show the search box at the top of the list (default). Off for a short, fixed list that reads
   *  better as a plain menu; the arrow keys and Enter still work. */
  searchable?: boolean;
  /** Draw the trigger as a filter chip named `chip`: "⊕ Site" (dashed) while the value is `""`, then
   *  "Site · Adelaide Depot" (accent) with a clear button that sets it back to `""`. `renderValue`
   *  draws the part after the dot (a shorter name than the list shows, say). */
  chip?: string;
  className?: string;
}

/** Case-insensitive filter over value + label + description. */
function matches(o: ComboboxOption, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    o.value.toLowerCase().includes(needle) ||
    (o.label ?? "").toLowerCase().includes(needle) ||
    (o.description ?? "").toLowerCase().includes(needle)
  );
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "— select —",
  "aria-label": ariaLabel,
  allowCustom = false,
  clearable = false,
  disabled = false,
  size = "md",
  renderValue,
  searchable = true,
  chip,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  // Inside the app's `DialogContent` (or a `Sheet` — same Radix Dialog) the surface's focus trap
  // treats our body-portalled list as "outside" and dismisses/traps it before it can be used
  // (popover-in-dialog dismissal, radix #2121), and rendering our own modal layer inside the modal
  // creates two focus scopes that fight over the search input (untypeable in the browser, and it OOMs
  // V8 in jsdom). Instead, portal the list INTO the surface's content node — focus then stays inside
  // the surface's single focus scope and the search input is reached normally. Both `dialog.tsx` and
  // `sheet.tsx` provide the surface via `DialogSurfaceContext`. Outside a modal we portal to the body
  // (the default) so an outside click passes through to the canvas. The popover stays non-modal in
  // both cases.
  const dialogSurface = useDialogSurface();
  const overlayContainer = useOverlayContainer();
  const portalContainer = dialogSurface ?? overlayContainer;

  const filtered = options.filter((o) => matches(o, query));
  const current = options.find((o) => o.value === value);

  // Outside-click, scroll/resize reposition, and focus-return-to-trigger are Radix's job now
  // (`Popover.Root` + `Portal` + `Content`) — no hand-rolled document listener here.
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const commit = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = filtered[active];
      if (hit) commit(hit.value);
      else if (allowCustom && query.trim()) commit(query.trim());
    }
  };

  // Render options grouped in first-seen group order; ungrouped options come first.
  const groups: Array<{
    name: string | undefined;
    items: Array<{ o: ComboboxOption; idx: number }>;
  }> = [];
  filtered.forEach((o, idx) => {
    const g = groups.find((x) => x.name === o.group);
    if (g) g.items.push({ o, idx });
    else groups.push({ name: o.group, items: [{ o, idx }] });
  });

  // Show the clear affordance only when clearable AND a value is actually set (nothing to clear otherwise).
  const showClear = clearable && !disabled && value !== "";

  const list = (
    <PopoverPrimitive.Portal container={portalContainer}>
      <PopoverPrimitive.Content
        data-slot="combobox-list"
        side="bottom"
        align="start"
        sideOffset={4}
        // Flip above the trigger when there is no room below, and never touch the viewport edge.
        collisionPadding={8}
        // Match the trigger's width (Radix exposes it as a CSS var), but stay readable when the
        // trigger is very narrow — the old inline list used `w-full min-w-48` for the same reason.
        // Radix copies this element's COMPUTED z-index onto the wrapper it positions (the content
        // box itself is `position: static`, where z-index is inert). It must beat the modal tier:
        // `dialog.tsx`/`sheet.tsx` are `fixed z-50`, so a combobox opened inside a dialog is
        // painted over at an equal 50. `--z-popover` (60) clears the modal layer and stays under toasts (70).
        // A chip is narrower than what it filters by ("Site" over "Adelaide Depot — 6 schedules"), so its
        // list takes the width of its longest option instead, never narrower than the chip.
        style={{
          width: chip !== undefined ? "max-content" : "var(--radix-popover-trigger-width)",
          minWidth: chip !== undefined ? "var(--radix-popover-trigger-width)" : undefined,
          zIndex: "var(--z-popover)",
        }}
        // Pin open-focus to the filter input EXPLICITLY. Radix's default already lands there today
        // (it focuses the first focusable child, verified in Chromium), so this is belt-and-braces
        // rather than load-bearing — it keeps focus correct if the content is ever reordered or a
        // focusable element is added above the input. Focus RETURN to the trigger on close is
        // Radix's, and is covered in the browser spec.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (searchable ? inputRef.current : listRef.current)?.focus();
        }}
        className={cn(
          "max-h-64 min-w-48 overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-(--elev-popover)",
          chip !== undefined && "max-w-[min(40rem,calc(100vw-16px))]",
        )}
      >
        {searchable && (
          <input
            ref={inputRef}
            aria-label={`${ariaLabel} search`}
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
          role="listbox"
          aria-label={`${ariaLabel} options`}
          // Without the search box the list itself takes focus and the arrow keys.
          tabIndex={searchable ? undefined : -1}
          onKeyDown={searchable ? undefined : onKeyDown}
          className="focus-visible:outline-none"
        >
          {filtered.length === 0 && !allowCustom && (
            <li className="px-2 py-1.5 text-sm text-muted">no matches</li>
          )}
          {filtered.length === 0 && allowCustom && query.trim() && (
            <li>
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
                  className="px-2 pb-0.5 pt-1.5 text-caption font-semibold uppercase tracking-[0.08em] text-faint"
                  aria-hidden
                >
                  {g.name}
                </li>
              )}
              {g.items.map(({ o, idx }) => (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={o.value === value}
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

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      {chip !== undefined ? (
        <span
          data-slot="combobox-chip"
          className={cn(
            "inline-flex h-8 items-center rounded-md border text-xs transition-colors",
            value !== ""
              ? "border-accent/45 bg-accent/10"
              : "border-dashed border-border bg-bg hover:bg-(--hover-wash)",
            className,
          )}
        >
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              role="combobox"
              aria-expanded={open}
              aria-label={ariaLabel}
              disabled={disabled}
              data-slot="combobox-trigger"
              className="inline-flex h-full items-center gap-1.5 rounded-md px-2.5 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 disabled:opacity-50"
            >
              {value !== "" ? (
                <>
                  {chip}
                  <span className="max-w-[180px] truncate font-medium text-accent">
                    ·{" "}
                    {renderValue?.(value, current) ||
                      (current ? (current.label ?? current.value) : value)}
                  </span>
                </>
              ) : (
                <>
                  <CirclePlus size={14} className="shrink-0 opacity-70" aria-hidden />
                  {chip}
                </>
              )}
            </button>
          </PopoverPrimitive.Trigger>
          {value !== "" && !disabled && (
            // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
            <button
              type="button"
              aria-label={`clear ${ariaLabel}`}
              className="mr-1 grid size-5 place-items-center rounded-[4px] text-muted hover:bg-(--hover-wash) hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              <X size={12} aria-hidden />
            </button>
          )}
          {list}
        </span>
      ) : (
        <div className={cn("relative", className)}>
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              role="combobox"
              aria-expanded={open}
              aria-label={ariaLabel}
              disabled={disabled}
              data-slot="combobox-trigger"
              className={cn(
                // `pr-[9px]` plus the 1px border puts the chevron 10px from the field's OUTER right edge
                // at both heights (Rubix Chart Shading sheet §10, the combobox rule).
                // The field look Input and Select share (focus border + ring, disabled fade, the
                // `--pad-field-x` inset at both heights) so a Combobox and a Select line up in one form.
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
                  // whether or not there is a value to clear. The text stops 8px before the clear
                  // button's hit area: that area starts 43px (sm) or 45px (md) from the outer edge and
                  // this box ends 26px from it.
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
                {(value !== "" && renderValue?.(value, current)) ||
                  (current ? (current.label ?? current.value) : value || placeholder)}
              </span>
              {/* The sheet's chevron: a single down chevron, 12px, `--faint` (strokeWidth 3 on the 24-unit
                lucide grid is the sheet's 1.5px at 12px). The Select draws the same one as a token. */}
              <ChevronDown size={12} strokeWidth={3} className="shrink-0 text-faint" aria-hidden />
            </button>
          </PopoverPrimitive.Trigger>
          {showClear && (
            // A sibling (not nested, the trigger is a <button>), absolutely positioned over the label's
            // reserved right pad, LEFT of the chevron. From the field's outer right edge: the chevron is
            // at 10 to 22px, this 12px icon is 5px left of it at 27 to 39px, and the hit area is centred
            // on the icon: 20 by 20 at 32px tall, 24 by 24 at 36px (Rubix Chart Shading sheet §10). It
            // reaches into the 5px gap and wins there; anywhere outside it opens the list.
            // Clears to "" (none) without opening the list.
            // eslint-disable-next-line no-restricted-syntax -- a tiny inline affordance, not a Button
            <button
              type="button"
              aria-label={`clear ${ariaLabel}`}
              className={cn(
                "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[4px] text-faint hover:bg-[hsl(var(--fg)/0.06)] hover:text-fg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
                size === "sm" ? "right-[23px] h-5 w-5" : "right-[21px] h-6 w-6",
              )}
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              <X size={12} aria-hidden />
            </button>
          )}

          {list}
        </div>
      )}
    </PopoverPrimitive.Root>
  );
}
