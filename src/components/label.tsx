// The `label` primitive — a token-bound form label. Hand-authored (matching `switch.tsx`/`sidebar.tsx`:
// we bind upstream shadcn shapes to our palette rather than carry the `@radix-ui/react-label` dep; a
// native `<label>` gives the same association contract without it). One primitive per file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(function Label(
  { className, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none text-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
});

export { Label };
