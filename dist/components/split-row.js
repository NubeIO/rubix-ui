import { jsxs as l } from "react/jsx-runtime";
import { useRef as n } from "react";
import { cn as c } from "../lib/cn.js";
import { useElementWidth as p } from "../lib/element-width.js";
import { SPLIT_STACK_BELOW as d } from "./split-card.js";
function h({ left: i, right: m, stackBelow: s = d, className: e }) {
  const t = n(null), o = p(t), r = o === null || o >= s;
  return /* @__PURE__ */ l(
    "div",
    {
      ref: t,
      "data-split": r ? "side" : "stack",
      className: c("grid gap-4", r ? "[grid-template-columns:calc(60%-1px)_minmax(0,1fr)]" : "grid-cols-1", e),
      children: [
        i,
        m
      ]
    }
  );
}
export {
  h as SplitRow
};
