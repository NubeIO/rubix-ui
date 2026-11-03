// The `switch` primitive — a token-bound boolean toggle. Hand-authored (matching the way
// `sidebar.tsx` binds the upstream shadcn components to our palette) because we don't carry the
// `@radix-ui/react-switch` dep; a `role="switch"` button gives the same a11y contract without it.
// Replaces the hand-rolled `role="switch"` toggles (ui-standards-scope, component backlog).
// Controlled (`checked` + `onCheckedChange`) or uncontrolled (`defaultChecked`). One primitive per
// file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";

interface SwitchProps extends Omit<React.ComponentProps<"button">, "onChange" | "type"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, checked, defaultChecked, onCheckedChange, disabled, onClick, ...props },
  ref,
) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const on = isControlled ? checked : internal;

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={on}
      data-slot="switch"
      data-state={on ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        const next = !on;
        if (!isControlled) setInternal(next);
        onCheckedChange?.(next);
      }}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        on ? "bg-accent" : "bg-border",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-bg shadow-sm ring-0 transition-transform",
          on ? "translate-x-4" : "translate-x-0.5",
        )}
      />
    </button>
  );
});

export { Switch };
