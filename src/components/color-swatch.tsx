// The color swatch picker primitive (editor-parity scope, step 1) — a row of clickable swatches over a
// caller-supplied palette (`{value, css}` pairs; the dashboard feature resolves names → CSS via its
// `fieldconfig/color.ts`, keeping this primitive token-agnostic) plus an optional custom-hex input.
// One primitive per file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";
import { Input } from "./input";

export interface Swatch {
  /** The stored color value (a semantic name or a hex literal). */
  value: string;
  /** The CSS color painted on the swatch. */
  css: string;
  /** Human name for the tooltip/label — the stored `value` is a storage key ("accent"), not what an
   *  author calls the color ("Theme accent"). Absent ⇒ the value reads well enough on its own. */
  label?: string;
}

interface ColorSwatchPickerProps {
  palette: Swatch[];
  value: string;
  onChange: (value: string) => void;
  "aria-label": string;
  /** Show a hex input to type a custom `#rrggbb` (committed on blur/Enter when valid). */
  allowCustom?: boolean;
  className?: string;
}

export function ColorSwatchPicker({
  palette,
  value,
  onChange,
  "aria-label": ariaLabel,
  allowCustom = true,
  className,
}: ColorSwatchPickerProps) {
  const isCustom = !!value && !palette.some((s) => s.value === value);
  const [hex, setHex] = React.useState(isCustom ? value : "");

  const commitHex = () => {
    const v = hex.trim();
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) onChange(v);
  };

  return (
    <div
      className={cn("flex flex-wrap items-center gap-1", className)}
      role="group"
      aria-label={ariaLabel}
    >
      {palette.map((s) => (
        <button
          key={s.value}
          type="button"
          // The aria-label stays keyed to the stored `value` (what a test/author targets); the visible
          // tooltip prefers the human `label`.
          aria-label={`${ariaLabel} ${s.value}`}
          aria-pressed={s.value === value}
          title={s.label ?? s.value}
          className={cn(
            "h-5 w-5 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            s.value === value ? "border-fg ring-2 ring-accent/40" : "border-border",
          )}
          style={{ background: s.css }}
          onClick={() => onChange(s.value)}
        />
      ))}
      {allowCustom && (
        <span className="flex items-center gap-1">
          {isCustom && (
            <span
              className="inline-block h-5 w-5 rounded-full border border-fg"
              style={{ background: value }}
              aria-hidden
            />
          )}
          <Input
            aria-label={`${ariaLabel} custom hex`}
            className="h-6 w-20 px-1.5 text-[11px]"
            placeholder="#22c55e"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            onBlur={commitHex}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitHex();
            }}
          />
        </span>
      )}
    </div>
  );
}
