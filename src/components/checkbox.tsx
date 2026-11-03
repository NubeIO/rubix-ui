// The shadcn-style `checkbox` primitive, token-bound like `select.tsx`: a styled native
// `<input type="checkbox">` — accessible, form-native, no Radix dependency. One primitive per
// file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer rounded-md border-border accent-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Checkbox };
