// A time typed the easy way: "13:05", "1305", "13" or "9.30" all read as a time, and the field settles on
// "HH:MM" when it loses focus. ↑/↓ nudge a minute (Shift: 15 minutes, Alt: an hour). "24:00" is the end
// of the day. The caller keeps the raw text, so a half-typed time is never fought.
// One component per file.

import * as React from "react";

import { cn } from "../lib/cn";
import { DAY_MINS, hhmm, parseTime } from "../lib/time";
import { Input } from "./input";

interface TimeFieldProps extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value: string;
  onChange: (text: string) => void;
}

function TimeField({ value, onChange, className, onKeyDown, onBlur, ...props }: TimeFieldProps) {
  const mins = parseTime(value);
  return (
    <Input
      aria-invalid={mins === undefined}
      inputMode="numeric"
      placeholder="HH:MM"
      title="Type 13:05, 1305 or 13. ↑/↓ nudge a minute; Shift 15 minutes; Alt an hour. 24:00 is the end of the day."
      data-slot="time-field"
      className={cn("w-24 tabular-nums", className)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => {
        if (mins !== undefined && hhmm(mins) !== value) onChange(hhmm(mins));
        onBlur?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented || (e.key !== "ArrowUp" && e.key !== "ArrowDown")) return;
        e.preventDefault();
        const step = e.altKey ? 60 : e.shiftKey ? 15 : 1;
        const next = (mins ?? 0) + (e.key === "ArrowUp" ? step : -step);
        onChange(hhmm(Math.max(0, Math.min(DAY_MINS, next))));
      }}
      {...props}
    />
  );
}

export { TimeField };
