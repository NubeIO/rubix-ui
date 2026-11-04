// The shadcn-style `tabs` primitive, repointed at the Lazybones tokens (`bg`/`fg`/`muted`/`accent`/
// `border`) the way `sidebar.tsx` binds the upstream component to our palette (ui-standards-scope,
// component backlog). A controlled, context-based Tabs with `role="tablist"`/`tab`/`tabpanel` and
// keyboard arrows — no Radix dependency (keeps the bundle lean for a shell control). One primitive
// per file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";
import { useReveal } from "../lib/motion";

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
}
const Ctx = React.createContext<TabsCtx | null>(null);

function useTabsCtx(component: string): TabsCtx {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>`);
  return ctx;
}

interface TabsProps extends React.ComponentProps<"div"> {
  value: string;
  onValueChange: (v: string) => void;
}

function Tabs({ value, onValueChange, className, ...props }: TabsProps) {
  // `useId` must be called at the top level, not inside the memo callback (rules of hooks).
  const baseId = React.useId();
  const ctx = React.useMemo<TabsCtx>(
    () => ({ value, setValue: onValueChange, baseId }),
    [value, onValueChange, baseId],
  );
  return (
    <Ctx.Provider value={ctx}>
      <div data-slot="tabs" className={cn("flex flex-col gap-3", className)} {...props} />
    </Ctx.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="tablist"
      data-slot="tabs-list"
      className={cn(
        // Track + active-pill colors come from the `--tab-*` vars (globals.css) so the look's
        // `data-buttons` axis can swap the house tint for stock shadcn's flat pill on a muted track.
        "flex flex-wrap items-center gap-1 rounded-lg border border-border bg-(--tab-track) p-1",
        className,
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ComponentProps<"button"> {
  value: string;
}

function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const { value: active, setValue, baseId } = useTabsCtx("TabsTrigger");
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      data-slot="tabs-trigger"
      tabIndex={selected ? 0 : -1}
      onClick={() => setValue(value)}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "bg-(--tab-active-bg) text-(--tab-active-fg) shadow-(--tab-active-shadow)"
          : "text-muted hover:bg-bg hover:text-fg",
        className,
      )}
      {...props}
    />
  );
}

interface TabsContentProps extends React.ComponentProps<"div"> {
  value: string;
}

function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { value: active, baseId } = useTabsCtx("TabsContent");
  // The app's entrance animation when it provides one (`RubixUiProvider motion`), else a plain div.
  const Reveal = useReveal();
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      data-slot="tabs-content"
      // A flex column so a `min-h-0 flex-1` panel inside can own a bounded scroll region — without
      // `display:flex` here the block box collapses the flex-height chain and the panel can't scroll.
      className={cn("flex min-h-0 flex-col focus-visible:outline-none", className)}
      tabIndex={0}
      {...props}
    >
      {/* A tab swap re-mounts this panel (inactive → null), so a keyed Reveal gives the incoming panel
          the app's entrance (its fade+slide, gated by the member's motion pref; none without a
          provider). The Reveal wrapper carries the flex-height chain so a `min-h-0 flex-1` panel can own its own
          scroll region (without this the block-level wrapper collapses the chain and the panel can't
          scroll). */}
      <Reveal key={value} className="flex min-h-0 flex-1 flex-col">
        {children}
      </Reveal>
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
