// The shadcn `table` primitive, repointed at the Lazybones tokens (`bg`/`fg`/`muted`/`border`) the
// way `sidebar.tsx` binds the upstream component to our palette (ui-standards-scope, component
// backlog). Styled wrappers over the native table elements so the admin tables read as one app and
// scroll-in-card on mobile (`overflow-x-auto`). One primitive per file (FILE-LAYOUT).

import * as React from "react";

import { cn } from "../lib/cn";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom border-collapse text-sm text-fg", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className,
  sticky,
  ...props
}: React.ComponentProps<"thead"> & {
  /** Pin the header so it stays put while rows scroll (matches the `DataView` treatment). */
  sticky?: boolean;
}) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "border-b border-border bg-card/40 [&_tr]:border-b",
        sticky && "sticky top-0 z-10 bg-panel shadow-[0_1px_0_hsl(var(--border))]",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors hover:bg-bg/60 data-[state=selected]:bg-accent/10",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-9 px-3 text-left align-middle text-caption font-semibold uppercase tracking-[0.06em] text-muted",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-3 py-2 align-middle text-xs text-fg", className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
