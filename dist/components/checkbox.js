import { jsx as r } from "react/jsx-runtime";
import { cn as c } from "../lib/cn.js";
function s({ className: o, ...e }) {
  return /* @__PURE__ */ r(
    "input",
    {
      type: "checkbox",
      "data-slot": "checkbox",
      className: c(
        "h-4 w-4 shrink-0 cursor-pointer rounded-md border-border accent-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        o
      ),
      ...e
    }
  );
}
export {
  s as Checkbox
};
