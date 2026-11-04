import { jsx as i } from "react/jsx-runtime";
import * as a from "react";
import { cn as c } from "../lib/cn.js";
const g = a.forwardRef(function({ className: l, checked: s, defaultChecked: d, onCheckedChange: r, disabled: u, onClick: e, ...b }, f) {
  const n = s !== void 0, [m, p] = a.useState(d ?? !1), t = n ? s : m;
  return /* @__PURE__ */ i(
    "button",
    {
      ref: f,
      type: "button",
      role: "switch",
      "aria-checked": t,
      "data-slot": "switch",
      "data-state": t ? "checked" : "unchecked",
      disabled: u,
      onClick: (w) => {
        e == null || e(w);
        const o = !t;
        n || p(o), r == null || r(o);
      },
      className: c(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        t ? "bg-accent" : "bg-border",
        l
      ),
      ...b,
      children: /* @__PURE__ */ i(
        "span",
        {
          "aria-hidden": !0,
          className: c(
            "pointer-events-none block h-4 w-4 rounded-full bg-bg shadow-sm ring-0 transition-transform",
            t ? "translate-x-4" : "translate-x-0.5"
          )
        }
      )
    }
  );
});
export {
  g as Switch
};
