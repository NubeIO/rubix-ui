// The select: a trigger that opens a listbox, with a type-to-filter search box by default. Supports
// grouped options, one-line descriptions, a colour swatch per option, `allowCustom` (the typed text
// commits as the value), a plain list without search (`searchable={false}`) and a filter-chip trigger
// (`chip`). `cmdk` is not a dependency: the filter/group/keyboard logic is ours.
//
// The parts: the option model (`combobox-options.ts`), the open list (`combobox-list.tsx`) and the two
// triggers (`combobox-field.tsx`, `combobox-chip.tsx`). This file holds the state and joins them.
//
// One responsibility: the Combobox's state and its keyboard.

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { useOverlayContainer } from "../lib/overlay";
import { ComboboxChip } from "./combobox-chip";
import { ComboboxField } from "./combobox-field";
import { ComboboxList } from "./combobox-list";
import { groupOptions, matches, type ComboboxOption } from "./combobox-options";
import { useDialogSurface } from "./dialog";

export type { ComboboxOption };

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
  const id = React.useId();
  const listId = `${id}-list`;
  const optionId = (idx: number) => `${id}-opt-${idx}`;

  // Inside a `DialogContent` (or a `Sheet`, the same Radix Dialog) the surface's focus trap treats a
  // body-portalled list as "outside" and dismisses it before it can be used (radix #2121), and a
  // second modal layer inside the modal makes two focus scopes fight over the search input. So the
  // list portals INTO the surface's content node there; in an extension, into its root; elsewhere,
  // the body. The popover stays non-modal in every case.
  const dialogSurface = useDialogSurface();
  const overlayContainer = useOverlayContainer();
  const container = dialogSurface ?? overlayContainer;

  const filtered = options.filter((o) => matches(o, query));
  const current = options.find((o) => o.value === value);

  // Each opening starts from an empty search with the first option highlighted.
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
  const clear = () => {
    onChange("");
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

  const list = (
    <ComboboxList
      container={container}
      listId={listId}
      optionId={optionId}
      ariaLabel={ariaLabel}
      value={value}
      groups={groupOptions(filtered)}
      count={filtered.length}
      active={active}
      setActive={setActive}
      query={query}
      setQuery={setQuery}
      searchable={searchable}
      allowCustom={allowCustom}
      fitContent={chip !== undefined}
      onKeyDown={onKeyDown}
      commit={commit}
    />
  );

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      {chip !== undefined ? (
        <ComboboxChip
          chip={chip}
          ariaLabel={ariaLabel}
          open={open}
          listId={listId}
          disabled={disabled}
          on={value !== ""}
          label={
            renderValue?.(value, current) || (current ? (current.label ?? current.value) : value)
          }
          onClear={clear}
          className={className}
        >
          {list}
        </ComboboxChip>
      ) : (
        <ComboboxField
          ariaLabel={ariaLabel}
          open={open}
          listId={listId}
          disabled={disabled}
          size={size}
          current={current}
          label={
            (value !== "" && renderValue?.(value, current)) ||
            (current ? (current.label ?? current.value) : value || placeholder)
          }
          // Only when clearable AND a value is set (nothing to clear otherwise).
          showClear={clearable && !disabled && value !== ""}
          onClear={clear}
          className={className}
        >
          {list}
        </ComboboxField>
      )}
    </PopoverPrimitive.Root>
  );
}
