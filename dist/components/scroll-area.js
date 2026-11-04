import { jsxs as d, jsx as e } from "react/jsx-runtime";
import * as s from "react";
import * as r from "@radix-ui/react-scroll-area";
import { cn as t } from "../lib/cn.js";
const m = s.forwardRef(({ className: o, children: l, ...a }, c) => /* @__PURE__ */ d(
  r.Root,
  {
    ref: c,
    className: t("relative overflow-hidden", o),
    ...a,
    children: [
      /* @__PURE__ */ e(r.Viewport, { className: "size-full rounded-[inherit] [&>div]:block! [&>div]:h-full", children: l }),
      /* @__PURE__ */ e(i, {}),
      /* @__PURE__ */ e(r.Corner, {})
    ]
  }
));
m.displayName = r.Root.displayName;
const i = s.forwardRef(({ className: o, orientation: l = "vertical", ...a }, c) => /* @__PURE__ */ e(
  r.ScrollAreaScrollbar,
  {
    ref: c,
    orientation: l,
    className: t(
      "z-20 flex touch-none select-none p-px transition-colors",
      l === "vertical" && "h-full w-2 border-l border-l-transparent",
      l === "horizontal" && "h-2 flex-col border-t border-t-transparent",
      o
    ),
    ...a,
    children: /* @__PURE__ */ e(r.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
i.displayName = r.ScrollAreaScrollbar.displayName;
export {
  m as ScrollArea,
  i as ScrollBar
};
