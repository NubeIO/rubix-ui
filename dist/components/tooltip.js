import { jsx as t } from "react/jsx-runtime";
import * as n from "react";
import * as e from "@radix-ui/react-tooltip";
import { cn as p } from "../lib/cn.js";
import { useOverlayContainer as a } from "../lib/overlay.js";
function s({
  delayDuration: o = 0,
  ...r
}) {
  return /* @__PURE__ */ t(e.Provider, { delayDuration: o, ...r });
}
function c({ ...o }) {
  return /* @__PURE__ */ t(e.Root, { ...o });
}
const m = n.forwardRef((o, r) => /* @__PURE__ */ t(e.Trigger, { ref: r, ...o }));
m.displayName = "TooltipTrigger";
function T({
  className: o,
  sideOffset: r = 6,
  ...i
}) {
  return /* @__PURE__ */ t(e.Portal, { container: a(), children: /* @__PURE__ */ t(
    e.Content,
    {
      sideOffset: r,
      className: p(
        "z-(--z-tooltip) overflow-hidden rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs text-fg shadow-(--elev-popover) animate-in fade-in-0 zoom-in-95",
        o
      ),
      ...i
    }
  ) });
}
export {
  c as Tooltip,
  T as TooltipContent,
  s as TooltipProvider,
  m as TooltipTrigger
};
