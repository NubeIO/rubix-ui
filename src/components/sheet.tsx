import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "../lib/cn";
import { useOverlayContainer } from "../lib/overlay";

import { DialogSurfaceContext } from "./dialog";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root {...props} />;
}

function SheetPortal({ container, ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  const fallback = useOverlayContainer();
  return <SheetPrimitive.Portal container={container ?? fallback} {...props} />;
}

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(function SheetOverlay({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", className)}
      {...props}
    />
  );
});

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
  }
>(function SheetContent({ className, children, side = "right", ...props }, ref) {
  // A Sheet IS a Radix Dialog, so the same popover-in-modal dismissal applies (radix #2121): a nested
  // body-portalled panel (the shared `Combobox`) is "outside" the sheet's focus scope and gets trapped
  // back before it can be used. Provide the SAME `DialogSurfaceContext` `dialog.tsx` does, exposing the
  // content node so such controls portal INTO the sheet instead of the body.
  const [surface, setSurface] = React.useState<HTMLDivElement | null>(null);
  const setSurfaceRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      setSurface(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={setSurfaceRef}
        data-panel=""
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-panel shadow-(--elev-dialog) transition ease-in-out animate-in",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        <DialogSurfaceContext.Provider value={surface}>{children}</DialogSurfaceContext.Provider>
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />;
}

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(function SheetTitle({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Title ref={ref} className={cn("font-semibold text-fg", className)} {...props} />
  );
});

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(function SheetDescription({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted", className)}
      {...props}
    />
  );
});

export { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle };
