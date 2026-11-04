// A surface or section with nothing to show yet: a quiet centred stack with an icon, what is missing,
// a one-line hint, and the ONE action that teaches it (an empty state that only says "nothing here"
// wastes the moment). The rubix-ai app's empty state, so an extension's reads the same. No card box: on
// a large empty canvas a boxed card reads as a widget that failed to load.
// One component per file.

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../lib/cn";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  /** The hint under the title. */
  description?: ReactNode;
  /** The teaching action, usually ONE `<Button>`. Omit when the caller may not create anything. */
  action?: ReactNode;
  className?: string;
}

function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn("flex flex-1 items-center justify-center p-6", className)}
    >
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-fg/5 text-muted shadow-[inset_0_0_0_1px_hsl(var(--fg)/0.07)]">
          <Icon size={20} aria-hidden />
        </div>
        <p className="text-sm font-medium text-fg">{title}</p>
        {description && (
          <p className="mt-1.5 max-w-[36ch] text-xs leading-5 text-muted">{description}</p>
        )}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}

export { EmptyState };
