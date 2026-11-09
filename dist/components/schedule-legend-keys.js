import { jsxs as e, Fragment as s, jsx as r } from "react/jsx-runtime";
import { HATCH as a } from "./schedule-kinds.js";
function i() {
  return /* @__PURE__ */ e(s, { children: [
    /* @__PURE__ */ e("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ r("span", { "aria-hidden": !0, className: "size-2.5 rounded-xs border border-dashed border-ink-strong" }),
      "Extra hours"
    ] }),
    /* @__PURE__ */ e("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ r("span", { "aria-hidden": !0, className: "size-2.5 rounded-xs border border-line-strong", style: a }),
      "Closed or holiday"
    ] }),
    /* @__PURE__ */ e("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ r("span", { "aria-hidden": !0, className: "h-2.5 w-0.5 bg-destructive" }),
      "Now"
    ] })
  ] });
}
export {
  i as ScheduleLegendKeys
};
