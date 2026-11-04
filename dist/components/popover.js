import { jsx as t } from "react/jsx-runtime";
import * as i from "react";
import * as e from "@radix-ui/react-popover";
import { cn as d } from "../lib/cn.js";
import { useOverlayContainer as p } from "../lib/overlay.js";
function c({ ...o }) {
  return /* @__PURE__ */ t(e.Root, { "data-slot": "popover", ...o });
}
const s = i.forwardRef((o, r) => /* @__PURE__ */ t(e.Trigger, { ref: r, "data-slot": "popover-trigger", ...o }));
s.displayName = "PopoverTrigger";
function v({ ...o }) {
  return /* @__PURE__ */ t(e.Anchor, { "data-slot": "popover-anchor", ...o });
}
function g({
  className: o,
  align: r = "center",
  sideOffset: a = 4,
  ...n
}) {
  return (
    // Portalled to the body: `z-50` only orders WITHIN the nearest stacking context, so an ancestor
    // pairing `overflow-hidden` with a radius would clip an in-flow panel no matter its z-index.
    // Leaving the subtree is the only thing that wins — the same reasoning `combobox.tsx` documents.
    /* @__PURE__ */ t(e.Portal, { container: p(), children: /* @__PURE__ */ t(
      e.Content,
      {
        "data-slot": "popover-content",
        align: r,
        sideOffset: a,
        className: d(
          "z-(--z-popover) w-72 rounded-md border border-border bg-panel p-1 text-fg shadow-(--elev-popover) outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          o
        ),
        ...n
      }
    ) })
  );
}
export {
  c as Popover,
  v as PopoverAnchor,
  g as PopoverContent,
  s as PopoverTrigger
};
