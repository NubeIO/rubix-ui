import { jsx as a } from "react/jsx-runtime";
import { cn as l } from "../lib/cn.js";
function f({ transparent: n, className: e, style: r, ...o }) {
  return n ? /* @__PURE__ */ a(
    "div",
    {
      "data-transparent": "true",
      className: l("group/cell flex flex-col overflow-hidden rounded-panel", e),
      style: r,
      ...o
    }
  ) : /* @__PURE__ */ a(
    "div",
    {
      "data-panel": "",
      className: l(
        "surface-panel group/cell flex flex-col overflow-hidden rounded-panel border border-border bg-panel shadow-(--elev-panel) transition-shadow hover:border-fg/25 hover:shadow-(--elev-panel-hover)",
        e
      ),
      style: { transitionProperty: "box-shadow, border-color", ...r },
      ...o
    }
  );
}
export {
  f as PanelFrame
};
