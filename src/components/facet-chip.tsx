// One dashed filter chip (the Insights toolbar's): "+ Label" at rest, opening a checklist of the values
// present; picked values ride on the chip ("Time zone · Australia/Perth") and its × clears them.
// Multi-select, with an optional count beside each value. Ported from rubix-ai's `FacetChip` without
// its dashboard-only modes (locked, single pick, capped counts).
//
// One responsibility: pick values for one facet.

import { useRef } from "react";
import { CirclePlus, X } from "lucide-react";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface FacetChipProps {
  label: string;
  values: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  /** How a raw value reads ("holiday" → "Holiday"). */
  render?: (v: string) => string;
  /** A count beside each value. */
  counts?: Record<string, number>;
}

export function FacetChip({ label, values, selected, onChange, render = (v) => v, counts }: FacetChipProps) {
  const active = selected.length > 0;
  // The × unmounts on clear; focus goes back to the trigger rather than to <body>.
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    // The × is a sibling of the trigger (a button inside a button is invalid); this div carries the
    // chip's one-control look so the two buttons read as one chip.
    <div
      className={`inline-flex h-8 min-w-0 max-w-full items-center gap-0.5 rounded-md border pr-1 text-xs text-fg transition-colors ${active ? "border-solid border-accent/45 bg-accent/10 has-[[data-facet]:hover]:bg-accent/15" : "border-dashed border-border bg-bg has-[[data-facet]:hover]:bg-panel"}`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            type="button"
            variant="ghost"
            className="h-full min-w-0 gap-1.5 rounded-md px-2.5 text-xs hover:bg-transparent"
            aria-label={`filter by ${label.toLowerCase()}${active ? `: ${selected.map(render).join(", ")}` : ""}`}
            data-facet={label}
          >
            {active ? null : <CirclePlus size={14} className="shrink-0 opacity-70" />}
            {label}
            {active ? <span className="min-w-0 max-w-[200px] truncate text-muted">· {selected.map(render).join(", ")}</span> : null}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56 p-1.5">
          <p className="px-2 pb-1 pt-0.5 text-micro font-semibold uppercase tracking-wide text-muted">{label}</p>
          {values.length === 0 ? (
            <p className="px-2 py-1.5 text-xs text-muted">Nothing to filter on</p>
          ) : (
            <ul aria-label={`${label} values`} className="flex flex-col">
              {values.map((v) => (
                <li key={v}>
                  <label className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-xs hover:bg-fg/[0.05]">
                    <Checkbox
                      checked={selected.includes(v)}
                      onChange={(e) => onChange(e.target.checked ? [...selected, v] : selected.filter((s) => s !== v))}
                      aria-label={render(v)}
                    />
                    <span className="truncate">{render(v)}</span>
                    {counts && v in counts ? (
                      <span className="ml-auto font-mono text-caption tabular-nums text-muted">
                        {counts[v].toLocaleString()}
                      </span>
                    ) : null}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
      {active && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-auto shrink-0 rounded-sm p-0.5 opacity-70 hover:bg-panel hover:opacity-100"
          aria-label={`clear ${label.toLowerCase()} filter`}
          onClick={() => {
            onChange([]);
            triggerRef.current?.focus();
          }}
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
}
