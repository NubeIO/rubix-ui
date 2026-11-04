import { jsx as t } from "react/jsx-runtime";
import * as a from "react";
import { cn as i } from "../lib/cn.js";
const c = a.forwardRef(
  function({ className: e, ...o }, r) {
    return /* @__PURE__ */ t(
      "textarea",
      {
        ref: r,
        "data-slot": "textarea",
        className: i(
          "flex w-full min-w-0 rounded-md border border-border bg-bg px-2.5 py-2 text-sm leading-5 font-mono text-fg transition-colors placeholder:text-muted/60 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60",
          e
        ),
        ...o
      }
    );
  }
);
export {
  c as Textarea
};
