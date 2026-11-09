// The dashboard panel's frame, for a panel shown outside the dashboard grid (an extension embedding a
// real panel with dash-kit's `PanelEmbed`, which otherwise renders bare).
//
// Twin of rubix-ai's `panelChromeProps` (`ui/src/features/dashboard/panelChrome.tsx`): keep the two in
// step. The frame goes around a whole panel body (a dashboard `WidgetFrame`'s bands included), once;
// never nest one frame inside another.
//
// `data-panel` and `surface-panel` are what the host's global CSS keys the look's surface treatments
// (elevated, glass) on, so they reach the DOM exactly as the app writes them. Two classes differ in
// spelling only, because a comma in a class name trips the scoped-CSS guard:
//   - the shadows read the host's `--elev-panel`/`--elev-panel-hover`, which hold the app's literal
//     values. Not inline: an inline box-shadow would beat the host's elevated/glass `[data-panel]` rule;
//   - the app's arbitrary transition (box-shadow and border-color) is `transition-shadow` plus an
//     inline transition-property. (The app's class name is not written out here: Tailwind scans this
//     file, and a comment naming it would ship the comma rule the guard rejects.)
//
// One responsibility: draw the panel frame.

import type { ComponentProps } from "react";

import { cn } from "../lib/cn";

export interface PanelFrameProps extends ComponentProps<"div"> {
  /** Grafana's transparent panel: no border, background or shadow, and no `data-panel`. */
  transparent?: boolean;
}

export function PanelFrame({ transparent, className, style, ...props }: PanelFrameProps) {
  if (transparent) {
    return (
      <div
        data-transparent="true"
        className={cn("group/cell flex flex-col overflow-hidden rounded-panel", className)}
        style={style}
        {...props}
      />
    );
  }
  return (
    <div
      data-panel=""
      className={cn(
        "surface-panel group/cell flex flex-col overflow-hidden rounded-panel border border-border bg-panel shadow-(--elev-panel) transition-shadow hover:border-fg/25 hover:shadow-(--elev-panel-hover)",
        className,
      )}
      style={{ transitionProperty: "box-shadow, border-color", ...style }}
      {...props}
    />
  );
}
