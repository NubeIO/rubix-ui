// The shadcn `alert` primitive, repointed at the Lazybones tokens (`bg-card`/`fg`/`border`/
// `destructive`) the way `sidebar.tsx` binds the upstream component to our palette
// (ui-standards-scope, component backlog). Replaces the legacy `.state-alert` error-banner class.
// One primitive per file (FILE-LAYOUT).

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-card/60 text-fg [&>svg]:text-muted",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive [&>svg]:text-destructive",
        // A message, not an error: a tinted card in the tone's hue with the text in the normal ink, so a
        // line of actions beside it still reads as the page's own controls.
        info: "border-info/30 bg-info/10 text-fg [&>svg]:text-info",
        success: "border-success/30 bg-success/10 text-fg [&>svg]:text-success",
        warning: "border-warning/50 bg-warning/10 text-fg [&>svg]:text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      // The description's line height, so a title beside it (the row layout) sits on the same baseline.
      className={cn("font-medium leading-relaxed tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm leading-relaxed [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
