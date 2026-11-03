// The ONE in-progress glyph: lucide's `Loader2`, spinning. A busy button, a row mid-delete and a
// loading line all mean the same thing and should not each pick a size and a speed. It carries no
// colour of its own (it takes the ink around it) and is decorative unless given an `aria-label`.
// One primitive per file (FILE-LAYOUT).

import { Loader2 } from "lucide-react";

import { cn } from "../lib/cn";

function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2>) {
  return (
    <Loader2
      data-slot="spinner"
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn("size-3.5 shrink-0 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
