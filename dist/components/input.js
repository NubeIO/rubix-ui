import { jsx as i } from "react/jsx-runtime";
import * as s from "react";
import { cn as n } from "../lib/cn.js";
const c = s.forwardRef(
  ({ className: e, type: t, ...o }, r) => /* @__PURE__ */ i(
    "input",
    {
      ref: r,
      type: t,
      "data-slot": "input",
      className: n(
        "flex h-9 w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-1.5 text-sm text-fg transition-colors placeholder:text-muted/60 selection:bg-accent/20 selection:text-fg focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
        e
      ),
      ...o
    }
  )
);
c.displayName = "Input";
export {
  c as Input
};
