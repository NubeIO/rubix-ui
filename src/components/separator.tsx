// The `separator` primitive — a token-bound divider. Hand-authored (no `@radix-ui/react-separator` dep;
// a `role="separator"` div matches the a11y contract). One primitive per file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";

interface SeparatorProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  /** Purely visual (no semantic separation) — omit it from the a11y tree. */
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { className, orientation = "horizontal", decorative = true, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
});

export { Separator };
