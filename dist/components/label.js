import { jsx as a } from "react/jsx-runtime";
import * as r from "react";
import { cn as l } from "../lib/cn.js";
const d = r.forwardRef(function({ className: e, ...o }, t) {
  return /* @__PURE__ */ a(
    "label",
    {
      ref: t,
      "data-slot": "label",
      className: l(
        "text-sm font-medium leading-none text-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        e
      ),
      ...o
    }
  );
});
export {
  d as Label
};
