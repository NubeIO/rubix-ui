// The `radio` primitive, token-bound like `checkbox.tsx`: a styled native `<input type="radio">`,
// accessible and form-native, with no Radix dependency. Group radios by giving them the same `name`
// (and wrap each in a `<label>`). One primitive per file.

import * as React from "react";

import { cn } from "../lib/cn";

function Radio({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="radio"
      data-slot="radio"
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer border-border accent-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Radio };
