// The shadcn `dialog` primitive on Radix (`@radix-ui/react-dialog`, already a dep — the same
// primitive `sheet.tsx` wraps), repointed at the Lazybones tokens (`bg-panel`/`fg`/`border`) the
// way `sidebar.tsx` binds the upstream component to our palette (ui-standards-scope, component
// backlog). Replaces the hand-rolled `role="dialog"` in `ConfirmDestructive` / `CreateSeriesWizard`
// — a centered modal with focus trapping and Escape/overlay dismissal for free. One primitive per
// file (FILE-LAYOUT).

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "../lib/cn";
import { useOverlayContainer } from "../lib/overlay";

// The content node for content rendered inside a `DialogContent` — provided again by `sheet.tsx` (a
// Sheet is the same Radix Dialog under the hood), so the two modal surfaces share ONE signal. A modal
// dialog traps focus, so a popover-based control that portals its panel to the body (the shared
// `Combobox`) would read that focus move as "outside", immediately dismiss itself, and never open
// (popover-in-dialog dismissal, radix #2121). Such controls must portal their panel INTO the modal
// content instead — then focus stays inside the surface's single focus scope, the panel can be reached
// by keyboard, and no nested modal layer is needed. This context exposes the content node so a nested
// popover can target it.
export const DialogSurfaceContext = React.createContext<HTMLElement | null>(null);

function useDialogSurface() {
  return React.useContext(DialogSurfaceContext);
}

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />;
}

function DialogPortal({
  container,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  const fallback = useOverlayContainer();
  return <DialogPrimitive.Portal container={container ?? fallback} {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close {...props} />;
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-overlay/60 animate-in fade-in-0", className)}
      {...props}
    />
  );
});

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { showClose?: boolean }
>(function DialogContent({ className, children, showClose = true, ...props }, ref) {
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
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={setSurfaceRef}
        data-panel=""
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-panel p-4 text-fg shadow-(--elev-dialog) duration-200 animate-in fade-in-0 zoom-in-95",
          className,
        )}
        {...props}
      >
        <DialogSurfaceContext.Provider value={surface}>{children}</DialogSurfaceContext.Provider>
        {showClose && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm text-muted opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-sm font-semibold text-fg", className)}
      {...props}
    />
  );
});

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-xs text-muted", className)}
      {...props}
    />
  );
});

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useDialogSurface,
};
