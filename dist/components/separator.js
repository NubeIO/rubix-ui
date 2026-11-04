import { jsx as n } from "react/jsx-runtime";
import * as p from "react";
import { cn as i } from "../lib/cn.js";
const m = p.forwardRef(function({ className: a, orientation: r = "horizontal", decorative: o = !0, ...t }, e) {
  return /* @__PURE__ */ n(
    "div",
    {
      ref: e,
      "data-slot": "separator",
      role: o ? "none" : "separator",
      "aria-orientation": o ? void 0 : r,
      className: i(
        "shrink-0 bg-border",
        r === "horizontal" ? "h-px w-full" : "h-full w-px",
        a
      ),
      ...t
    }
  );
});
export {
  m as Separator
};
