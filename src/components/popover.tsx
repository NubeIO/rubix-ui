// The `popover` primitive — shadcn/ui new-york over `@radix-ui/react-popover`, themed to the
// Lazybones shell tokens (bg-panel/text-fg/border-border), matching `dropdown-menu.tsx`.
//
// The dependency was already installed and already consumed RAW by `combobox.tsx` and
// `color-picker.tsx`, each re-declaring its own content styling inline. This is the shared wrapper
// those two predate — a themed `PopoverContent` with one set of side-aware animations, so a third
// consumer (the floating nav's collapsed flyout) does not become a third encoding of "a floating
// panel looks like this".
//
// Radix owns portalling, collision flip, scroll/resize reposition, outside-click dismissal, Escape,
// and focus return. Do NOT hand-roll positioning on top of this. One primitive per file (FILE-LAYOUT).

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../lib/cn";
import { useOverlayContainer } from "../lib/overlay";

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

// forwardRef: a Tooltip wrapping this trigger (`asChild`) hands it a ref to anchor on, and React 18
// drops refs given to a plain function component.
const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>((props, ref) => <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props} />);
PopoverTrigger.displayName = "PopoverTrigger";

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    // Portalled to the body: `z-50` only orders WITHIN the nearest stacking context, so an ancestor
    // pairing `overflow-hidden` with a radius would clip an in-flow panel no matter its z-index.
    // Leaving the subtree is the only thing that wins — the same reasoning `combobox.tsx` documents.
    <PopoverPrimitive.Portal container={useOverlayContainer()}>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-(--z-popover) w-72 rounded-md border border-border bg-panel p-1 text-fg shadow-(--elev-popover) outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
