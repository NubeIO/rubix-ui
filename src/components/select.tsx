// The shadcn-style `select` primitive, repointed at the Lazybones tokens (`bg`/`fg`/`border`/
// `muted`) the way `sidebar.tsx` binds the upstream component to our palette (ui-standards-scope,
// component backlog). A styled wrapper over the native `<select>` — token-bound, accessible,
// mobile-friendly (the native picker), no Radix dependency. One primitive per file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";

/** `md` (36px, 14px text) is the form size and matches `Input`; `sm` (32px, 12px) is the chrome size
 *  for a toolbar or a dense row. The native numeric `size` attribute is not exposed: a list box is a
 *  different control. */
function Select({
  className,
  size = "md",
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & { size?: "md" | "sm" }) {
  return (
    <select
      data-slot="select"
      data-size={size}
      className={cn(
        // The field look Input and Textarea share: same inset, focus border + ring, disabled fade. The
        // browser's own arrow is turned off (it brings its own inner padding, so the text sat further in
        // than an Input's); the chevron is the `--field-chevron` token, placed as the Combobox's is: 12px,
        // 10px from the outer right edge at both heights (Rubix Chart Shading §10).
        "w-full appearance-none rounded-md border border-border bg-bg bg-(image:--field-chevron) bg-no-repeat pl-2.5 text-fg transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm"
          ? "h-8 bg-size-[12px] bg-position-[right_9px_center] pr-7 text-xs"
          : "h-9 bg-size-[12px] bg-position-[right_9px_center] pr-8 text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Select };
